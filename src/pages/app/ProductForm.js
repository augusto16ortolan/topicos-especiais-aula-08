import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { createProduct, updateProduct } from "../../services/ProductService";
import { supabase } from "../../config/supabase";
import { useAuth } from "../../context/AuthContext";

export default function ProductForm({ navigation, route }) {
  const { setProductList, productToUpdate } = route.params;
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(productToUpdate?.name || "");
  const [price, setPrice] = useState(productToUpdate?.price || 0);
  const [quantity, setQuantity] = useState(productToUpdate?.quantity || 0);

  const { token } = useAuth();

  /*async function handleSave() {
    try {
      setLoading(true);
      const productToSave = {
        name,
        price,
        quantity,
      };
      const { data: session } = await supabase.auth.getSession();
      let { product, error } = productToUpdate
        ? await updateProduct(
            session?.session?.user.id,
            productToUpdate.id,
            productToSave
          )
        : await createProduct(session?.session?.user.id, productToSave);
      if (error) {
        alert(error);
        return;
      }

      if (productToUpdate) {
        setProductList((prevState) =>
          prevState.map((p) => (p.id === productToUpdate.id ? product : p))
        );
      } else {
        setProductList((prevState) => [...prevState, product]);
      }

      navigation.goBack();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }*/

  async function handleSave() {
    try {
      setLoading(true);
      const productToSave = {
        description: name,
        price,
        brandId: "8c597b25-8d29-4ddc-b375-b79b2ebd3498",
      };
      let { product, error } = productToUpdate
        ? await updateProduct(token, productToUpdate.id, productToSave)
        : await createProduct(token, productToSave);
      if (error) {
        alert(error);
        return;
      }

      if (productToUpdate) {
        setProductList((prevState) =>
          prevState.map((p) => (p.id === productToUpdate.id ? product : p))
        );
      } else {
        setProductList((prevState) => [...prevState, product]);
      }

      navigation.goBack();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Input label="Nome" onChangeText={setName} value={name} />
      <Input
        label="Preço"
        onChangeText={(text) => setPrice(Number(text))}
        value={price.toString()}
      />
      <Input
        label="Quantidade"
        onChangeText={(text) => setQuantity(Number(text))}
        value={quantity.toString()}
      />
      <Button title="Salvar" onPress={handleSave} loading={loading} />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
  },
});
