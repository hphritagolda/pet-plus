import {
  ExitLink,
  LightButton,
  ProfileButton,
  UploadButton,
} from "@/components/Buttons";
import { getCurrentUser, getSession } from "@/models/Auth";
import Pet from "@/models/Pets";
import User from "@/models/Users";
import dbConnect from "@/mongoose.server";
import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { generatePath } from "@remix-run/router";
import type { ReactNode } from "react";

function Subtitle(props: { children: ReactNode }) {
  return (
    <h2 className="py-2 text-center text-3xl font-bold text-amber-300">
      {props.children}
    </h2>
  );
}

export async function action({ request }: ActionArgs) {
  const user = await getCurrentUser(request);

  if (!user) {
    return redirect("/signin");
  }

  const formData = await request.formData();

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const petType = formData.get("petType");
  const gender = formData.get("gender");
  const breed = formData.get("breed");
  const age = Number(formData.get("age"));
  const height = Number(formData.get("height"));
  const weight = Number(formData.get("weight"));

  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof petType !== "string" ||
    typeof gender !== "string" ||
    typeof breed !== "string" ||
    typeof age !== "number" ||
    typeof height !== "number" ||
    typeof weight !== "number"
  ) {
    return json({ error: "Must fill in details" });
  }

  const newPet = new Pet({
    firstName: firstName,
    lastName: lastName,
    petType: petType,
    gender: gender,
    breed: breed,
    age: age,
    height: height,
    weight: weight,
    user,
  });

  const pet = await newPet.save();

  return redirect(generatePath("/pet/:petId", { petId: pet.id }));
}

export default function NewPetPage() {
  return (
    <div className="mt-20 px-8">
      <div className="fixed left-8 right-8 top-8 flex justify-between">
        <ExitLink to="/" />
        <ProfileButton>User Profile</ProfileButton>
      </div>
      <div className="flex h-64 items-center justify-center ">
        <UploadButton>Upload Photo</UploadButton>
      </div>
      <div className="absolute inset-x-0 bottom-0 gap-4 rounded-lg bg-grey-500 py-5">
        <Subtitle>New Pet Details</Subtitle>
        <Form method="post" className="mt-12 grid grid-cols-2 gap-2 px-4">
          <input
            type="text"
            className="block w-full rounded-lg border-4 border-pink-500 bg-grey-500 px-4 py-2 text-pink-500 placeholder:text-pink-500"
            placeholder="First Name"
            name="firstName"
            required
          />

          <input
            type="text"
            className="block w-full rounded-lg border-4 border-pink-500 bg-grey-500 px-4 py-2 text-pink-500 placeholder:text-pink-500"
            placeholder="Last Name"
            name="lastName"
            required
          />

          <input
            type="text"
            className="block w-full rounded-lg border-4 border-pink-500 bg-grey-500 px-4 py-2 text-pink-500 placeholder:text-pink-500"
            placeholder="Pet Type"
            name="petType"
            required
          />
          <input
            type="text"
            className="block w-full rounded-lg border-4 border-pink-500 bg-grey-500 px-4 py-2 text-pink-500 placeholder:text-pink-500"
            placeholder="Gender"
            name="gender"
            required
          />

          <input
            type="text"
            className="block w-full rounded-lg border-4 border-pink-500 bg-grey-500 px-4 py-2 text-pink-500 placeholder:text-pink-500"
            placeholder="Breed"
            name="breed"
            required
          />

          <input
            type="text"
            className="block w-full rounded-lg border-4 border-pink-500 bg-grey-500 px-4 py-2 text-pink-500 placeholder:text-pink-500"
            placeholder="Age"
            name="age"
            required
          />

          <input
            type="text"
            className="block w-full rounded-lg border-4 border-pink-500 bg-grey-500 px-4 py-2 text-pink-500 placeholder:text-pink-500"
            placeholder="Height"
            name="height"
            required
          />

          <input
            type="text"
            className="block w-full rounded-lg border-4 border-pink-500 bg-grey-500 px-4 py-2 text-pink-500 placeholder:text-pink-500"
            placeholder="Weight"
            name="weight"
            required
          />
          <div className="mt-8 flex items-center justify-center">
            <LightButton type="submit">Add New Pet</LightButton>
          </div>
        </Form>
      </div>
    </div>
  );
}
