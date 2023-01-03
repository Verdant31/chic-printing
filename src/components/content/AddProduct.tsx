import React, { useRef } from "react";

const AddProduct: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const handleAddProdct = () => {
    if (nameRef.current && priceRef.current) {
      const name = nameRef.current.value;
      const price = priceRef.current.value;
      console.log(name, price);
    }
  };
  return (
    <main className="mx-auto my-12 flex max-w-7xl flex-col items-center">
      <p
        className="text-4xl font-semibold tracking-widest text-zinc-700"
        style={{ wordSpacing: 12 }}
      >
        ADICIONAR PRODUTO
      </p>
      <form className="mt-10 flex min-h-[200px] min-w-[800px] flex-col rounded-md bg-zinc-800 p-12">
        <div className="flex justify-between ">
          <input
            ref={nameRef}
            className="h-9 min-w-[300px] rounded-sm p-4 px-4 focus:outline-none"
            placeholder="Nome"
          />
          <input
            ref={priceRef}
            className="h-9 min-w-[300px] rounded-sm p-2 px-4"
            type="number"
            placeholder="Preço"
          />
        </div>
        <button
          onClick={handleAddProdct}
          className="mt-14 h-10 w-[100%] self-center rounded-md bg-white text-center text-zinc-600"
        >
          Confirmar
        </button>
      </form>
    </main>
  );
};

export default AddProduct;
