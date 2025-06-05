import { supabase } from "../config/supabase";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import * as mime from "react-native-mime-types";

export async function selectAllProductsForLoggedUser(userId) {
  try {
    let { data: products, error } = await supabase
      .from("product")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      return {
        error: error.message,
        products: [],
      };
    }

    return {
      products,
    };
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os produtos.", error.message);
    return {
      error: "Ocorreu um erro ao buscar os produtos.",
      products: [],
    };
  }
}

export async function createProduct(userId, product) {
  try {
    const imageUrl = await uploadImage(product.image, userId);

    if (imageUrl === null) {
      return {
        error: "Ocorreu um erro ao cadastrar o produto e adicionar imagem.",
        product: null,
      };
    }

    let productToCreate = {
      description: product.description,
      price: product.price,
      user_id: userId,
      image: imageUrl,
    };

    const { data: productCreated, error } = await supabase
      .from("product")
      .insert([productToCreate])
      .select();

    if (error) {
      return {
        error: error.message,
        product: null,
      };
    }

    return {
      product: productCreated[0],
    };
  } catch (error) {
    console.error("Ocorreu um erro ao cadastrar o produto.", error.message);
    return {
      error: "Ocorreu um erro ao cadastrar o produto.",
      product: null,
    };
  }
}

export async function updateProduct(userId, productId, product) {
  try {
    const imageUrl = await uploadImage(product.image, userId);

    if (imageUrl === null) {
      return {
        error: "Ocorreu um erro ao cadastrar o produto e adicionar imagem.",
        product: null,
      };
    }

    let productToUpdate = {
      description: product.description,
      price: product.price,
      user_id: userId,
      image: imageUrl,
    };

    const { data: productUpdated, error } = await supabase
      .from("product")
      .update([productToUpdate])
      .eq("user_id", userId)
      .eq("id", productId)
      .select();

    if (error) {
      return {
        error: error.message,
        product: null,
      };
    }

    return {
      product: productUpdated[0],
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
    const { error } = await supabase
      .from("product")
      .delete()
      .eq("id", productId)
      .eq("user_id", userId);
    if (error) {
      return {
        error: error.message,
        product: null,
      };
    }
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

async function uploadImage(imageUri, userId) {
  if (!imageUri) {
    return "";
  }

  try {
    const response = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const ext = imageUri.split(".").pop();
    const fileName = `${userId}_${Date.now()}.${ext}`;
    const filePath = `products/${fileName}`;
    const contentType = mime.lookup(ext) || "image/jpeg";

    const { error } = await supabase.storage
      .from("products")
      .upload(filePath, decode(response), {
        contentType,
        upsert: true,
      });

    if (error) {
      console.error("Erro ao fazer upload da imagem:", error.message);
      return null;
    }

    const { data } = supabase.storage.from("products").getPublicUrl(filePath);

    return data.publicUrl;
  } catch (err) {
    console.error("Erro ao processar imagem:", err.message);
    return null;
  }
}
