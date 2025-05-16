import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { supabase } from "../../config/supabase";
import {
  selectAllProductsForLoggedUser,
  deleteProduct,
} from "../../services/ProductService";
import ProductCard from "../../components/ProductCard";

export default function HomeScreen({ navigation }) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      setProductList([]);
      const { data: session } = await supabase.auth.getSession();
      let { products, error } = await selectAllProductsForLoggedUser(
        session?.session?.user.id
      );
      if (error) {
        alert(error);
        return;
      }

      setProductList(products);
    } catch (error) {
      console.error("Ocorreu um erro ao buscar os produtos.", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  async function deleteProductId(productId) {
    try {
      const { data: session } = await supabase.auth.getSession();
      let { error } = await deleteProduct(session?.session?.user.id, productId);

      if (error) {
        alert(error);
        return;
      }

      setProductList(productList.filter((product) => product.id !== productId));
    } catch (error) {
      alert(error.message);
    } finally {
    }
  }

  async function editProductById(product) {
    console.log(product);
    navigation.navigate("ProductForm", {
      productToUpdate: product,
      setProductList,
    });
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ProductForm", { setProductList })}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <FlatList
        keyExtractor={(item) => item.id}
        data={productList}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onEdit={() => editProductById(item)}
            onDelete={() => deleteProductId(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
  },
  welcome: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#10B981",
    paddingVertical: 14,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
