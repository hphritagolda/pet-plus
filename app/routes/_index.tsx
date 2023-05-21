import { ReactNode } from "react";
import petPlus from "@/assets/petplus.svg";
import andrewProfile from "@/assets/andrew.png";
import { Link, useLoaderData } from "@remix-run/react";
import { generatePath } from "@remix-run/router";
import { LoaderArgs, json, redirect } from "@remix-run/node";
import dbConnect from "@/mongoose.server";
import Users from "@/models/Users";
import { getUserId, validateUser } from "@/models/Auth";
import User from "@/models/Users";

function Title(props: { children: ReactNode }) {
  return (
    <h1 className="text-center text-emerald-600 font-bold text-3xl">
      {props.children}
    </h1>
  );
}

function Subtitle(props: { children: ReactNode }) {
  return (
    <h2 className="text-center text-amber-300 font-bold text-2xl py-2">
      {props.children}
    </h2>
  );
}

function Name(props: { children: ReactNode }) {
  return (
    <h3 className="text-center text-rose-400 font-bold text-xl py-1">
      {props.children}
    </h3>
  );
}

function NewPet(props: { children: ReactNode }) {
  return (
    <button className="text-center text-cyan-500 font-bold text-xl rounded-md bg-slate-300 py-4 w-20">
      {props.children}
    </button>
  );
}

export async function loader({ request }: LoaderArgs) {
  await dbConnect();
  const userId = await getUserId(request);
  if (!userId) {
    return redirect("/signin");
  }

  const user = await User.findById(userId);

  if (!user) {
    return redirect("/signin");
  }

  return json({ user: user.toJSON() });
}

export default function LoginRoute() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="px-8 mt-6">
      <div className="flex flex-col items-center gap-3 mb-4">
        <div className="flex flex-row items-center gap-16 mb-7">
          <img src={petPlus} alt="" width={50} height={50} />
          <Title>PetPlus</Title>
          <img
            src={andrewProfile}
            alt=""
            width={50}
            height={50}
            className="rounded-full w-10 h-10 object-cover"
          />
        </div>
        <Subtitle>Welcome, {user.firstName}!</Subtitle>
        <Link
          to="/pet/new"
          className="bg-cyan-400 items-center rounded-lg py-5 px-7 text-center text-cyan-50 font-bold text-4xl"
        >
          +
        </Link>
        <Name>Add New Pet!</Name>
        {/* <Link to={generatePath("/pet/:petId", { petId: "123" })}>
          Temp link to pet 123
        </Link> */}
      </div>
    </div>
  );
}
