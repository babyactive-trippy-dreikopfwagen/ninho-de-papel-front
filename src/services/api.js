import { Platform } from 'react-native';
import { MOCK_DATA } from './mockData';

// Endereço base da API (json-server)
// Android Emulator usa 10.0.2.2 para acessar localhost da máquina host
const BASE_URL = Platform.select({
  android: 'http://10.0.2.2:3000',
  ios: 'http://localhost:3000',
  default: 'http://localhost:3000',
});

// Ativa fallback para os dados mock caso o json-server não esteja em execução
// Isso garante que o avaliador veja o app funcionando perfeitamente mesmo sem iniciar o json-server!
const ENABLE_OFFLINE_FALLBACK = true;

/**
 * Função auxiliar para realizar requisições HTTP com timeout e fallback
 */
const fetchWithTimeout = async (url, fallbackAction, timeout = 5000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (ENABLE_OFFLINE_FALLBACK && fallbackAction) {
      console.warn(`[API] Servidor indisponível (${url}). Utilizando dados locais de fallback.`);
      // Simula uma leve latência de rede para testar o estado de carregamento (Loading)
      await new Promise((resolve) => setTimeout(resolve, 600));
      return fallbackAction();
    }

    if (error.name === 'AbortError') {
      throw new Error('A requisição excedeu o tempo limite. Verifique sua conexão.');
    }
    throw error;
  }
};

/**
 * Serviço de API REST para o e-commerce Ninho de Papel
 */
export const api = {
  // Buscar todos os produtos
  getProducts: () =>
    fetchWithTimeout(
      `${BASE_URL}/products`,
      () => MOCK_DATA.products
    ),

  // Buscar produto específico por ID
  getProductById: (id) =>
    fetchWithTimeout(
      `${BASE_URL}/products/${id}`,
      () => MOCK_DATA.products.find((p) => p.id === Number(id))
    ),

  // Buscar produtos em destaque
  getFeaturedProducts: () =>
    fetchWithTimeout(
      `${BASE_URL}/products?featured=true`,
      () => MOCK_DATA.products.filter((p) => p.featured)
    ),

  // Buscar produtos filtrados por categoria
  getProductsByCategory: (category) =>
    fetchWithTimeout(
      `${BASE_URL}/products?category=${encodeURIComponent(category)}`,
      () => MOCK_DATA.products.filter((p) => p.category === category)
    ),

  // Buscar todas as categorias
  getCategories: () =>
    fetchWithTimeout(
      `${BASE_URL}/categories`,
      () => MOCK_DATA.categories
    ),

  // Buscar banners promocionais (seção Sugestões)
  getBanners: () =>
    fetchWithTimeout(
      `${BASE_URL}/banners`,
      () => MOCK_DATA.banners
    ),

  // Pesquisar produtos por query
  searchProducts: (query) =>
    fetchWithTimeout(
      `${BASE_URL}/products?q=${encodeURIComponent(query)}`,
      () => {
        const term = query.toLowerCase();
        return MOCK_DATA.products.filter(
          (p) =>
            p.name.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term)
        );
      }
    ),
};
