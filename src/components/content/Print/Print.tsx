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
  for (
    let i = 0;
    i < (paper === PaperTypes.one ? 126 : 40);
    i = i + (paper === PaperTypes.one ? 7 : 2)
  ) {
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
    <main className="flex w-[calc(100vw-228px)]  justify-between gap-4 py-6">
      <Aside
        handleAddProduct={handleAddProduct}
        handleSelectPaper={setPaper}
        selectedPaper={paper}
        products={products}
        handlePrint={handlePrint}
      />
      <div
        className={`flex ${
          linesMode && paper === PaperTypes.one ? "" : "mr-8"
        }`}
      >
        {linesMode && (
          <div className="mr-8 mt-[24px] flex flex-col gap-[19.7px]">
            {rows}
          </div>
        )}
        <div className="h-[680px] bg-zinc-200">
          <div>
            <div
              className={`grid items-center justify-center bg-zinc-200 p-4 ${
                paper === PaperTypes.one
                  ? "h-[650px] w-[880px] grid-cols-7"
                  : "h-[730px] w-[400px] grid-cols-2"
              }`}
            >
              {positions.map((position) => {
                if (position.product) {
                  return (
                    <div
                      key={position.id}
                      className=" p-2 px-[4px] text-center"
                    >
                      <p
                        onClick={() => handleRemoveProductFromPrint(position)}
                        className=" cursor-pointer overflow-hidden overflow-ellipsis whitespace-nowrap text-[13px] font-bold"
                      >
                        {position.product.name}
                      </p>
                    </div>
                  );
                } else {
                  return (
                    <div key={position.id} className="p-2 px-0 text-center">
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
