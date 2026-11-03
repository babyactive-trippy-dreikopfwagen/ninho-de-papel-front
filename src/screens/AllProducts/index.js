import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, RefreshControl } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ProductCard } from '../../components/ProductCard';
import { Loading } from '../../components/Loading';
import { ErrorMessage } from '../../components/ErrorMessage';
import { EmptyState } from '../../components/EmptyState';
import { api } from '../../services/api';
import {
  SafeContainer,
  TopBar,
  BackButton,
  TitleContainer,
  ScreenTitle,
  SubTitle,
  SearchInputContainer,
  SearchInput,
  FilterScroll,
  FilterChip,
  FilterChipText,
  ListContainer,
} from './style';

const CATEGORIES = [
  'Todos',
  'Papel Kraft',
  'Papel Cartão',
  'Papel Vegetal',
  'Papel Sulfite',
  'Papel de Seda',
  'Papel Couché',
];

export const AllProducts = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const initialCategory = route.params?.category || 'Todos';
  const initialSearch = route.params?.search || '';
  const initialFilter = route.params?.filter || null; // 'featured' ou null

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [onlyFeatured, setOnlyFeatured] = useState(initialFilter === 'featured');

  const fetchProducts = useCallback(async () => {
    try {
      setError(null);
      let data = [];

      if (selectedCategory && selectedCategory !== 'Todos') {
        data = await api.getProductsByCategory(selectedCategory);
      } else if (onlyFeatured) {
        data = await api.getFeaturedProducts();
      } else {
        data = await api.getProducts();
      }

      setProducts(data);
    } catch (err) {
      setError('Falha ao carregar catálogo de produtos.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedCategory, onlyFeatured]);

  useEffect(() => {
    setLoading(true);
    fetchProducts();
  }, [fetchProducts]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  // Filtragem local adicional para busca por texto em tempo real
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const term = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
  }, [products, searchQuery]);

  return (
    <SafeContainer>
      {/* Barra Superior */}
      <TopBar>
        <BackButton onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Feather name="arrow-left" size={22} color="#374151" />
        </BackButton>
        <TitleContainer>
          <ScreenTitle>
            {onlyFeatured ? 'Produtos em Destaque' : 'Catálogo Completo'}
          </ScreenTitle>
          <SubTitle>{filteredProducts.length} itens encontrados</SubTitle>
        </TitleContainer>
        <BackButton onPress={() => navigation.navigate('Cart')} activeOpacity={0.7}>
          <Feather name="shopping-bag" size={20} color="#374151" />
        </BackButton>
      </TopBar>

      {/* Campo de Busca */}
      <SearchInputContainer>
        <Feather name="search" size={18} color="#9CA3AF" />
        <SearchInput
          placeholder="Pesquisar por papel, gramatura..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <BackButton onPress={() => setSearchQuery('')} style={{ padding: 2 }}>
            <Feather name="x" size={16} color="#9CA3AF" />
          </BackButton>
        )}
      </SearchInputContainer>

      {/* Chips de Categorias */}
      <View style={{ maxHeight: 56 }}>
        <FilterScroll>
          {CATEGORIES.map((cat) => (
            <FilterChip
              key={cat}
              active={selectedCategory === cat && !onlyFeatured}
              onPress={() => {
                setOnlyFeatured(false);
                setSelectedCategory(cat);
              }}
            >
              <FilterChipText active={selectedCategory === cat && !onlyFeatured}>
                {cat}
              </FilterChipText>
            </FilterChip>
          ))}
          <FilterChip
            active={onlyFeatured}
            onPress={() => setOnlyFeatured(!onlyFeatured)}
          >
            <FilterChipText active={onlyFeatured}>⭐ Em Destaque</FilterChipText>
          </FilterChip>
        </FilterScroll>
      </View>

      {/* Conteúdo Principal com tratamento de estados */}
      {loading ? (
        <Loading message="Carregando catálogo..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchProducts} />
      ) : filteredProducts.length === 0 ? (
        <EmptyState
          message={`Nenhum papel encontrado para "${searchQuery || selectedCategory}".\nTente outra categoria ou termo de busca.`}
          icon="search"
        />
      ) : (
        <ListContainer
          data={filteredProducts}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          renderItem={({ item }) => <ProductCard product={item} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#87CEEB']}
            />
          }
        />
      )}
    </SafeContainer>
  );
};

