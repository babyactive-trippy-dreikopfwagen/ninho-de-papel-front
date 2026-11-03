import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export function BrandLogo({ width = 160, height = 36 }) {
  return (
    <View style={[styles.container, { width, height }]}>
      <Image
        accessible
        accessibilityLabel="Ninho de Papel"
        accessibilityIgnoresInvertColors
        resizeMode="contain"
        source={require('../../assets/Group 123.png')}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    paddingHorizontal: 6,
    paddingVertical: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
