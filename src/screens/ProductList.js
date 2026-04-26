import { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { getProducts, getProductByCategory } from "../services/productService";
import ModalFilter from "../components/ModalFilter";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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

function StarRating() {
  return (
    <View style={styles.stars}>
      {[1,2,3,4].map(i => (
        <Text key={i} style={styles.starFilled}>★</Text>
      ))}
      <Text style={styles.starEmpty}>★</Text>
    </View>
  );
}

function ProductCard({ item, index, onPress }) {
  const [fav, setFav] = useState(false);
  const bgColor = CARD_BG_COLORS[index % CARD_BG_COLORS.length];

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.92}
      onPress={onPress}
    >
      <View style={[styles.cardImageWrap, { backgroundColor: bgColor }]}>
        <Image
          style={styles.cardImage}
          source={{ uri: item.imageUrl }}
          resizeMode="contain"
        />
        {/* Coração: alterna entre outline e preenchido ao clicar */}
        <TouchableOpacity
          style={styles.favBtn}
          onPress={() => setFav(!fav)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <MaterialIcons
            name={fav ? "favorite" : "favorite-outline"}
            size={18}
            color={fav ? "#E05C5C" : "#AAA"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <StarRating />
        <Text style={styles.cardPrice}>
          R$ {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function ProductList({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Produtos",
      headerTitleAlign: "center",
      headerTitleStyle: { fontSize: 17, fontWeight: '700', color: '#5C6844' },
      headerStyle: { backgroundColor: CREAM, shadowColor: 'transparent', elevation: 0 },
      headerLeft: () => (
        <TouchableOpacity
          style={headerStyles.btn}
          onPress={() => navigation.replace("Login")}
        >
          <Text style={headerStyles.btnText}>Logout</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={[headerStyles.btn, headerStyles.btnOutline]}
          onPress={() => navigation.navigate("GroupInfo")}
        >
          <Text style={[headerStyles.btnText, headerStyles.btnTextOutline]}>Informações</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    getAllItems();
  }, []);

  async function getAllItems() {
    setLoading(true);
    const response = await getProducts();
    setItems(response.data);
    setLoading(false);
  }

  async function getByFilter(category) {
    setLoading(true);
    const response = await getProductByCategory(category);
    setItems(response.data);
    setLoading(false);
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color={OLIVE} />
      </View>
    );
  }

  const handleFilter = (category) => {
    if (!category) return;
    setFilter(category);
    getByFilter(category);
  }

  const handleRemoveFilter = () => {
    setFilter(null);
    getAllItems();
  }

  return (
    <View style={styles.containerScroll}>

      {/* Círculos decorativos de fundo */}
      <View style={styles.decCircle1} />
      <View style={styles.decCircle2} />
      <View style={styles.decCircle3} />
      <View style={styles.decCircle4} />

      {/* ÍCONE FILTRAR: */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => {
            if (filter) {
              handleRemoveFilter();
            } else {
              setModalVisible(true);
            }
          }}
        >
          {!filter ? (
            <MaterialCommunityIcons name="filter-variant" size={22} color="#F7F5EF" />
          ) : (
            <MaterialCommunityIcons name="filter-variant-remove" size={22} color="#F7F5EF" />
          )}
        </TouchableOpacity>
      </View>

      {/* POP-UP FILTRAGEM: */}
      <ModalFilter
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onFilter={handleFilter}
      />

      {/* LISTAGEM DE ITENS: */}
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <ProductCard
            item={item}
            index={index}
            onPress={() => navigation.navigate("ProductDetail", { id: item.id, index: index })}
          />
        )}
      />
    </View>
  );
}

const headerStyles = StyleSheet.create({
  btn: {
    marginLeft: 12,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: OLIVE,
    shadowColor: OLIVE_DARK,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  btnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  btnOutline: {
    marginLeft: 0,
    marginRight: 5,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: OLIVE,
    shadowOpacity: 0,
    elevation: 0,
  },
  btnTextOutline: {
    color: OLIVE_DARK,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CREAM,
    alignItems: "center",
    justifyContent: "center",
  },
  containerScroll: {
    flex: 1,
    backgroundColor: CREAM,
    position: 'relative',
  },
  decCircle1: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: OLIVE_LIGHT,
    opacity: 0.25,
    top: -40,
    left: -50,
  },
  decCircle2: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: OLIVE_LIGHT,
    opacity: 0.2,
    top: 200,
    right: -30,
  },
  decCircle3: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: OLIVE_LIGHT,
    opacity: 0.18,
    top: 500,
    left: -60,
  },
  decCircle4: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: OLIVE_LIGHT,
    opacity: 0.2,
    top: 750,
    right: -40,
  },

  filterRow: {
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: OLIVE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: OLIVE_DARK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  card: {
    width: '48%',
    backgroundColor: '#F7F5EF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  cardImageWrap: {
    width: '100%',
    aspectRatio: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: '80%',
    height: '80%',
  },
  favBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    padding: 10,
    backgroundColor: '#FFF',
    gap: 3,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2D2D2A",
  },
  stars: {
    flexDirection: 'row',
    gap: 1,
  },
  starFilled: {
    fontSize: 11,
    color: '#F5A623',
  },
  starEmpty: {
    fontSize: 11,
    color: '#DDD',
  },
  cardPrice: {
    fontSize: 13,
    fontWeight: "800",
    color: OLIVE_DARK,
  },
});