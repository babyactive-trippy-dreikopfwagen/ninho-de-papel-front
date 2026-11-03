import React, { useState } from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useCart } from '../../context/CartContext';
import logo from '../../assets/logo.png';
import {
  Container,
  LogoImage,
  IconsRow,
  IconButton,
  CartBadge,
  CartBadgeText,
  SearchContainer,
  SearchInput,
} from './style';

/**
 * Header com logo, busca, carrinho e menu hamburger
 * Layout baseado no wireframe da Imagem 2
 */
export const Header = ({ onSearch, showSearch = false }) => {
  const navigation = useNavigation();
  const { getItemCount } = useCart();
  const [searchVisible, setSearchVisible] = useState(showSearch);
  const [searchText, setSearchText] = useState('');
  const itemCount = getItemCount();

  const handleSearch = (text) => {
    setSearchText(text);
    if (onSearch) onSearch(text);
  };

  return (
    <View>
      <Container>
        <LogoImage source={logo} />
        <IconsRow>
          <IconButton onPress={() => setSearchVisible(!searchVisible)}>
            <Feather name="search" size={22} color="#374151" />
          </IconButton>
          <IconButton onPress={() => navigation.navigate('Cart')}>
            <Feather name="shopping-bag" size={22} color="#374151" />
            {itemCount > 0 && (
              <CartBadge>
                <CartBadgeText>{itemCount}</CartBadgeText>
              </CartBadge>
            )}
          </IconButton>
          <IconButton onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Feather name="menu" size={22} color="#374151" />
          </IconButton>
        </IconsRow>
      </Container>
      {searchVisible && (
        <SearchContainer>
          <Feather name="search" size={18} color="#9CA3AF" />
          <SearchInput
            placeholder="Buscar produtos..."
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={handleSearch}
            autoFocus
          />
        </SearchContainer>
      )}
    </View>
  );
};

