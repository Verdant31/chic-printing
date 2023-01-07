import { MagnifyingGlass, Pencil, Trash } from "phosphor-react";
import React from "react";
import EditProductDialog from "../../ConfirmDialog";
import { useListProducts } from "./ListProducts.hook";

const ListProducts: React.FC = () => {
  const {
    products,
    handleDeleteProduct,
    handleEditProduct,
    isEditingProduct,
    selectedProduct,
    handleCloseEditProductModal,
    handleConfirmEditProduct,
    setFilterName,
    filterName,
  } = useListProducts();

  const filteredProducts =
    filterName.length > 0
      ? products.filter((product) => {
          return product.name.toLowerCase().includes(filterName.toLowerCase());
        })
      : [];

  return (
    <main className="mx-auto my-12 flex max-w-7xl flex-col items-center">
      <p
        className="text-4xl font-semibold tracking-widest text-zinc-700"
        style={{ wordSpacing: 12 }}
      >
        MEUS PRODUTOS
      </p>
      <div className="relative">
        <input
          onChange={(e) => setFilterName(e.target.value)}
          className="mt-10 h-8 w-[500px] rounded-md p-6 px-[48px] focus:outline-none"
          placeholder="Pesquise por um produto..."
        />
        <MagnifyingGlass
          className="absolute top-[52px] left-[14px]"
          size={24}
          color="#9ba3af"
          weight="bold"
        />
      </div>
      <div className="mt-12 flex h-[500px] w-[800px] flex-col gap-8 overflow-y-scroll ">
        {filteredProducts.length > 0
          ? filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex w-[100%] justify-between gap-12 rounded-md bg-white p-[14px]"
              >
                <div className="flex  gap-12">
                  <p className="min-w-36">{product.name}</p>
                  <div className="h-[100%] w-[1px] bg-zinc-500" />
                  <p>R$ {product.price}</p>
                </div>
                <div className="flex gap-4">
                  <Trash
                    onClick={() => handleDeleteProduct(product)}
                    size={24}
                    weight="regular"
                    color="black"
                    className="cursor-pointer"
                  />
                  <Pencil
                    onClick={() => handleEditProduct(product)}
                    size={24}
                    color="#626262"
                    weight="regular"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            ))
          : products.map((product) => (
              <div
                key={product.id}
                className="flex w-[100%] justify-between gap-12 rounded-md bg-white p-[14px]"
              >
                <div className="flex  gap-12">
                  <p className="min-w-36">{product.name}</p>
                  <div className="h-[100%] w-[1px] bg-zinc-500" />
                  <p>R$ {product.price}</p>
                </div>
                <div className="flex gap-4">
                  <Trash
                    onClick={() => handleDeleteProduct(product)}
                    size={24}
                    weight="regular"
                    color="black"
                    className="cursor-pointer"
                  />
                  <Pencil
                    onClick={() => handleEditProduct(product)}
                    size={24}
                    color="#626262"
                    weight="regular"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            ))}
      </div>
      {selectedProduct && (
        <EditProductDialog
          handleEditProduct={handleConfirmEditProduct}
          product={selectedProduct}
          isOpen={isEditingProduct}
          handleClose={handleCloseEditProductModal}
        />
      )}
    </main>
  );
};

export default ListProducts;
