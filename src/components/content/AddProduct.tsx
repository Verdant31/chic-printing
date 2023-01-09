import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "../../services/api";

interface NewProductFormData {
  name: string;
  price: string;
}

const AddProduct: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<NewProductFormData>({
    defaultValues: {
      name: "",
      price: "",
    },
  });

  const handleAddProdct = async (data: NewProductFormData) => {
    await api
      .post("/products/addProduct", {
        name: data.name,
        price: data.price,
      })
      .then((res) => {
        toast.success(res.data.message);
        clearErrors();
        reset();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao adicionar produto!");
      });
  };

  return (
    <main className="mx-auto my-12 flex max-w-7xl flex-col items-center">
      <p
        className="text-4xl font-semibold tracking-widest text-zinc-700"
        style={{ wordSpacing: 12 }}
      >
        ADICIONAR PRODUTO
      </p>
      <form
        onSubmit={handleSubmit(handleAddProdct)}
        className="mt-10 flex min-h-[200px] min-w-[800px] flex-col rounded-md bg-zinc-800 p-12"
      >
        <div className="flex justify-between ">
          <div className="flex flex-col">
            <input
              {...register("name", { required: true, maxLength: 15 })}
              maxLength={15}
              className="h-9 min-w-[300px] rounded-sm p-4 px-4 focus:outline-none"
              placeholder="Nome"
            />
            {errors.name && (
              <span className="mt-4 text-[#FF3333]">
                Entre com o nome do produto
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <input
              {...register("price", { required: true, min: 1 })}
              className="h-9 min-w-[300px] rounded-sm p-2  px-4 focus:outline-none"
              maxLength={14}
              placeholder="Preço"
            />
            {errors.price && (
              <span className="mt-4 text-[#FF3333]">
                Entre com o preço do produto
              </span>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="mt-10 h-10 w-[100%] self-center rounded-md bg-white text-center text-zinc-600"
        >
          Confirmar
        </button>
      </form>
    </main>
  );
};

export default AddProduct;
