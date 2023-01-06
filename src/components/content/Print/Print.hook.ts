import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { api } from "../../../services/api";
import { generatePdf } from "../../../utils/generatePdf";
import { PaperTypes } from "./Print.enum";

export type Product = {
  id: number;
  name: string;
  price: number;
  position: number;
  isActive: boolean;
};

export type Position = {
  id: number;
  product?: Product;
};

export const usePrint = () => {
  const [paper, setPaper] = useState<PaperTypes>(PaperTypes.one);
  const [products, setProducts] = useState<Product[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);

  const { data } = useQuery("products", () =>
    api.get("/products/listProducts").then((response) => {
      return response.data.products.map((product: Product) => {
        return { ...product, isActive: false };
      });
    })
  );

  useEffect(() => {
    if (data) setProducts(data);
    if (paper === PaperTypes.one) {
      const initialPositions = [];
      for (let i = 0; i < 90; i++) {
        initialPositions.push({ id: i });
      }
      setPositions(initialPositions);
    } else {
      // TODO Aqui vai ir a contagem de posições para o papel 2
    }
  }, [data, paper]);

  const handleAddProduct = (clickedProduct: Product) => {
    setProducts((prevState) => {
      return prevState.map((product) => {
        if (product.isActive) {
          return { ...product, isActive: false };
        }
        if (product.id === clickedProduct.id) {
          return { ...product, isActive: true };
        }
        return product;
      });
    });
  };

  const handleAddProductToPrint = (position: Position) => {
    setPositions((prevState) => {
      return prevState.map((pos) => {
        if (pos.id === position.id) {
          const product = products.find((product) => product.isActive);
          return { ...pos, product };
        }
        return pos;
      });
    });
  };

  const handlePrint = () => {
    generatePdf({ paper, positions });
  };

  return {
    products,
    setPaper,
    paper,
    handleAddProduct,
    positions,
    setPositions,
    handleAddProductToPrint,
    handlePrint,
  };
};
