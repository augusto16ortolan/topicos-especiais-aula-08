import api from "./api";

export async function selectAllProductsForLoggedUser(token) {
  try {
    const response = await api.get("/api/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      products: response.data.map((product) => ({
        id: product.id,
        name: product.description,
        price: product.price,
        quantity: 1,
      })),
    };
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os produtos.", error.message);
    return {
      error: "Ocorreu um erro ao buscar os produtos.",
      products: [],
    };
  }
}

export async function createProduct(token, product) {
  try {
    const response = await api.post("/api/products", product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      product: {
        id: response.data.id,
        name: response.data.description,
        price: response.data.price,
        quantity: 1,
      },
    };
  } catch (error) {
    console.error("Ocorreu um erro ao cadastrar o produto.", error.message);
    return {
      error: "Ocorreu um erro ao cadastrar o produto.",
      product: null,
    };
  }
}

export async function updateProduct(token, productId, product) {
  try {
    const response = await api.put(`/api/products/${productId}`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      product: {
        id: response.data.id,
        name: response.data.description,
        price: response.data.price,
        quantity: 1,
      },
    };
  } catch (error) {
    console.error("Ocorreu um erro ao editar o produto.", error.message);
    return {
      error: "Ocorreu um erro ao editar o produto.",
      product: null,
    };
  }
}

export async function deleteProduct(userId, productId) {
  try {
    return {
      product: null,
    };
  } catch (error) {
    console.error("Ocorreu um erro ao excluir o produto.", error.message);
    return {
      error: "Ocorreu um erro ao excluir o produto.",
      product: null,
    };
  }
}
