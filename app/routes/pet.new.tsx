import {
  ExitLink,
  LightButton,
  ProfileButton,
  UploadButton,
} from "@/components/Buttons";
import type { ActionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import type { ReactNode } from "react";

function Subtitle(props: { children: ReactNode }) {
  return (
    <h2 className="py-2 text-center text-3xl font-bold text-amber-300">
      {props.children}
    </h2>
  );
}

export async function action({}: ActionArgs) {
  return {};
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
          />

          <input
            type="text"
            className="block w-full rounded-lg border-4 border-pink-500 bg-grey-500 px-4 py-2 text-pink-500 placeholder:text-pink-500"
            placeholder="Last Name"
          />

          <input
            type="text"
            className="block w-full rounded-lg border-4 border-pink-500 bg-grey-500 px-4 py-2 text-pink-500 placeholder:text-pink-500"
            placeholder="Pet Type"
          />
          <input
            type="text"
            className="block w-full rounded-lg border-4 border-pink-500 bg-grey-500 px-4 py-2 text-pink-500 placeholder:text-pink-500"
            placeholder="Gender"
          />

          <input
            type="text"
            className="block w-full rounded-lg border-4 border-pink-500 bg-grey-500 px-4 py-2 text-pink-500 placeholder:text-pink-500"
            placeholder="Breed"
          />

          <input
            type="text"
            className="block w-full rounded-lg border-4 border-pink-500 bg-grey-500 px-4 py-2 text-pink-500 placeholder:text-pink-500"
            placeholder="Age"
          />

          <input
            type="text"
            className="block w-full rounded-lg border-4 border-pink-500 bg-grey-500 px-4 py-2 text-pink-500 placeholder:text-pink-500"
            placeholder="Height"
          />

          <input
            type="text"
            className="block w-full rounded-lg border-4 border-pink-500 bg-grey-500 px-4 py-2 text-pink-500 placeholder:text-pink-500"
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
