import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { getProductById } from "../services/productService";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const OLIVE = '#7C8C5E';
const OLIVE_DARK = '#5C6844';
const OLIVE_LIGHT = '#D4DCBF';
const CREAM = '#F7F5EF';

const CARD_BG_COLORS = [
  '#D6E8D0',
  '#F2E8DE',
  '#E8E0D5',
  '#D9E6E0',
  '#EDE0D6',
  '#DDE8D6',
];

export default function ProductDetail({ navigation, route }) {
  const { id, index } = route.params;
  const bgColor = CARD_BG_COLORS[(index ?? 0) % CARD_BG_COLORS.length];
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const [activeTab, setActiveTab] = useState('Detalhes');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerStyle: { backgroundColor: '#F7F5EF', shadowColor: 'transparent', elevation: 0 },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={headerStyles.backBtn}
        >
          <MaterialCommunityIcons name="arrow-left" size={20} color="#FFF" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, item]);

  useEffect(() => {
    getItem();
  }, []);

  async function getItem() {
    setLoading(true);
    try {
      const response = await getProductById(id);
      setItem(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={OLIVE} />
      </View>
    );
  }

  const ratingRate = item?.rating?.rate ?? 0;
  const ratingCount = item?.rating?.count ?? 0;
  const fullStars = Math.round(ratingRate);

  return (
    <View style={styles.wrapper}>

      {/* Imagem com fundo colorido igual ao card da lista */}
      <View style={[styles.imageSection, { backgroundColor: bgColor }]}>
        <Image
          style={styles.image}
          source={{ uri: item?.image || item?.imageUrl }}
          resizeMode="contain"
        />
      </View>

      {/* Card conteúdo sobrepondo a imagem */}
      <View style={styles.contentCard}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

          {/* Badge categoria + preço */}
          <View style={styles.topRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{item?.category}</Text>
            </View>
            <Text style={styles.price}>R$ {item?.price?.toFixed(2)}</Text>
          </View>

          {/* Título */}
          <Text style={styles.title}>{item?.title}</Text>

          {/* Estrelas + contagem */}
          <View style={styles.ratingRow}>
            <View style={styles.starsRow}>
              {[1,2,3,4,5].map(i => (
                <Text key={i} style={i <= fullStars ? styles.starFilled : styles.starEmpty}>★</Text>
              ))}
            </View>
            <Text style={styles.ratingCount}>({ratingCount} avaliações)</Text>
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            {['Detalhes', 'Avaliação'].map(tab => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.tabActive]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Conteúdo da tab */}
          {activeTab === 'Detalhes' ? (
            <Text style={styles.description}>{item?.description}</Text>
          ) : (
            <View style={styles.reviewSection}>
              <View style={styles.reviewCard}>
                <Text style={styles.reviewScore}>{ratingRate.toFixed(1)}</Text>
                <Text style={styles.reviewLabel}>de 5.0</Text>
                <View style={styles.starsRow}>
                  {[1,2,3,4,5].map(i => (
                    <Text key={i} style={i <= fullStars ? styles.starFilled : styles.starEmpty}>★</Text>
                  ))}
                </View>
              </View>
              <View style={styles.reviewCard}>
                <Text style={styles.reviewScore}>{ratingCount}</Text>
                <Text style={styles.reviewLabel}>votos</Text>
                <Text style={styles.reviewSub}>total de avaliações</Text>
              </View>
            </View>
          )}

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Botão fixo */}
        <View style={styles.btnWrap}>
          <TouchableOpacity style={styles.button} activeOpacity={0.85}>
            <Text style={styles.buttonText}>Adicionar ao carrinho</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  backBtn: {
    marginLeft: 12,
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: OLIVE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: OLIVE_DARK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
});

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: CREAM,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CREAM,
  },

  // Seção da imagem
  imageSection: {
    height: 280,
    backgroundColor: '#EDE9E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '75%',
    height: '85%',
  },

  // Card branco sobrepondo
  contentCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 8,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 28,
  },

  // Topo: badge + preço
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: OLIVE_LIGHT,
  },
  categoryText: {
    fontSize: 11,
    color: OLIVE_DARK,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  price: {
    fontSize: 22,
    fontWeight: '800',
    color: OLIVE_DARK,
  },

  // Título
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2D2D2A',
    lineHeight: 25,
    marginBottom: 10,
  },

  // Estrelas
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  starFilled: {
    fontSize: 14,
    color: '#F5A623',
  },
  starEmpty: {
    fontSize: 14,
    color: '#DDD',
  },
  ratingCount: {
    fontSize: 12,
    color: '#9A9A8A',
  },

  // Tabs
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1.5,
    borderBottomColor: '#EBEBEB',
    marginBottom: 16,
  },
  tab: {
    marginRight: 24,
    paddingBottom: 10,
  },
  tabActive: {
    borderBottomWidth: 2.5,
    borderBottomColor: OLIVE,
  },
  tabText: {
    fontSize: 14,
    color: '#B5B5A8',
    fontWeight: '500',
  },
  tabTextActive: {
    color: OLIVE_DARK,
    fontWeight: '700',
  },

  // Descrição
  description: {
    fontSize: 13.5,
    color: '#6B6B5E',
    lineHeight: 22,
  },

  // Avaliação tab
  reviewSection: {
    flexDirection: 'row',
    gap: 12,
  },
  reviewCard: {
    flex: 1,
    backgroundColor: CREAM,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 4,
  },
  reviewScore: {
    fontSize: 28,
    fontWeight: '800',
    color: OLIVE_DARK,
  },
  reviewLabel: {
    fontSize: 12,
    color: '#9A9A8A',
  },
  reviewSub: {
    fontSize: 11,
    color: '#B5B5A8',
    textAlign: 'center',
  },

  // Botão
  btnWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0EDE5',
  },
  button: {
    backgroundColor: OLIVE,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: OLIVE_DARK,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: 0.3,
  },
});