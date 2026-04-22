import api from "./api";

const formatProduct = (product) => ({
  id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.image,
      category: product.category
});

export async function getProducts() {
  try {
    const response = await api.get("/products");
    const products = response.data.map(formatProduct);

    return {
      data: products,
      success: true,
    };

  } catch (error) {
    console.error(error.message);
    return {
      data: null,
      success: false,
      errorMessage: "Ocorreu um erro",
    };
  }
}

export async function getProductById(id) {
  try {
    const response = await api.get(`/products/${id}`);

    return {
      data: response.data,
      success: true,
    };
  } catch (error) {
    console.error(error.message);
    return {
      data: null,
      success: false,
      errorMessage: "Ocorreu um erro",
    };
  }
}

export async function getProductByCategory(categoryName) {
  try {
    const response = await api.get(`/products`);
    const filteredData = response.data.filter(
      (product) => product.category.toLowerCase() === categoryName.toLowerCase())
      .map(formatProduct);

    return {
      data: filteredData,
      success: true,
    };
  } catch (error) {
    console.error(error.message);
    return {
      data: [],
      success: false,
      errorMessage: "Erro ao filtrar produtos",
    };
  }
}