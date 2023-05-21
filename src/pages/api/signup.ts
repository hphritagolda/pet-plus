import User from "@/models/Users";
import dbConnect from "@/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

async function PostHandler(req: NextApiRequest, res: NextApiResponse) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (typeof password !== "string" || password !== confirmPassword) {
    return res.status(500).send("Passwords don't match");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    accessLevel: 0,
    password,
  });

  res.redirect(301, "/");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "POST") {
    return PostHandler(req, res);
  }
  return res.status(404);
}
