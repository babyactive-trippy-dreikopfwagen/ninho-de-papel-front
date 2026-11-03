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
 * Layout baseado no wireframe da Imagem 1
 */
export const CustomDrawerContent = ({ navigation }) => {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  const menuItems = [
    { label: 'Home', screen: 'HomeScreen' },
    { label: 'Todos os Produtos', screen: 'AllProducts', params: {} },
    { label: 'Em destaque', screen: 'AllProducts', params: { filter: 'featured' } },
    { label: 'Carrinho', screen: 'Cart' },
  ];

  const handleNavigate = (screen, params) => {
    navigation.closeDrawer();
    navigation.navigate('Main', { screen, params });
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

