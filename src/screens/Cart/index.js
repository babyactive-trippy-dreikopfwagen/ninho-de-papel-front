import React from 'react';
import { Alert, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../components/CartItem';
import {
  SafeContainer,
  TopBar,
  BackButton,
  ScreenTitle,
  ClearButton,
  ClearText,
  ListContainer,
  SummaryCard,
  SummaryRow,
  SummaryLabel,
  SummaryValue,
  TotalLabel,
  TotalValue,
  CheckoutButton,
  CheckoutButtonText,
  ContinueShoppingButton,
  ContinueShoppingText,
  EmptyWrapper,
  EmptyTitle,
  EmptySubtitle,
  ShopNowButton,
  ShopNowButtonText,
} from './style';

export const Cart = () => {
  const navigation = useNavigation();
  const { cartItems, clearCart, getTotal, getItemCount } = useCart();

  const total = getTotal();
  const count = getItemCount();
  const frete = total >= 99 || total === 0 ? 0 : 15.0;
  const finalTotal = total + frete;

  const formatPrice = (val) => `R$ ${val.toFixed(2).replace('.', ',')}`;

  const handleCheckout = () => {
    Alert.alert(
      ':) Pedido Confirmado!',
      `Obrigado por comprar no Ninho de Papel!\nTotal: ${formatPrice(finalTotal)}\nSeu pedido está sendo preparado com muito carinho.`,
      [
        {
          text: 'Concluir',
          onPress: () => {
            clearCart();
            navigation.navigate('HomeScreen');
          },
        },
      ]
    );
  };

  const confirmClearCart = () => {
    Alert.alert(
      'Limpar Carrinho',
      'Deseja remover todos os itens do carrinho?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Limpar', style: 'destructive', onPress: clearCart },
      ]
    );
  };

  return (
    <SafeContainer>
      {/* Barra de Título */}
      <TopBar>
        <BackButton onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Feather name="arrow-left" size={20} color="#374151" />
        </BackButton>
        <ScreenTitle>Meu Carrinho ({count})</ScreenTitle>
        {cartItems.length > 0 ? (
          <ClearButton onPress={confirmClearCart}>
            <ClearText>Limpar</ClearText>
          </ClearButton>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </TopBar>

      {/* Conteúdo: Lista ou Estado Vazio */}
      {cartItems.length === 0 ? (
        <EmptyWrapper>
          <Feather name="shopping-bag" size={70} color="#D1D5DB" />
          <EmptyTitle>Seu carrinho está vazio</EmptyTitle>
          <EmptySubtitle>
            Explore nossa variedade de papéis especiais, kraft, cartões e muito mais!
          </EmptySubtitle>
          <ShopNowButton
            onPress={() => navigation.navigate('AllProducts')}
            activeOpacity={0.8}
          >
            <ShopNowButtonText>Explorar Papéis</ShopNowButtonText>
          </ShopNowButton>
        </EmptyWrapper>
      ) : (
        <>
          <ListContainer
            data={cartItems}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <CartItem item={item} />}
          />

          {/* Resumo Financeiro */}
          <SummaryCard>
            <SummaryRow>
              <SummaryLabel>Subtotal</SummaryLabel>
              <SummaryValue>{formatPrice(total)}</SummaryValue>
            </SummaryRow>
            <SummaryRow>
              <SummaryLabel>Frete</SummaryLabel>
              <SummaryValue style={{ color: frete === 0 ? '#10B981' : '#374151' }}>
                {frete === 0 ? 'Grátis (acima de R$ 99)' : formatPrice(frete)}
              </SummaryValue>
            </SummaryRow>
            <SummaryRow style={{ marginTop: 4 }}>
              <TotalLabel>Total</TotalLabel>
              <TotalValue>{formatPrice(finalTotal)}</TotalValue>
            </SummaryRow>

            <CheckoutButton onPress={handleCheckout} activeOpacity={0.8}>
              <CheckoutButtonText>Finalizar Pedido</CheckoutButtonText>
            </CheckoutButton>

            <ContinueShoppingButton
              onPress={() => navigation.navigate('AllProducts')}
              activeOpacity={0.7}
            >
              <ContinueShoppingText>Continuar Comprando</ContinueShoppingText>
            </ContinueShoppingButton>
          </SummaryCard>
        </>
      )}
    </SafeContainer>
  );
};

