import React from 'react';
import { SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { BrandLogo } from '../../components/brand-logo';
import { colors } from '../Home/style';
import { styles } from './style';

export function Welcome({ onNavigate }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.deepBlue} />
      <View style={styles.content}>
        <View style={styles.brand}>
          <BrandLogo width={290} height={52} />
        </View>

        <View style={styles.illustration}>
          <View style={styles.sunGlow} />
          <View pointerEvents="none" style={styles.orbit}>
            <View style={[styles.orbitLeaf, styles.orbitLeafTop]} />
            <View style={[styles.orbitLeaf, styles.orbitLeafRight]} />
            <View style={[styles.orbitLeaf, styles.orbitLeafBottom]} />
            <View style={[styles.orbitLeaf, styles.orbitLeafLeft]} />
          </View>
          <Text style={styles.pencil}>✏️</Text>
          <Text style={styles.notebook}>📔</Text>
          <Text style={styles.sparkle}>✦</Text>
          <Text style={styles.smallSparkle}>✧</Text>
          <View style={styles.ornamentTopRight}>
            <SymbolView
              name={{ ios: 'leaf', android: 'eco', web: 'eco' }}
              size={19}
              tintColor={colors.gold}
            />
          </View>
          <View style={styles.ornamentBottomRight}>
            <SymbolView
              name={{ ios: 'sparkle', android: 'auto_awesome', web: 'auto_awesome' }}
              size={17}
              tintColor={colors.paleBlue}
            />
          </View>
        </View>

        <View style={styles.intro}>
          <Text style={styles.eyebrow}>PAPELARIA CRIATIVA</Text>
          <Text style={styles.title}>
            Um espaço para{'\n'}suas ideias <Text style={styles.titleHighlight}>voarem</Text>
          </Text>
          <Text style={styles.description}>
            Encontre inspiração para sonhar, planejar e criar cada dia.
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => onNavigate('login')}
            style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Fazer login</Text>
            <SymbolView
              name={{ ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' }}
              size={19}
              tintColor={colors.deepBlue}
            />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => onNavigate('register')}
            style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Criar minha conta</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => onNavigate('home')}
          style={styles.exploreButton}>
          <Text style={styles.exploreButtonText}>Quero explorar a loja</Text>
          <SymbolView
            name={{ ios: 'arrow.up.right', android: 'north_east', web: 'north_east' }}
            size={15}
            tintColor={colors.cream}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
