import React from "react";
import { Product } from "../Print.hook";
import { PaperTypes } from "../Print.enum";

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
  return (
    <div className="relative ">
      <div className="ml-4 flex items-center gap-4">
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
      <div className="flex w-[350px] flex-wrap gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleAddProduct(product)}
            style={
              product.isActive
                ? { backgroundColor: "#1A202C", color: "white" }
                : {}
            }
            className="cursor-pointer rounded-md bg-gray-200 p-2 px-4"
          >
            <p className="text-sm">{product.name}</p>
          </div>
        ))}
      </div>
      <button
        onClick={handlePrint}
        className="absolute bottom-10 left-[45%] -translate-x-[50%] text-2xl underline"
      >
        Imprimir
      </button>
    </div>
  );
};

export default Aside;
