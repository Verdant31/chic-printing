import React from "react";
import { Product } from "../Print.hook";
import { PaperTypes } from "../Print.enum";
import { useAside } from "./Aside.hook";

export interface AsideProps {
  handleSelectPaper: (paperType: PaperTypes) => void;
  selectedPaper: PaperTypes;
  handleAddProduct: (product: Product) => void;
  products: Product[];
  handlePrint: () => void;
}

const Aside: React.FC<AsideProps> = ({
  handleAddProduct,
  handleSelectPaper,
  selectedPaper,
  products,
  handlePrint,
}) => {
  const { filterName, setFilterName } = useAside();
  const filteredProducts =
    filterName.length > 0
      ? products.filter((product) => {
          return product.name.toLowerCase().includes(filterName.toLowerCase());
        })
      : [];
  return (
    <div className="relative ml-4 mr-8">
      <div
        className={`${
          selectedPaper === PaperTypes.one
            ? "flex flex-col"
            : "flex justify-center gap-4"
        } items-center`}
      >
        <p
          onClick={() => handleSelectPaper(PaperTypes.one)}
          className="font-regular mb-4 cursor-pointer text-xl"
          style={{
            textDecoration:
              selectedPaper === PaperTypes.one ? "underline" : "none",
          }}
        >
          Folha tipo 1
        </p>
        <p
          onClick={() => handleSelectPaper(PaperTypes.two)}
          className="font-regular mb-4 cursor-pointer text-xl"
          style={{
            textDecoration:
              selectedPaper === PaperTypes.two ? "underline" : "none",
          }}
        >
          Folha tipo 2
        </p>
      </div>
      <input
        onChange={(e) => setFilterName(e.target.value)}
        className="mb-4 ml-2 h-8 w-[100%] rounded-md p-6 text-sm focus:outline-none"
        placeholder="Pesquise por um produto..."
      />
      <div
        className="ml-4 grid max-h-[500px] w-[200px] grid-cols-1 self-center overflow-y-scroll"
        style={{
          width: selectedPaper === PaperTypes.one ? "200px" : "650px",
          gridTemplateColumns:
            selectedPaper === PaperTypes.one
              ? "repeat(1, minmax(0, 1fr))"
              : "repeat(3, minmax(0, 1fr))",
        }}
      >
        {filteredProducts.length > 0
          ? filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleAddProduct(product)}
                style={
                  product.isActive
                    ? { backgroundColor: "#1A202C", color: "white" }
                    : {}
                }
                className="my-2 flex h-[50px] cursor-pointer items-center rounded-md bg-gray-200 px-4"
              >
                <p className="text-sm">{product.name}</p>
              </div>
            ))
          : products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleAddProduct(product)}
                style={
                  product.isActive
                    ? { backgroundColor: "#1A202C", color: "white" }
                    : {}
                }
                className="my-2 flex h-[50px] cursor-pointer items-center rounded-md bg-gray-200 px-4"
              >
                <p className="text-sm">{product.name}</p>
              </div>
            ))}
      </div>
      <button
        onClick={handlePrint}
        className="absolute bottom-10 left-[50%] -translate-x-[50%] text-2xl underline"
      >
        Imprimir
      </button>
    </div>
  );
};

export default Aside;
