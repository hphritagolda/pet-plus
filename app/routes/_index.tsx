import poppyProfile from "@/assets/poppy.jpg";
import { ProfileLink } from "@/components/Buttons";
import { PetplusLogo } from "@/components/PetplusLogo";
import { Title } from "@/components/Typography";
import { ADMIN_ACCESS_LEVEL, getCurrentUser } from "@/models/Auth";
import Pet from "@/models/Pets";
import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { generatePath } from "@remix-run/router";
import type { ReactNode } from "react";

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

export async function loader({ request }: LoaderArgs) {
  const user = await getCurrentUser(request);

  if (!user) {
    return redirect("/signin");
  }

  if (user.accessLevel === ADMIN_ACCESS_LEVEL) {
    return redirect("/admin");
  }

  const pets = await Pet.find({ user });

  return json({ user: user.toJSON(), pets: pets.map((pet) => pet.toJSON()) });
}

export default function LoginRoute() {
  const { user, pets } = useLoaderData<typeof loader>();

  return (
    <div className="mt-6 px-8">
      <div className="mb-4 flex flex-col items-center gap-3">
        <div className="mb-7 flex flex-row items-center gap-16">
          <PetplusLogo className="h-12 w-12 text-pink-500"></PetplusLogo>
          <Title>PetPlus</Title>
          <ProfileLink to="/menu"></ProfileLink>
        </div>
        <Subtitle>Welcome, {user.firstName}!</Subtitle>
        <div className="mx-auto grid w-full max-w-lg grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] justify-items-center gap-3 text-center">
          {pets.map((pet) => {
            return (
              <Link
                key={pet._id}
                to={generatePath("/pet/:petId", { petId: pet._id })}
                className="py-1 text-center text-lg font-bold text-pink-500"
              >
                <img
                  src={poppyProfile}
                  alt=""
                  width={100}
                  height={100}
                  className="mx-auto h-24 w-24 items-center rounded-lg object-cover"
                />
                <span>
                  {pet.firstName} {pet.lastName}
                </span>
              </Link>
            );
          })}

          <Link to="/pet/new" className="">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-lg bg-grey-500 text-4xl font-bold text-blue-500">
              +
            </div>
            <Name>Add New Pet!</Name>
          </Link>
        </div>
      </div>
    </div>
  );
}
