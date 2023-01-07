import React, { ReactNode } from "react";
import { usePrint } from "./Print.hook";
import { PaperTypes } from "./Print.enum";
import Aside from "./components/Aside";
import { Minus, Plus } from "phosphor-react";
export interface PrintProps {
  linesMode?: boolean;
}

const Print: React.FC<PrintProps> = ({ linesMode = false }) => {
  const {
    products,
    handleAddProduct,
    setPaper,
    paper,
    positions,
    handleAddProductToPrint,
    handlePrint,
    handleRemoveProductFromPrint,
  } = usePrint({ linesMode });

  const rows: ReactNode[] = [];
  for (let i = 0; i < 89; i = i + 5) {
    if (positions[i]?.product) {
      rows.push(
        <Minus
          key={positions[i]?.id}
          onClick={() => handleRemoveProductFromPrint(positions[i])}
          className="cursor-pointer"
          size={16}
          weight="bold"
        />
      );
    } else {
      rows.push(
        <Plus
          key={positions[i]?.id}
          onClick={() => handleAddProductToPrint(positions[i])}
          className="cursor-pointer"
          size={16}
          weight="bold"
        />
      );
    }
  }

  return (
    <main className="flex gap-4  py-6">
      <Aside
        handleAddProduct={handleAddProduct}
        handleSelectPaper={setPaper}
        selectedPaper={paper}
        products={products}
        handlePrint={handlePrint}
      />
      <div className="flex ">
        {linesMode && (
          <div className="mr-8 mt-[24px] flex flex-col gap-[19.7px]">
            {rows}
          </div>
        )}
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
                      <p
                        onClick={() => handleRemoveProductFromPrint(position)}
                        className="cursor-pointer text-[13px] font-bold"
                      >
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
                        style={{
                          cursor: linesMode ? "not-allowed" : "pointer",
                        }}
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
