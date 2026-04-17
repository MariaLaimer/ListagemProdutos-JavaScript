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

export default function ProductDetail({ navigation, route }) {
  const { id } = route.params;
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);

  useLayoutEffect(() => {
      navigation.setOptions({
        title: item?.title || "Carregando Item...",
        headerTitleAlign: "center",
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
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: item?.image || item?.imageUrl }}
        resizeMode="contain"
      />

      <View style={styles.body}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item?.category}</Text>
        </View>

        <Text style={styles.title}>{item?.title}</Text>

        <Text style={styles.price}>${item?.price?.toFixed(2)}</Text>

        <Text style={styles.description}>{item?.description}</Text>

        <View style={styles.divider} />

        <View style={styles.ratingRow}>
          <View style={styles.ratingCard}>
            <Text style={styles.ratingLabel}>Avaliação</Text>
            <Text style={styles.ratingValue}>{item?.rating?.rate} / 5</Text>
            <Text style={styles.ratingStars}>
              {"★".repeat(Math.round(item?.rating?.rate ?? 0))}
              {"☆".repeat(5 - Math.round(item?.rating?.rate ?? 0))}
            </Text>
          </View>
          <View style={styles.ratingCard}>
            <Text style={styles.ratingLabel}>Avaliações</Text>
            <Text style={styles.ratingValue}>{item?.rating?.count}</Text>
            <Text style={styles.ratingSubtext}>votos</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Adicionar ao carrinho</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },

  image: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#f5f5f5",
  },

  body: { padding: 16 },

  categoryBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 99,
    backgroundColor: "#EEEDFE",
    marginBottom: 10,
  },
  categoryText: { fontSize: 11, color: "#3C3489", textTransform: "capitalize" },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
    lineHeight: 26,
  },

  price: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 12,
  },

  description: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
    marginBottom: 16,
  },

  divider: { height: 0.5, backgroundColor: "#e0e0e0", marginVertical: 16 },

  ratingRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  ratingCard: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  ratingLabel: { fontSize: 11, color: "#888", marginBottom: 4 },
  ratingValue: { fontSize: 18, fontWeight: "700", color: "#1a1a1a" },
  ratingStars: { fontSize: 13, color: "#f5a623", marginTop: 2 },
  ratingSubtext: { fontSize: 11, color: "#888", marginTop: 2 },

  button: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: { fontSize: 15, fontWeight: "600", color: "#fff" },
});