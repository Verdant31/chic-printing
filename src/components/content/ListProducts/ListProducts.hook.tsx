import React, { useState } from "react";
import { toast } from "react-toastify";
import { EditProductFormData } from "../../ConfirmDialog";

type Product = {
  id: number;
  name: string;
  price: number;
};

const mockData = [
  {
    id: 1,
    name: "Colar branco X",
    price: 48.6,
  },
  {
    id: 2,
    name: "Colar branco Y",
    price: 48.6,
  },
];

export const useListProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [mockProducts, setMockProducts] = useState(mockData);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [filterName, setFilterName] = useState("");

  const handleDeleteProduct = (product: any) => {
    setMockProducts(mockProducts.filter((p) => p.id !== product.id));
    toast.info("Produto excluido com sucesso", {
      position: "bottom-right",
      closeButton: () => (
        <button
          onClick={() => setMockProducts((oldState) => [...oldState, product])}
          className="mr-4  underline"
        >
          Desfazer
        </button>
      ),
    });
  };
  const handleConfirmEditProduct = (data: EditProductFormData) => {
    if (selectedProduct) {
      setMockProducts(
        mockProducts.map((p) =>
          p.id === selectedProduct.id
            ? { ...p, name: data.newName, price: data.newPrice }
            : p
        )
      );
      handleCloseEditProductModal();
      toast.info("Produto editado com sucesso", {
        position: "bottom-right",
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
    mockProducts,
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
