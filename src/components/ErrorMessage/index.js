import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

/**
 * Componente de estado de erro
 * Exibe mensagem de erro e botão para tentar novamente
 */
export const ErrorMessage = ({ message = 'Ocorreu um erro.', onRetry }) => {
  return (
    <View style={styles.container}>
      <Feather name="alert-circle" size={50} color="#EF4444" />
      <Text style={styles.title}>Ops!</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.button} onPress={onRetry}>
          <Feather name="refresh-cw" size={18} color="#FFFFFF" />
          <Text style={styles.buttonText}>Tentar novamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#374151',
  },
  message: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#87CEEB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});

