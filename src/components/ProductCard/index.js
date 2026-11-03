import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../context/CartContext';
import {
  CardContainer,
  ProductImage,
  ProductInfo,
  ProductName,
  PriceRow,
  ProductPrice,
  AddButton,
  FeaturedBadge,
  FeaturedBadgeText,
} from './style';

/**
 * Card de produto reutilizável
 * Exibe imagem, nome, preço e botão de adicionar ao carrinho
 */
export const ProductCard = ({ product }) => {
  const navigation = useNavigation();
  const { addToCart } = useCart();

  const handlePress = () => {
    navigation.navigate('ProductDetail', { productId: product.id });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation?.();
    addToCart(product);
  };

  const formatPrice = (price) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  return (
    <CardContainer onPress={handlePress} activeOpacity={0.7}>
      <ProductImage
        source={{ uri: product.image }}
        defaultSource={require('../../assets/logo.png')}
      />
      {product.featured && (
        <FeaturedBadge>
          <FeaturedBadgeText>Destaque</FeaturedBadgeText>
        </FeaturedBadge>
      )}
      <ProductInfo>
        <ProductName numberOfLines={2}>{product.name}</ProductName>
        <PriceRow>
          <ProductPrice>{formatPrice(product.price)}</ProductPrice>
          <AddButton onPress={handleAddToCart}>
            <Feather name="plus" size={18} color="#FFFFFF" />
          </AddButton>
        </PriceRow>
      </ProductInfo>
    </CardContainer>
  );
};

