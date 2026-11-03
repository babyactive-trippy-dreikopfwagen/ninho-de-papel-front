import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SymbolView } from 'expo-symbols';
import { BrandLogo } from '../../components/brand-logo';
import { colors, styles } from './style';
import { getProducts, productCategories } from '../../services/productApi';

const Symbol = ({ ios, android, web, size = 22, color = colors.cream }) => (
  <SymbolView
    name={{ ios, android, web }}
    size={size}
    tintColor={color}
  />
);

function ProductCard({ product, onAdd }) {
  return (
    <View style={styles.productCard}>
      <View style={[styles.productArtwork, { backgroundColor: product.color }]}>
        <Text style={styles.productEmoji}>{product.image}</Text>
        <View style={styles.artworkSparkle}>
          <Symbol ios="sparkle" android="auto_awesome" web="auto_awesome" size={17} color={colors.gold} />
        </View>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.productDetail} numberOfLines={1}>{product.description}</Text>
        <Text style={styles.productPrice}>R$ {product.price.toFixed(2).replace('.', ',')}</Text>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={`Adicionar ${product.name} ao carrinho`}
          onPress={onAdd}
          style={styles.addButton}>
          <Symbol ios="cart" android="shopping_cart" web="shopping_cart" size={19} />
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function Home({ onBack, onOpenContact, onOpenProducts }) {
  const [cartCount, setCartCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [productsError, setProductsError] = useState(null);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    getProducts({ signal: controller.signal })
      .then((catalog) => {
        if (active) setProducts(catalog);
      })
      .catch(() => {
        if (active && !controller.signal.aborted) {
          setProductsError('Não foi possível carregar os produtos.');
        }
      })
      .finally(() => {
        if (active) setProductsLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const visibleProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products.slice(0, 3);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={colors.deepBlue} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Voltar para a tela inicial"
            onPress={onBack}
            style={styles.brand}>
            <BrandLogo width={150} height={36} />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Buscar produtos"
              onPress={onOpenProducts}
              style={styles.headerButton}>
              <Symbol ios="magnifyingglass" android="search" web="search" size={24} />
            </TouchableOpacity>
            <TouchableOpacity accessibilityRole="button" accessibilityLabel={`Carrinho, ${cartCount} itens`} style={styles.headerButton}>
              <Symbol ios="cart" android="shopping_cart" web="shopping_cart" size={24} />
              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Fale conosco"
              onPress={onOpenContact}
              style={styles.headerButton}>
              <Symbol ios="line.3.horizontal" android="menu" web="menu" size={26} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroTitle}>Seu cantinho{'\n'}mais criativo</Text>
            <Text style={styles.heroDescription}>Tudo de papelaria para sonhar, planejar e criar.</Text>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={onOpenProducts}
              style={styles.heroButton}>
              <Text style={styles.heroButtonText}>Conheça nossa loja</Text>
              <Symbol ios="arrow.right" android="arrow_forward" web="arrow_forward" size={18} />
            </TouchableOpacity>
          </View>
          <View style={styles.heroArtwork}>
            <Text style={styles.heroSparkle}>✦</Text>
            <View pointerEvents="none" style={styles.heroOrnament}>
              <View style={[styles.heroOrnamentPetal, styles.heroOrnamentPetalOne]} />
              <View style={[styles.heroOrnamentPetal, styles.heroOrnamentPetalTwo]} />
              <View style={[styles.heroOrnamentPetal, styles.heroOrnamentPetalThree]} />
              <View style={styles.heroOrnamentCenter} />
            </View>
            <View style={styles.penCup}>
              <Text style={styles.heroPens}>✏️🖊️</Text>
              <Text style={styles.cupEmoji}>☕</Text>
            </View>
            <Text style={styles.heroStar}>✦</Text>
          </View>
          <View style={styles.heroDots}>
            <View style={[styles.heroDot, styles.heroDotActive]} />
            <View style={styles.heroDot} />
            <View style={styles.heroDot} />
          </View>
        </View>

        <View style={styles.benefits}>
          <View style={styles.benefit}>
            <Symbol ios="shippingbox" android="local_shipping" web="local_shipping" size={28} color={colors.gold} />
            <Text style={styles.benefitText}>Entrega para{'\n'}todo o Brasil</Text>
          </View>
          <View style={styles.benefitDivider} />
          <View style={styles.benefit}>
            <Symbol ios="checkmark.shield" android="verified_user" web="verified_user" size={28} color={colors.gold} />
            <Text style={styles.benefitText}>Compra segura</Text>
          </View>
          <View style={styles.benefitDivider} />
          <View style={styles.benefit}>
            <Symbol ios="creditcard" android="credit_card" web="credit_card" size={28} color={colors.gold} />
            <Text style={styles.benefitText}>Diversas formas{'\n'}de pagamento</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>{selectedCategory || 'Produtos em destaque'}</Text>
            <View style={styles.headingLine} />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productList}>
            {productsError ? <Text style={styles.productDetail}>{productsError}</Text> : null}
            {productsLoading ? <ActivityIndicator color={colors.deepBlue} /> : null}
            {!productsLoading && !productsError && visibleProducts.length === 0 ? (
              <Text style={styles.productDetail}>Nenhum produto encontrado.</Text>
            ) : null}
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={() => setCartCount((count) => count + 1)} />
            ))}
          </ScrollView>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={onOpenProducts}
            style={styles.seeAllButton}>
            <Text style={styles.seeAllButtonText}>Ver todos os produtos</Text>
            <Symbol ios="arrow.right" android="arrow_forward" web="arrow_forward" size={16} color={colors.deepBlue} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>Categorias</Text>
            <View style={styles.headingLine} />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
            {productCategories.filter((category) => category.name !== 'Todas').map((category) => {
              const isSelected = selectedCategory === category.name;
              return (
                <TouchableOpacity
                  key={category.name}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => {
                    setSelectedCategory(isSelected ? null : category.name);
                    onOpenProducts(isSelected ? 'Todas' : category.name);
                  }}
                  style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}>
                  <Symbol {...category.icon} size={34} />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.bottomBanner}>
          <View pointerEvents="none" style={styles.bannerOrnamentTop}>
            <View style={styles.bannerOrnamentLine} />
            <Text style={styles.bannerOrnamentStar}>✦</Text>
          </View>
          <Text style={styles.bannerPlane}>✈</Text>
          <View style={styles.bannerCopy}>
            <Text style={styles.bannerTitle}>Encontre tudo o que precisa</Text>
            <Text style={styles.bannerDescription}>para tornar seus dias mais organizados!</Text>
          </View>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={onOpenProducts}
            style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>Ver produtos</Text>
            <Symbol ios="arrow.right" android="arrow_forward" web="arrow_forward" size={17} color={colors.gold} />
          </TouchableOpacity>
          <View pointerEvents="none" style={styles.bannerOrnamentBottom}>
            <Text style={styles.bannerOrnamentStar}>✧</Text>
            <View style={[styles.bannerOrnamentLine, styles.bannerOrnamentShortLine]} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}