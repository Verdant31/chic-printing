import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, price, id } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      data: {
        name,
        price: price.replace(",", "."),
      },
      where: {
        id,
      },
    });
    if (updatedProduct) {
      res.status(200).json({ message: "Produto editado com sucesso." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
}
