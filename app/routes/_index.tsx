import { ProfileButton } from "@/components/Buttons";
import { PetplusLogo } from "@/components/PetplusLogo";
import { getUserId } from "@/models/Auth";
import User from "@/models/Users";
import dbConnect from "@/mongoose.server";
import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { ReactNode } from "react";

function Title(props: { children: ReactNode }) {
  return (
    <h1 className="text-center text-3xl font-bold text-pink-500">
      {props.children}
    </h1>
  );
}

function Subtitle(props: { children: ReactNode }) {
  return (
    <h2 className="py-2 text-center text-2xl font-bold text-yellow-200">
      {props.children}
    </h2>
  );
}

function Name(props: { children: ReactNode }) {
  return (
    <h3 className="py-1 text-center text-xl font-bold text-pink-500">
      {props.children}
    </h3>
  );
}

function NewPet(props: { children: ReactNode }) {
  return (
    <button className="w-20 rounded-md bg-slate-300 py-4 text-center text-xl font-bold text-cyan-500">
      {props.children}
    </button>
  );
}

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);

  if (!userId) {
    return redirect("/signin");
  }

  await dbConnect();

  const user = await User.findById(userId);

  if (!user) {
    return redirect("/signin");
  }

  return json({ user: user.toJSON() });
}

export default function LoginRoute() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="mt-6 px-8">
      <div className="mb-4 flex flex-col items-center gap-3">
        <div className="mb-7 flex flex-row items-center gap-16">
          <PetplusLogo className="h-12 w-12 text-pink-500"></PetplusLogo>
          <Title>PetPlus</Title>
          <ProfileButton>User Profile</ProfileButton>
        </div>
        <Subtitle>Welcome, {user.firstName}!</Subtitle>
        <Link
          to="/pet/new"
          className="items-center rounded-lg bg-grey-500 px-7 py-5 text-center text-4xl font-bold text-blue-500"
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
