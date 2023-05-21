import * as build from "@remix-run/dev/server-build";
import { installGlobals } from "@remix-run/node";
import { createRequestHandler } from "@remix-run/vercel";
import dbConnect from "app/mongoose.server";

installGlobals();

export default createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: async () => {
    await dbConnect();
    return {};
  },
});
