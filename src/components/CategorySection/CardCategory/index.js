import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BoxCategory, TextTitle } from './style';

/**
 * Card individual de categoria
 * Utiliza ícones do MaterialCommunityIcons
 */
export const CardCategory = ({ icon, name, color, onPress }) => {
  return (
    <BoxCategory
      onPress={onPress}
      style={{ backgroundColor: color + '30', borderWidth: 1, borderColor: color }}
    >
      <MaterialCommunityIcons name={icon} size={20} color={color} />
      <TextTitle style={{ color: color }}>{name}</TextTitle>
    </BoxCategory>
  );
};

