import React from "react";
import { usePrint } from "./Print.hook";
import { PaperTypes } from "./Print.enum";
export interface PrintProps {}

const Print: React.FC<PrintProps> = () => {
  const {
    products,
    handleAddProduct,
    selectedProducts,
    selectedPaper,
    handleSelectPaper,
    handlePrint,
  } = usePrint();
  return (
    <main className="flex px-12 py-12">
      <div>
        <div className="flex w-[350px] flex-wrap gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleAddProduct(product)}
              className="cursor-pointer rounded-md bg-gray-200 p-2 px-4"
            >
              <p className="text-sm">{product.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-4">
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
        <div className="h-[620px] bg-zinc-200">
          <div>
            <div
              className={`flex flex-wrap items-center justify-center bg-zinc-200 p-2 ${
                selectedPaper === PaperTypes.one ? "w-[700px]" : "w-[400px]"
              }`}
            >
              {selectedProducts.map((product) => (
                <div key={product.id} className="p-2 px-4">
                  <p className="text-[13px]">{product.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button className="mt-6" onClick={handlePrint}>
          Imprimir
        </button>
      </div>
    </main>
  );
};

export default Print;
