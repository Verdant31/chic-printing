import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { productId } = req.query;

  try {
    if (productId) {
      const removedProduct = await prisma.product.delete({
        where: { id: productId as string },
      });
      if (removedProduct) {
        res.status(200).json({ message: "Produto removido com sucesso." });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
