import { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { getProducts, getProductByCategory } from "../services/productService";
import ModalFilter from "../components/ModalFilter";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function ProductList({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

useLayoutEffect(() => {
  navigation.setOptions({
    title: "Lista de Produtos",
    headerTitleAlign: "center",
    headerLeft: () => {
      return (
        <Button
          title="Logout"
          onPress={() => navigation.replace("Login")}
        />
      );
    },
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate("GroupInfo")}
        style={{ marginRight: 12 }}
      >
        <Text style={{ color: "#007AFF", fontSize: 16 }}>Informações</Text>
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
        <ActivityIndicator size={"large"} />
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

      {/* ÍCONE FILTRAR: */}
      <View style={styles.filter}>
        <TouchableOpacity
          onPress={() => {
            if (filter) {
              handleRemoveFilter();
            } else {
              setModalVisible(true);
            }
          }}
        >
          {!filter ? (
            <MaterialCommunityIcons name="filter-variant" size={34} color="black" />
          ) : (
            <MaterialCommunityIcons name="filter-variant-remove" size={34} color="black" />)}
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
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate("ProductDetail", {
                id: item.id,
              })
            }
          >
            <Image
              style={styles.cardImage}
              source={{ uri: item.imageUrl }}
              resizeMode="cover"
            />
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.cardPrice}>
                {item.price}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filter: {
    alignItems: "flex-end",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  containerScroll: {
    flex: 1,
    backgroundColor: "#fff",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 12,
    gap: 12,
  },
  card: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#f5f5f5",
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  cardBody: {
    padding: 10,
  },
});
