import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';
import { CardCategory } from './CardCategory';
import {
  ContainerCategory,
  TitleRow,
  TextTitle,
  TitleLine,
  Scroll,
} from './style';

/**
 * Seção de categorias "Tipos de Papéis"
 * Consome a API /categories e exibe em scroll horizontal
 */
export const CategorySection = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await api.getCategories();
      setCategories(data);
    } catch (error) {
      console.log('Erro ao carregar categorias:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryPress = (categoryName) => {
    navigation.navigate('AllProducts', { category: categoryName });
  };

  if (loading) {
    return (
      <ContainerCategory>
        <ActivityIndicator size="small" color="#87CEEB" />
      </ContainerCategory>
    );
  }

  return (
    <ContainerCategory>
      <TitleRow>
        <TextTitle>Tipos de Papéis</TextTitle>
        <TitleLine />
      </TitleRow>
      <Scroll>
        {categories.map((category) => (
          <CardCategory
            key={category.id}
            icon={category.icon}
            name={category.name}
            color={category.color}
            onPress={() => handleCategoryPress(category.name)}
          />
        ))}
      </Scroll>
    </ContainerCategory>
  );
};

