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

export async function loader({ request }: LoaderArgs) {
  const user = await getCurrentUser(request);

  if (!user) {
    return redirect("/signin");
  }

  if (user.accessLevel !== ADMIN_ACCESS_LEVEL) {
    return redirect("/");
  }

  const pets = await Pet.find();

  return json({ pets: pets.map((pet) => pet.toJSON()) });
}

function Search(props: { children: ReactNode }) {
  return (
    <h2 className="text-center text-2xl font-bold text-yellow-200">
      {props.children}
    </h2>
  );
}

function Subtitle(props: { children: ReactNode }) {
  return (
    <h3 className="py-1 text-center text-lg font-bold text-blue-500">
      {props.children}
    </h3>
  );
}

function PetSubtitle(props: { children: ReactNode }) {
  return (
    <h4 className="py-1 text-center text-base font-medium text-blue-500">
      {props.children}
    </h4>
  );
}

export default function AdminProfile() {
  const { pets } = useLoaderData<typeof loader>();

  return (
    <div className="mt-6 px-8">
      <div className="mb-4 flex flex-col items-center gap-3">
        <div className="mb-7 flex flex-row items-center gap-16">
          <PetplusLogo className="h-12 w-12 text-pink-500"></PetplusLogo>
          <Title>PetPlus</Title>
          <ProfileLink to="/menu"></ProfileLink>
        </div>
      </div>
      <div className="mb-4">
        <Search>Patient Database</Search>
      </div>

      <div className="mb-3 flex flex-row justify-between rounded-lg bg-pink-500 px-6">
        <Subtitle>Name</Subtitle>
        <Subtitle>Age</Subtitle>
        <Subtitle>Gender</Subtitle>
        <Subtitle>Breed</Subtitle>
      </div>

      {pets.map((pet) => {
        return (
          <Link
            key={pet._id}
            className="mb-2 flex flex-row justify-between gap-2 rounded-lg bg-pink-20 px-8"
            to={generatePath("/pet/:petId", { petId: pet._id })}
          >
            <PetSubtitle>{pet.firstName}</PetSubtitle>
            <PetSubtitle>{pet.age}</PetSubtitle>
            <PetSubtitle>{pet.gender}</PetSubtitle>
            <PetSubtitle>{pet.breed}</PetSubtitle>
          </Link>
        );
      })}
    </div>
  );
}
