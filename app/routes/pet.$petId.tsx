import poppyProfile from "@/assets/poppy.jpg";
import { ExitLink, ProfileLink } from "@/components/Buttons";
import {
  PetDescription,
  PetNameTitle,
  PetSubtitle,
} from "@/components/Typography";
import { getCurrentUser } from "@/models/Auth";
import Pet from "@/models/Pets";
import dbConnect from "@/mongoose.server";
import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";

export async function loader({ params, request }: LoaderArgs) {
  const user = await getCurrentUser(request);

  if (!user) {
    return redirect("/signin");
  }

  const petId = params.petId;
  if (typeof petId !== "string") {
    return redirect("/");
  }

  await dbConnect();

  const pet = await Pet.findById(petId);
  if (!pet) {
    return redirect("/");
  }

  if (pet.user.toString() !== user.id) {
    redirect("/");
  }

  return json({ pet: pet.toJSON(), user: user.toJSON() });
}

export default function PetPage() {
  const { pet, user } = useLoaderData<typeof loader>();
  return (
    <div className="">
      <div className="fixed inset-x-8 top-8 z-10 flex justify-between md:right-[30rem]">
        <ExitLink to="/" />
        <ProfileLink to="/menu" imageBase64={user.imageBase64}></ProfileLink>
      </div>
      <div className="fixed inset-0 flex flex-col flex-nowrap md:flex-row">
        <div className="relative -mb-4 h-64 md:-mr-4 md:mb-0 md:h-full md:flex-1">
          <img
            src={poppyProfile}
            alt={pet.firstName}
            width={500}
            height={500}
            className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-x-0 bottom-6 text-center">
            <PetNameTitle>
              {pet.firstName} {pet.lastName}
            </PetNameTitle>
            <PetSubtitle>{pet.breed}</PetSubtitle>
            <PetDescription>
              {pet.gender} | {pet.age} y.o | {pet.height}cm | {pet.weight}kg
            </PetDescription>
          </div>
        </div>
        <div className="flex min-h-0 flex-1 flex-col flex-nowrap rounded-t-xl bg-grey-500 px-4 py-5 shadow-2xl shadow-black md:max-w-md md:flex-auto md:rounded-l-xl md:rounded-tr-none">
          <div className="mb-4 flex flex-row justify-between rounded-full bg-blue-500">
            <NavLink
              to="."
              className="-mr-2 rounded-full px-6 py-3 text-pink-500 [&.active]:bg-pink-500 [&.active]:text-blue-500"
              end
            >
              Overview
            </NavLink>
            <NavLink
              to="vaccinations"
              className="-mx-2 rounded-full px-6 py-3 text-pink-500 [&.active]:bg-pink-500 [&.active]:text-blue-500"
            >
              Vaccinations
            </NavLink>
            <NavLink
              to="records"
              className="-ml-2 rounded-full px-6 py-3 text-pink-500 [&.active]:bg-pink-500 [&.active]:text-blue-500"
            >
              Records
            </NavLink>
          </div>

          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
