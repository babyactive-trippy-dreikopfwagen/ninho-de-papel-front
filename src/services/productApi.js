import Constants from 'expo-constants';

const packagerHost = Constants.expoConfig?.hostUri?.split(':')[0];
const defaultLocalApiUrl = packagerHost
  ? `http://${packagerHost}:3001/api`
  : 'http://localhost:3001/api';
const localApiUrl = process.env.EXPO_PUBLIC_API_URL || defaultLocalApiUrl;
const externalApiUrl = 'https://api.testingapis.com/api/Products';

export const productSources = [
  { id: 'local', label: 'Papelaria local' },
  { id: 'external', label: 'API externa' },
];

const localCategories = [
  { name: 'Todas', icon: { ios: 'square.grid.2x2', android: 'grid_view', web: 'grid_view' } },
  { name: 'Cadernos', icon: { ios: 'book.closed', android: 'menu_book', web: 'menu_book' } },
  { name: 'Tesouras', icon: { ios: 'scissors', android: 'content_cut', web: 'content_cut' } },
  { name: 'Papéis', icon: { ios: 'doc', android: 'description', web: 'description' } },
  { name: 'Canetas', icon: { ios: 'pencil.and.outline', android: 'edit', web: 'edit' } },
  { name: 'Marca-textos', icon: { ios: 'highlighter', android: 'ink_highlighter', web: 'ink_highlighter' } },
  { name: 'Colas', icon: { ios: 'drop', android: 'water_drop', web: 'water_drop' } },
  { name: 'Adesivos', icon: { ios: 'star', android: 'kid_star', web: 'kid_star' } },
  { name: 'Planners', icon: { ios: 'calendar', android: 'calendar_month', web: 'calendar_month' } },
  { name: 'Acessórios', icon: { ios: 'pencil.and.ruler', android: 'straighten', web: 'straighten' } },
];

const externalCategoryDetails = {
  electronics: { name: 'Eletrônicos', image: '🎧', color: '#DDEBF0', icon: 'devices' },
  clothing: { name: 'Vestuário', image: '👕', color: '#F3E4EC', icon: 'checkroom' },
  books: { name: 'Livros', image: '📚', color: '#F4EAD6', icon: 'menu_book' },
  home: { name: 'Casa', image: '🏠', color: '#DCECEF', icon: 'home' },
  sports: { name: 'Esportes', image: '⚽', color: '#E8E2F0', icon: 'sports_soccer' },
};

const externalCategories = [
  { name: 'Todas', icon: { ios: 'square.grid.2x2', android: 'grid_view', web: 'grid_view' } },
  ...Object.entries(externalCategoryDetails).map(([id, details]) => ({
    name: details.name,
    icon: { ios: id === 'books' ? 'book' : 'square.grid.2x2', android: details.icon, web: details.icon },
  })),
];

export function getProductCategories(source = 'local') {
  return source === 'external' ? externalCategories : localCategories;
}

function isExternalProduct(product) {
  return (
    product !== null &&
    typeof product === 'object' &&
    (typeof product.id === 'number' || typeof product.id === 'string') &&
    typeof product.title === 'string' &&
    typeof product.price === 'number' &&
    Number.isFinite(product.price) &&
    typeof product.category === 'string'
  );
}

function mapExternalProduct(product) {
  const categoryId = product.category.trim().toLocaleLowerCase('en');
  const category = externalCategoryDetails[categoryId];

  return {
    id: String(product.id),
    name: product.title.trim(),
    description: typeof product.description === 'string' ? product.description.trim() : '',
    price: product.price,
    category: category?.name || product.category,
    image: category?.image || '📦',
    imageUrl: typeof product.image === 'string' && /^https?:\/\//i.test(product.image)
      ? product.image
      : null,
    color: category?.color || '#DDEBF0',
    featured: typeof product.rating?.rate === 'number' && product.rating.rate >= 4.4,
    inStock: typeof product.inStock === 'boolean' ? product.inStock : null,
  };
}

export async function getProducts({ source = 'local', signal } = {}) {
  const url = source === 'external' ? externalApiUrl : `${localApiUrl}/products`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`A API de produtos respondeu com status ${response.status}.`);
  }

  const payload = await response.json();

  if (source === 'external') {
    if (!Array.isArray(payload) || !payload.every(isExternalProduct)) {
      throw new Error('A API externa retornou uma lista de produtos inválida.');
    }

    return payload.map(mapExternalProduct).filter((product) => product.name.length > 0);
  }

  if (
    !payload ||
    !Array.isArray(payload.products) ||
    !payload.products.every((product) => (
      product !== null &&
      typeof product === 'object' &&
      (typeof product.id === 'string' || typeof product.id === 'number') &&
      typeof product.name === 'string' &&
      typeof product.description === 'string' &&
      typeof product.price === 'number' &&
      Number.isFinite(product.price) &&
      typeof product.category === 'string' &&
      typeof product.image === 'string' &&
      typeof product.color === 'string' &&
      typeof product.featured === 'boolean'
    ))
  ) {
    throw new Error('A API local retornou uma resposta de produtos inválida.');
  }

  return payload.products.map((product) => ({
    ...product,
    id: String(product.id),
    imageUrl: null,
  }));
}
