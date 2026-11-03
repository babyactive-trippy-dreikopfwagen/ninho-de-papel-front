import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SymbolView } from 'expo-symbols';
import { Image } from 'expo-image';
import { BrandLogo } from '../../components/brand-logo';
import { colors } from '../Home/style';
import { getProductCategories, getProducts, productSources } from '../../services/productApi';
import { styles } from './style';

function ProductCard({ product, onAdd }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <View style={styles.productCard}>
      <View style={[styles.productArtwork, { backgroundColor: product.color }]}>
        {product.imageUrl && !imageFailed ? (
          <Image
            source={{ uri: product.imageUrl }}
            contentFit="cover"
            onError={() => setImageFailed(true)}
            style={styles.productImage}
            transition={150}
          />
        ) : (
          <Text style={styles.productEmoji}>{product.image}</Text>
        )}
        {product.featured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredBadgeText}>Destaque</Text>
          </View>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productCategory}>{product.category}</Text>
        <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>{product.description}</Text>
        <Text style={styles.productPrice}>R$ {product.price.toFixed(2).replace('.', ',')}</Text>
        {product.inStock === false && <Text style={styles.outOfStock}>Sem estoque</Text>}
        <TouchableOpacity
          accessibilityRole="button"
          disabled={product.inStock === false}
          accessibilityLabel={`Adicionar ${product.name} ao carrinho`}
          onPress={onAdd}
          style={[styles.addButton, product.inStock === false && styles.addButtonDisabled]}>
          <SymbolView
            name={{ ios: 'cart', android: 'shopping_cart', web: 'shopping_cart' }}
            size={18}
            tintColor={colors.cream}
          />
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function Products({ onBack, initialCategory = 'Todas' }) {
  const [source, setSource] = useState('local');
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setProducts([]);

    getProducts({ source, signal: controller.signal })
      .then((catalog) => {
        if (active) setProducts(catalog);
      })
      .catch(() => {
        if (active && !controller.signal.aborted) {
          setError('Não foi possível carregar os produtos. Verifique a conexão com a API e tente novamente.');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [source, retryCount]);

  const categories = getProductCategories(source);
  const visibleProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('pt-BR');

    return products.filter((product) => {
      const matchesCategory = category === 'Todas' || product.category === category;
      const matchesSearch = !normalizedSearch ||
        `${product.name} ${product.description} ${product.category}`
          .toLocaleLowerCase('pt-BR')
          .includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });
  }, [category, products, search]);

  const listHeader = (
    <View>
      <View style={styles.pageTitleRow}>
        <View style={styles.pageTitleCopy}>
          <Text style={styles.eyebrow}>ENCONTRE SEUS FAVORITOS</Text>
          <Text style={styles.pageTitle}>Nossos produtos</Text>
        </View>
        <View style={styles.cartButton}>
          <SymbolView
            name={{ ios: 'cart', android: 'shopping_cart', web: 'shopping_cart' }}
            size={22}
            tintColor={colors.cream}
          />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </View>
      </View>

      <Text style={styles.filterLabel}>Catálogo</Text>
      <View style={styles.sourceOptions}>
        {productSources.map((option) => {
          const selected = source === option.id;
          return (
            <TouchableOpacity
              key={option.id}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => {
                if (source !== option.id) {
                  setSource(option.id);
                  setCategory('Todas');
                }
              }}
              style={[styles.sourceOption, selected && styles.sourceOptionSelected]}>
              <Text style={[styles.sourceOptionText, selected && styles.sourceOptionTextSelected]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.searchBox}>
        <SymbolView
          name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
          size={20}
          tintColor={colors.muted}
        />
        <TextInput
          accessibilityLabel="Buscar produtos"
          onChangeText={setSearch}
          placeholder={source === 'local' ? 'Busque cadernos, papéis, tesouras...' : 'Busque nos produtos da API externa...'}
          placeholderTextColor={colors.muted}
          returnKeyType="search"
          style={styles.searchInput}
          value={search}
        />
        {search.length > 0 && (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Limpar busca"
            onPress={() => setSearch('')}>
            <SymbolView
              name={{ ios: 'xmark.circle.fill', android: 'cancel', web: 'cancel' }}
              size={19}
              tintColor={colors.muted}
            />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.filterLabel}>Categorias</Text>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.name}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
        renderItem={({ item }) => {
          const selected = category === item.name;
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => setCategory(item.name)}
              style={[styles.categoryChip, selected && styles.categoryChipSelected]}>
              <SymbolView
                name={item.icon}
                size={16}
                tintColor={selected ? colors.cream : colors.deepBlue}
              />
              <Text style={[styles.categoryChipText, selected && styles.categoryChipTextSelected]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.resultsHeading}>
        <Text style={styles.resultsTitle}>{category === 'Todas' ? 'Papelaria para criar' : category}</Text>
        {!loading && <Text style={styles.resultsCount}>{visibleProducts.length} itens</Text>}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={colors.deepBlue} />
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          onPress={onBack}
          style={styles.backButton}>
          <SymbolView
            name={{ ios: 'arrow.left', android: 'arrow_back', web: 'arrow_back' }}
            size={23}
            tintColor={colors.cream}
          />
        </TouchableOpacity>
        <View style={styles.brand}>
          <BrandLogo width={155} height={36} />
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <FlatList
        data={visibleProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            {loading ? (
              <ActivityIndicator size="large" color={colors.deepBlue} />
            ) : (
              <Text style={styles.emptyEmoji}>{error ? '⚠️' : '🔎'}</Text>
            )}
            <Text style={styles.emptyTitle}>
              {error ? 'Ops!' : loading ? 'Carregando produtos...' : 'Nenhum produto encontrado'}
            </Text>
            <Text style={styles.emptyDescription}>
              {error || (!loading && 'Tente outra busca ou escolha uma categoria diferente.')}
            </Text>
            {error && (
              <TouchableOpacity
                accessibilityRole="button"
                onPress={() => setRetryCount((count) => count + 1)}
                style={styles.retryButton}>
                <Text style={styles.retryButtonText}>Tentar novamente</Text>
              </TouchableOpacity>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <ProductCard product={item} onAdd={() => setCartCount((count) => count + 1)} />
        )}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
}
