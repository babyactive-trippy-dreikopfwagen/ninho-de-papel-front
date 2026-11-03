import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from '../../context/CartContext';
import { Loading } from '../../components/Loading';
import { ErrorMessage } from '../../components/ErrorMessage';
import { EmptyState } from '../../components/EmptyState';
import { api } from '../../services/api';
import logo from '../../assets/logo.png';
import paperStand from '../../assets/paper-stand.png';
import {
  SafeContainer,
  HeaderContainer,
  TopBarActions,
  ActionButton,
  HeaderLogo,
  DividerLine,
  ContentScroll,
  TwoColumnSection,
  ImageWrapper,
  ProductImage,
  InfoColumn,
  CategoryTag,
  TitleText,
  PriceText,
  DescriptionBox,
  DescriptionTitle,
  DescriptionText,
  QuantitySection,
  QuantityLabel,
  QuantityControls,
  QuantityBtn,
  QuantityVal,
  AddToCartBtn,
  AddToCartText,
  GoHomeBtn,
  GoHomeText,
} from './style';

export const ProductDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { productId } = route.params || {};
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const loadProduct = useCallback(async () => {
    if (!productId) {
      setError('ID do produto não informado.');
      setLoading(false);
      return;
    }

    try {
      setError(null);
      // Requisição HTTP para buscar o produto específico
      const data = await api.getProductById(productId);
      setProduct(data);
    } catch (err) {
      setError('Não foi possível carregar os detalhes do produto.');
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    Alert.alert(
      'Produto adicionado!',
      `${quantity}x ${product.name} adicionado ao seu carrinho.`,
      [
        { text: 'Continuar Comprando', style: 'cancel' },
        { text: 'Ir para o Carrinho', onPress: () => navigation.navigate('Cart') },
      ]
    );
  };

  const formatPrice = (price) => {
    return `R$ ${price?.toFixed(2).replace('.', ',')}`;
  };

  return (
    <SafeContainer>
      {/* Top Header com Botões de Navegação */}
      <HeaderContainer>
        <TopBarActions>
          <ActionButton onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Feather name="arrow-left" size={20} color="#374151" />
          </ActionButton>
          <ActionButton onPress={() => navigation.navigate('Cart')} activeOpacity={0.7}>
            <Feather name="shopping-bag" size={20} color="#374151" />
          </ActionButton>
        </TopBarActions>

        {/* Logo Ninho de Papel (conforme Wireframe 3) */}
        <HeaderLogo source={logo} />
        <DividerLine />
      </HeaderContainer>

      {/* Estados de Carregamento / Erro / Ausência */}
      {loading ? (
        <Loading message="Carregando detalhes do produto..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={loadProduct} />
      ) : !product ? (
        <EmptyState message="Produto não encontrado." />
      ) : (
        <ContentScroll>
          {/* Seção de Duas Colunas (Imagem e Especificações conforme Wireframe 3) */}
          <TwoColumnSection>
            <ImageWrapper>
              <ProductImage
                source={product.image ? { uri: product.image } : paperStand}
                defaultSource={paperStand}
              />
            </ImageWrapper>

            <InfoColumn>
              <CategoryTag>{product.category}</CategoryTag>
              <TitleText numberOfLines={3}>{product.name}</TitleText>
              <PriceText>{formatPrice(product.price)}</PriceText>
              <DescriptionText numberOfLines={3}>
                {product.description}
              </DescriptionText>
            </InfoColumn>
          </TwoColumnSection>

          {/* Descrição Detalhada */}
          <DescriptionBox>
            <DescriptionTitle>Sobre este papel</DescriptionTitle>
            <DescriptionText>{product.description}</DescriptionText>
          </DescriptionBox>

          {/* Seletor de Quantidade */}
          <QuantitySection>
            <QuantityLabel>Quantidade</QuantityLabel>
            <QuantityControls>
              <QuantityBtn
                onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                activeOpacity={0.7}
              >
                <Feather name="minus" size={16} color="#FFFFFF" />
              </QuantityBtn>
              <QuantityVal>{quantity}</QuantityVal>
              <QuantityBtn
                onPress={() => setQuantity((q) => q + 1)}
                activeOpacity={0.7}
              >
                <Feather name="plus" size={16} color="#FFFFFF" />
              </QuantityBtn>
            </QuantityControls>
          </QuantitySection>

          {/* Botão Adicionar ao Carrinho */}
          <AddToCartBtn onPress={handleAddToCart} activeOpacity={0.8}>
            <Feather name="shopping-cart" size={20} color="#FFFFFF" />
            <AddToCartText>
              Adicionar ao Carrinho • {formatPrice(product.price * quantity)}
            </AddToCartText>
          </AddToCartBtn>

          {/* Botão "Ir para Home" (Exigência do Wireframe 3) */}
          <GoHomeBtn
            onPress={() => navigation.navigate('HomeScreen')}
            activeOpacity={0.7}
          >
            <GoHomeText>Ir para Home</GoHomeText>
          </GoHomeBtn>
        </ContentScroll>
      )}
    </SafeContainer>
  );
};

