import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const products = await prisma.product.findMany();

    if (products) {
      res
        .status(200)
        .json({ message: "Produtos retornados com sucesso.", products });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
}
