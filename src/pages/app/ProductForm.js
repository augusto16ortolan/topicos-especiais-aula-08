import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { createProduct, updateProduct } from "../../services/ProductService";
import { supabase } from "../../config/supabase";

export default function ProductForm({ navigation, route }) {
  const { setProductList, productToUpdate } = route.params;
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(
    productToUpdate?.description || ""
  );
  const [price, setPrice] = useState(productToUpdate?.price || 0);

  async function handleSave() {
    try {
      setLoading(true);

      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user.id;

      const productToSave = {
        description,
        price,
      };

      let { product, error } = productToUpdate
        ? await updateProduct(userId, productToUpdate.id, productToSave)
        : await createProduct(userId, productToSave);

      if (error) {
        alert(error.message || error);
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
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar produto");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Input
        label="Descrição"
        onChangeText={setDescription}
        value={description}
      />
      <Input
        label="Preço"
        onChangeText={(text) => setPrice(Number(text))}
        value={price.toString()}
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
