import React from "react";
import { usePrint } from "./Print.hook";
import { PaperTypes } from "./Print.enum";
import Aside from "./components/Aside";
export interface PrintProps {}

const Print: React.FC<PrintProps> = () => {
  const {
    products,
    handleAddProduct,
    setPaper,
    paper,
    positions,
    handleAddProductToPrint,
    handlePrint,
  } = usePrint();
  return (
    <main className="flex px-12 py-6">
      <Aside
        handleAddProduct={handleAddProduct}
        handleSelectPaper={setPaper}
        selectedPaper={paper}
        products={products}
        handlePrint={handlePrint}
      />
      <div className="flex flex-col items-center">
        <div className="h-[680px] bg-zinc-200">
          <div>
            <div
              className={`grid grid-cols-5 items-center justify-center bg-zinc-200 p-4 ${
                paper === PaperTypes.one ? "w-[700px]" : "w-[400px]"
              }`}
            >
              {positions.map((position) => {
                if (position.product) {
                  return (
                    <div key={position.id} className="p-2 px-4 text-center">
                      <p className="text-[13px] font-bold">
                        {position.product.name}
                      </p>
                    </div>
                  );
                } else {
                  return (
                    <div key={position.id} className="p-2 px-4 text-center">
                      <p
                        onClick={() => handleAddProductToPrint(position)}
                        className="cursor-pointer  text-[13px]"
                      >
                        Disponível
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Print;
