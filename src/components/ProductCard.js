import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{ uri: product.image }} />
      <View style={styles.info}>
        <Text style={styles.name}>{product.description}</Text>
        <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.iconButton, styles.edit]}
          onPress={onEdit}
        >
          <MaterialIcons name="edit" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconButton, styles.delete]}
          onPress={onDelete}
        >
          <MaterialIcons name="delete" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#10B981",
    marginTop: 4,
  },
  buttons: {
    flexDirection: "row",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  edit: {
    backgroundColor: "#3B82F6",
  },
  delete: {
    backgroundColor: "#EF4444",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 8,
    backgroundColor: "#D1D5DB",
    resizeMode: "cover",
    marginRight: 8,
  },
});
