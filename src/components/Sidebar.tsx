import React, { useState } from "react";

const SideBar: React.FC = () => {
  const [productsIsOpen, setProductsIsOpen] = useState(false);

  return (
    <aside className="h-[100vh] w-64 bg-zinc-900 p-6 py-12">
      <p className="p-0 text-center text-4xl  tracking-[12px] text-white">
        CHIC
      </p>
      <div className="mt-6">
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
            <li className="cursor-pointer text-sm font-medium tracking-[2px] text-zinc-300 transition-all duration-150 hover:text-zinc-400">
              Adicionar
            </li>
            <li className="cursor-pointer text-sm font-medium tracking-[2px] text-zinc-300 transition-all duration-150 hover:text-zinc-400">
              Ver todos
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
