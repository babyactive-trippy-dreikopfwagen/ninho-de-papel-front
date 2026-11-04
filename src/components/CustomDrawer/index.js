import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';
import {
  Container,
  CloseButton,
  Divider,
  MenuItem,
  MenuText,
  BadgeRow,
  Badge,
  BadgeText,
} from './style';

/**
 * Conteúdo customizado do Drawer (menu lateral)
 */
export const CustomDrawerContent = ({ navigation }) => {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  const menuItems = [
    { label: 'Home', screen: 'HomeScreen' },
    { label: 'Todos os Produtos', screen: 'AllProducts', params: {} },
    { label: 'Em destaque', screen: 'AllProducts', params: { filter: 'featured' } },
    { label: 'Carrinho', screen: 'Cart' },
    { label: 'Entrar / Login', screen: 'Login' },
    { label: 'Criar Conta / Cadastro', screen: 'Cadastro' },
  ];

  const handleNavigate = (screen, params) => {
    navigation.closeDrawer();
    // Navega para a stack 'Main' e repassa o nome da tela interna desejada
    navigation.navigate('Main', { 
      screen: screen, 
      params: params 
    });
  };

  return (
    <Container>
      <CloseButton onPress={() => navigation.closeDrawer()}>
        <Feather name="x" size={28} color="#333" />
      </CloseButton>
      <Divider />
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          onPress={() => handleNavigate(item.screen, item.params)}
        >
          <MenuText>{item.label}</MenuText>
          <BadgeRow>
            {item.label === 'Carrinho' && itemCount > 0 && (
              <Badge>
                <BadgeText>{itemCount}</BadgeText>
              </Badge>
            )}
            <Feather name="chevron-right" size={24} color="#333" />
          </BadgeRow>
        </MenuItem>
      ))}
    </Container>
  );
};