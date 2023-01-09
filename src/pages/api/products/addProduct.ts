import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, price } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        price: price.replace(",", "."),
      },
    });
    if (newProduct) {
      res.status(200).json({ message: "Produto adicionado com sucesso." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
}
