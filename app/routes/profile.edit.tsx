import { DarkButtonLink, LightButton, UploadInput } from "@/components/Buttons";
import { UserProfileImage } from "@/components/UserProfileImage";
import { getImageBase64 } from "@/image";
import { getCurrentUser } from "@/models/Auth";
import User from "@/models/Users";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import {
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  json,
  unstable_parseMultipartFormData as parseMultipartFormData,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { ReactNode } from "react";

function Subtitle(props: { children: ReactNode }) {
  return (
    <h2 className="py-2 text-center text-3xl font-bold text-yellow-200">
      {props.children}
    </h2>
  );
}

export async function loader({ request }: LoaderArgs) {
  const user = await getCurrentUser(request);

  if (!user) {
    return redirect("/signin");
  }

  return json({ user: user.toJSON() });
}

// Profile Edit
export async function action({ request }: ActionArgs) {
  const user = await getCurrentUser(request);

  if (!user) {
    return redirect("/signin");
  }

  const uploadHandler = createMemoryUploadHandler({
    maxPartSize: 2_000_000,
  });
  const formData = await parseMultipartFormData(request, uploadHandler);

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const profilePhoto = formData.get("profilePhoto");

  if (typeof firstName !== "string" || typeof lastName !== "string") {
    return json({ error: "Must submit details" });
  }

  const imageBase64 = await getImageBase64(profilePhoto);

  await User.updateOne(
    { _id: user.id },
    {
      $set: {
        firstName,
        lastName,
        imageBase64: imageBase64 || user.imageBase64,
      },
    }
  ).exec();

  return redirect("/menu");
}

export default function UserProfile() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <div className="mt-20 px-8">
      <div className="mx-auto flex max-w-sm flex-col items-center gap-4 rounded-lg bg-grey-500 py-5">
        <UserProfileImage imageBase64={user.imageBase64} alt={user.firstName} />
        <Subtitle>Edit Profile</Subtitle>
        <Form
          method="post"
          encType="multipart/form-data"
          className="flex w-full flex-col items-stretch gap-3 px-6"
        >
          <div className="mx-auto">
            <UploadInput />
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border-4 border-pink-500 bg-grey-500 px-4 py-2 text-pink-500 placeholder:text-pink-500"
            placeholder="First Name"
            name="firstName"
            defaultValue={user.firstName}
            required
          />

          <input
            type="text"
            className="block w-full rounded-lg border-4 border-pink-500 bg-grey-500 px-4 py-2 text-pink-500 placeholder:text-pink-500"
            placeholder="Last Name"
            name="lastName"
            defaultValue={user.lastName}
            required
          />
          <div className="mx-auto mt-4 flex w-40 flex-col items-center gap-2">
            <LightButton type="submit">Save</LightButton>
            <DarkButtonLink to="/menu">Cancel</DarkButtonLink>
          </div>
        </Form>
      </div>
    </div>
  );
}
