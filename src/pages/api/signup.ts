import type { NextApiRequest, NextApiResponse } from "next";

function PostHandler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);

  return res.status(200).json({ message: "Hello from Next.js!" });
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return PostHandler(req, res);
  }
  return res.status(404);
}
