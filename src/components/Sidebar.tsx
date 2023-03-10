import React, { ReactNode, useState } from "react";
import AddProduct from "./content/AddProduct";
import ListProducts from "./content/ListProducts/ListProducts";
import Print from "./content/Print/Print";

interface SideBarProps {
  changeContent: (newContent: ReactNode) => void;
}

const SideBar: React.FC<SideBarProps> = ({ changeContent }) => {
  const [productsIsOpen, setProductsIsOpen] = useState(false);
  const [printingIsOpen, setPrintingIsOpen] = useState(false);

  return (
    <aside className="h-[100vh] w-52 bg-zinc-900 p-6 py-10">
      <p className="p-0 text-center text-4xl  tracking-[12px] text-white">
        CHIC
      </p>
      <p className="mt-2 p-0 text-center text-lg tracking-[6px] text-zinc-200">
        Acessórios
      </p>
      <div className="mt-8 flex flex-col gap-4">
        <div>
          <button
            className="text-xl font-semibold tracking-[2px] text-zinc-500"
            onClick={() => setProductsIsOpen((prev) => !prev)}
          >
            Produtos
          </button>
          <ul
            className={`mt-[12px] ml-[12px] flex-col gap-3 ${
              productsIsOpen ? "flex" : "hidden"
            }`}
          >
            <li
              onClick={() => changeContent(<AddProduct />)}
              className="cursor-pointer text-sm font-medium tracking-[2px] text-zinc-300 transition-all duration-150 hover:text-zinc-400"
            >
              Adicionar
            </li>
            <li
              onClick={() => changeContent(<ListProducts />)}
              className="cursor-pointer text-sm font-medium tracking-[2px] text-zinc-300 transition-all duration-150 hover:text-zinc-400"
            >
              Ver todos
            </li>
          </ul>
        </div>
        <div>
          <button
            className="text-xl font-semibold tracking-[2px] text-zinc-500"
            onClick={() => setPrintingIsOpen((prev) => !prev)}
          >
            Imprimir
          </button>
          <ul
            className={`mt-[12px] ml-[12px] flex-col gap-3 ${
              printingIsOpen ? "flex" : "hidden"
            }`}
          >
            <li
              onClick={() => changeContent(<Print />)}
              className="cursor-pointer text-sm font-medium tracking-[2px] text-zinc-300 transition-all duration-150 hover:text-zinc-400"
            >
              Unidades
            </li>
            <li
              onClick={() => changeContent(<Print linesMode={true} />)}
              className="cursor-pointer text-sm font-medium tracking-[2px] text-zinc-300 transition-all duration-150 hover:text-zinc-400"
            >
              Linhas
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
