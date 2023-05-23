import { DarkButtonLink, LightButton } from "@/components/Buttons";
import { getCurrentUser } from "@/models/Auth";
import User from "@/models/Users";
import { ActionArgs, LoaderArgs, json, redirect } from "@remix-run/node";
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
  const formData = await request.formData();

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");

  if (typeof firstName !== "string" || typeof lastName !== "string") {
    return json({ error: "Must submit details" });
  }

  await User.updateOne(
    { _id: user.id },
    {
      $set: {
        firstName,
        lastName,
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
        <div className="flex h-24 w-24 items-center rounded-full bg-cyan-100"></div>
        <Subtitle>Edit Profile</Subtitle>
        <Form
          method="post"
          className="flex w-full flex-col items-stretch gap-3 px-6"
        >
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
