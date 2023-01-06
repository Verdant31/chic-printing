import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";
import jwt from "jsonwebtoken";
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
      const token = jwt.sign(
        {
          user: rightCredentials,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
        },
        `${process.env.PRIVATE_KEY}`,
        {
          algorithm: "HS256",
        }
      );
      res
        .status(200)
        .json({ message: "Autenticação realizada com sucesso.", token });
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
