import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useForm } from "react-hook-form";

type Product = {
  id: number;
  name: string;
  price: number;
};

export interface EditProductFormData {
  newName: string;
  newPrice: number;
}

export interface EditProductDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  product: Product;
  handleEditProduct: (data: EditProductFormData) => void;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({
  isOpen,
  handleClose,
  product,
  handleEditProduct,
}) => {
  const { register, watch, handleSubmit } = useForm<EditProductFormData>({
    defaultValues: {
      newName: product.name,
      newPrice: product.price,
    },
  });
  const price = watch("newPrice");

  return (
    <Dialog open={isOpen} className="ml-[256px] " onClose={handleClose}>
      <DialogTitle>
        <p
          className="pt-4 text-center text-2xl font-bold tracking-widest text-zinc-700"
          style={{ wordSpacing: 12 }}
        >
          EDITAR PRODUTO
        </p>
      </DialogTitle>
      <form
        onSubmit={handleSubmit(handleEditProduct)}
        className=" h-[200px] w-[500px]"
      >
        <div className="mt-4 flex flex-col items-center gap-4">
          <input
            {...register("newName", { required: true })}
            className="h-9 min-w-[300px] rounded-sm bg-zinc-200 p-4 px-4 focus:outline-none"
            placeholder="Nome"
          />
          <div className="relative">
            <input
              {...register("newPrice", { required: true, min: 1 })}
              className={`h-9 min-w-[300px] rounded-sm bg-zinc-200 p-2  focus:outline-none ${
                price ? "px-[40px]" : "px-4"
              }`}
              placeholder="Preço"
            />
            {price && (
              <span className="absolute top-[5.5px] left-[18px]">R$</span>
            )}
          </div>
          <button className="mt-4 h-10 w-96 bg-zinc-800  text-white">
            Confirmar
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default EditProductDialog;
