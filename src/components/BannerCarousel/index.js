import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { api } from '../../services/api';
import {
  Container,
  TitleRow,
  Title,
  BannerScroll,
  BannerCard,
  BannerImage,
  BannerOverlay,
  BannerTitle,
  BannerSubtitle,
} from './style';

/**
 * Carrossel de banners promocionais (seção "Sugestões")
 * Consome a API /banners e exibe em scroll horizontal
 */
export const BannerCarousel = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      const data = await api.getBanners();
      setBanners(data);
    } catch (error) {
      console.log('Erro ao carregar banners:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="small" color="#87CEEB" />
      </Container>
    );
  }

  if (banners.length === 0) return null;

  return (
    <Container>
      <TitleRow>
        <Title>Sugestões</Title>
      </TitleRow>
      <BannerScroll>
        {banners.map((banner) => (
          <BannerCard key={banner.id} style={{ backgroundColor: banner.backgroundColor }}>
            <BannerImage source={{ uri: banner.image }} />
            <BannerOverlay>
              <BannerTitle>{banner.title}</BannerTitle>
              <BannerSubtitle>{banner.subtitle}</BannerSubtitle>
            </BannerOverlay>
          </BannerCard>
        ))}
      </BannerScroll>
    </Container>
  );
};

