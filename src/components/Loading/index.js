import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

/**
 * Componente de estado de carregamento
 * Exibe spinner e mensagem enquanto dados são carregados
 */
export const Loading = ({ message = 'Carregando...' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#87CEEB" />
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
    color: '#6B7280',
    textAlign: 'center',
  },
});

