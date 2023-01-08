import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { api } from "../../../services/api";
import { EditProductFormData } from "../../ConfirmDialog";

type Product = {
  id: number;
  name: string;
  price: number;
};

export const useListProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [filterName, setFilterName] = useState("");

  const { data } = useQuery("products", () =>
    api.get("/products/listProducts").then((response) => response.data.products)
  );

  useEffect(() => {
    if (data) setProducts(data);
  }, [data]);

  const handleDeleteProduct = (product: Product) => {
    let requestUndo = false;
    setProducts(products.filter((p) => p.id !== product.id));
    toast.info("Produto excluido com sucesso", {
      position: "bottom-right",
      closeButton: () => (
        <button
          onClick={() => {
            setProducts((oldState) => [...oldState, product]);
            requestUndo = true;
          }}
          className="mr-4  underline"
        >
          Desfazer
        </button>
      ),
    });
    setTimeout(() => {
      if (!requestUndo) {
        api.delete(`/products/deleteProduct/${product.id}`);
      }
    }, 5000);
  };

  const handleConfirmEditProduct = (data: EditProductFormData) => {
    if (selectedProduct) {
      api
        .post(`/products/editProduct`, {
          id: selectedProduct.id,
          name: data.newName,
          price: data.newPrice,
        })
        .then(() => {
          setProducts(
            products.map((p) =>
              p.id === selectedProduct.id
                ? { ...p, name: data.newName, price: data.newPrice }
                : p
            )
          );
          handleCloseEditProductModal();
          toast.info("Produto editado com sucesso", {
            position: "bottom-right",
          });
        })
        .catch(() => {
          toast.error("Erro ao editar produto", {
            position: "bottom-right",
          });
        });
    }
  };

  const handleEditProduct = (product: Product) => {
    setIsEditingProduct(true);
    setSelectedProduct(product);
  };

  const handleCloseEditProductModal = () => {
    setSelectedProduct(undefined);
    setIsEditingProduct(false);
  };

  return {
    products,
    handleDeleteProduct,
    handleEditProduct,
    isEditingProduct,
    filterName,
    selectedProduct,
    handleCloseEditProductModal,
    handleConfirmEditProduct,
    setFilterName,
  };
};
