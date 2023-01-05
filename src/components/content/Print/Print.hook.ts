import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { api } from "../../../services/api";
import { PaperTypes } from "./Print.enum";

type Product = {
  id: number;
  name: string;
  price: number;
  position: number;
};

export const usePrint = () => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [selectedPaper, setSelectedPaper] = useState<PaperTypes>(
    PaperTypes.one
  );
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const { data } = useQuery("products", () =>
    api.get("/products/listProducts").then((response) => response.data.products)
  );

  const handleAddProduct = (product: Product) => {
    setSelectedProducts([
      ...selectedProducts,
      { ...product, position: currentPosition },
    ]);
    setCurrentPosition((prev) => prev + 1);
  };

  useEffect(() => {
    if (data) setProducts(data);
  }, [data]);

  const handlePrint = () => {
    console.log("print");
  };
  const handleSelectPaper = (paper: PaperTypes) => {
    setSelectedPaper(paper);
  };
  return {
    products,
    selectedProducts,
    handleSelectPaper,
    selectedPaper,
    handleAddProduct,
    handlePrint,
  };
};
