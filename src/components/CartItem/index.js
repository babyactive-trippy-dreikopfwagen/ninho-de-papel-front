import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';
import {
  Container,
  ItemImage,
  ItemInfo,
  ItemName,
  ItemPrice,
  QuantityRow,
  QuantityButton,
  QuantityText,
  RemoveButton,
} from './style';

/**
 * Componente de item individual no carrinho
 * Permite alterar quantidade e remover
 */
export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const formatPrice = (price) => {
    return `R$ ${(price * item.quantity).toFixed(2).replace('.', ',')}`;
  };

  return (
    <Container>
      <ItemImage source={{ uri: item.image }} />
      <ItemInfo>
        <ItemName numberOfLines={1}>{item.name}</ItemName>
        <ItemPrice>{formatPrice(item.price)}</ItemPrice>
        <QuantityRow>
          <QuantityButton onPress={() => updateQuantity(item.id, item.quantity - 1)}>
            <Feather name="minus" size={14} color="#374151" />
          </QuantityButton>
          <QuantityText>{item.quantity}</QuantityText>
          <QuantityButton onPress={() => updateQuantity(item.id, item.quantity + 1)}>
            <Feather name="plus" size={14} color="#374151" />
          </QuantityButton>
        </QuantityRow>
      </ItemInfo>
      <RemoveButton onPress={() => removeFromCart(item.id)}>
        <Feather name="trash-2" size={20} color="#EF4444" />
      </RemoveButton>
    </Container>
  );
};

