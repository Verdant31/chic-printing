import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body;
  try {
    const rightCredentials = await prisma.user.findFirst({
      where: {
        username,
        password,
      },
    });
    if (rightCredentials) {
      res.status(200).json({ message: "Autenticação realizada com sucesso." });
    } else {
      res.status(401).json({ message: "Credenciais inválidas." });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Houve um erro ao tentar realizar seu login." });
  }
}
