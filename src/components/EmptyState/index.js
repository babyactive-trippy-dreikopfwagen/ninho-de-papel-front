import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

/**
 * Componente de estado de ausência de resultados
 * Exibido quando uma busca ou listagem não retorna dados
 */
export const EmptyState = ({ message = 'Nenhum produto encontrado.', icon = 'inbox' }) => {
  return (
    <View style={styles.container}>
      <Feather name={icon} size={60} color="#D1D5DB" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    gap: 15,
  },
  text: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
  },
});

