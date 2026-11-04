import React, { useState, useEffect, useCallback } from 'react';
import { RefreshControl, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components/Header';
import { BannerCarousel } from '../../components/BannerCarousel';
import { CategorySection } from '../../components/CategorySection';
import { ProductCard } from '../../components/ProductCard';
import { Loading } from '../../components/Loading';
import { ErrorMessage } from '../../components/ErrorMessage';
import { EmptyState } from '../../components/EmptyState';
import { api } from '../../services/api';
import {
  SafeContainer,
  MainScroll,
  Section,
  SectionHeader,
  BadgeTitle,
  BadgeTitleText,
  ArrowButton,
  HorizontalProductScroll,
  GridContainer,
} from './style';

export const Home = () => {
  const navigation = useNavigation();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setError(null);
      const [featuredRes, allRes] = await Promise.all([
        api.getFeaturedProducts(),
        api.getProducts(),
      ]);

      setFeaturedProducts(featuredRes);
      setAllProducts(allRes.slice(0, 6));
    } catch (err) {
      setError('Não foi possível carregar os produtos. Verifique se a API está ativa.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const handleSearch = (query) => {
    if (query.trim()) {
      navigation.navigate('AllProducts', { search: query });
    }
  };

  return (
    <SafeContainer>
      <Header onSearch={handleSearch} />

      {loading ? (
        <Loading message="Carregando novidades da papelaria..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={loadData} />
      ) : (
        <MainScroll
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#87CEEB', '#F8B4C8']}
              tintColor="#87CEEB"
            />
          }
        >
          {/* Seção Sugestões (Banner Promocional) */}
          <BannerCarousel />

          {/* Seção Em Destaque */}
          <Section>
            <SectionHeader>
              <BadgeTitle>
                <BadgeTitleText>Em destaque</BadgeTitleText>
              </BadgeTitle>
              
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <ArrowButton
                  onPress={() => navigation.navigate('Cadastro')}
                  activeOpacity={0.7}
                >
                  <Feather name="user-plus" size={20} color="#374151" />
                </ArrowButton>

                <ArrowButton
                  onPress={() => navigation.navigate('AllProducts', { filter: 'featured' })}
                  activeOpacity={0.7}
                >
                  <Feather name="arrow-right" size={20} color="#374151" />
                </ArrowButton>
              </View>
            </SectionHeader>

            {featuredProducts.length === 0 ? (
              <EmptyState message="Nenhum produto em destaque no momento." />
            ) : (
              <HorizontalProductScroll>
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </HorizontalProductScroll>
            )}
          </Section>

          {/* Seção Tipos de Papéis (Categorias) */}
          <CategorySection />

          {/* Seção Mais Vendidos / Catálogo Recente */}
          <Section>
            <SectionHeader>
              <BadgeTitle style={{ backgroundColor: '#F8B4C8' }}>
                <BadgeTitleText>Mais Procurados</BadgeTitleText>
              </BadgeTitle>
              <ArrowButton
                onPress={() => navigation.navigate('AllProducts')}
                activeOpacity={0.7}
              >
                <Feather name="arrow-right" size={20} color="#374151" />
              </ArrowButton>
            </SectionHeader>

            <GridContainer>
              {allProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </GridContainer>
          </Section>
        </MainScroll>
      )}
    </SafeContainer>
  );
};