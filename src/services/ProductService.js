import { supabase } from "../config/supabase";

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
    let productToCreate = { ...product, user_id: userId };
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
    const { data: productUpdated, error } = await supabase
      .from("product")
      .update([product])
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
