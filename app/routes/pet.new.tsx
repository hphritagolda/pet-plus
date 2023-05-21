import {
  ExitLink,
  LightButton,
  ProfileButton,
  UploadButton,
} from "@/components/Buttons";
import { validateUser } from "@/models/Auth";
import dbConnect from "@/mongoose.server";
import { ActionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { ReactNode } from "react";

function Subtitle(props: { children: ReactNode }) {
  return (
    <h2 className="text-center text-amber-300 font-bold text-3xl py-2">
      {props.children}
    </h2>
  );
}

export async function action({}: ActionArgs) {
  await dbConnect();
}

export default function NewPetPage() {
  return (
    <div className="px-8 mt-20">
      <div className="fixed top-8 left-8 right-8 flex justify-between">
        <ExitLink to="/" />
        <ProfileButton>User Profile</ProfileButton>
      </div>
      <div className="flex items-center justify-center h-64 ">
        <UploadButton>Upload Photo</UploadButton>
      </div>
      <div className="absolute inset-x-0 bottom-0 gap-4 bg-grey-500 rounded-lg py-5">
        <Subtitle>New Pet Details</Subtitle>
        <Form method="post" className="grid grid-cols-2 gap-2 px-4 mt-12">
          <input
            type="text"
            className="rounded-lg bg-grey-500 border-pink-500 border-4 py-2 px-4 text-pink-500 block w-full placeholder:text-pink-500"
            placeholder="First Name"
          />

          <input
            type="text"
            className="rounded-lg bg-grey-500 border-pink-500 border-4 py-2 px-4 text-pink-500 block w-full placeholder:text-pink-500"
            placeholder="Last Name"
          />

          <input
            type="text"
            className="rounded-lg bg-grey-500 border-pink-500 border-4 py-2 px-4 text-pink-500 block w-full placeholder:text-pink-500"
            placeholder="Pet Type"
          />
          <input
            type="text"
            className="rounded-lg bg-grey-500 border-pink-500 border-4 py-2 px-4 text-pink-500 block w-full placeholder:text-pink-500"
            placeholder="Gender"
          />

          <input
            type="text"
            className="rounded-lg bg-grey-500 border-pink-500 border-4 py-2 px-4 text-pink-500 block w-full placeholder:text-pink-500"
            placeholder="Breed"
          />

          <input
            type="text"
            className="rounded-lg bg-grey-500 border-pink-500 border-4 py-2 px-4 text-pink-500 block w-full placeholder:text-pink-500"
            placeholder="Age"
          />

          <input
            type="text"
            className="rounded-lg bg-grey-500 border-pink-500 border-4 py-2 px-4 text-pink-500 block w-full placeholder:text-pink-500"
            placeholder="Height"
          />

          <input
            type="text"
            className="rounded-lg bg-grey-500 border-pink-500 border-4 py-2 px-4 text-pink-500 block w-full placeholder:text-pink-500"
            placeholder="Weight"
          />
        </Form>

        <div className="mt-8 flex items-center justify-center">
          <LightButton>Add New Pet</LightButton>
        </div>
      </div>
    </div>
  );
}
