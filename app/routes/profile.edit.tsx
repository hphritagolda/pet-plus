import {
  ExitLink,
  DeleteButton,
  EditProfileButton,
} from "@/components/Buttons";
import { getCurrentUser } from "@/models/Auth";
import { UserIcon } from "@heroicons/react/24/solid";
import { logoutSession } from "@/models/Auth";
import { LoaderArgs, redirect, json, ActionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { ReactNode } from "react";

function UserProfileIcon(props: { children: ReactNode }) {
  return (
    <UserIcon className="inline-flex h-28 w-28 items-center justify-center rounded-full bg-pink-500 p-2 text-blue-500" />
  );
}

function UserNameTitle(props: { children: ReactNode }) {
  return (
    <h4 className=" py-1 text-2xl font-bold text-yellow-200">
      {props.children}
    </h4>
  );
}

function UserEmailTitle(props: { children: ReactNode }) {
  return (
    <h5 className=" py-1 text-lg font-medium text-lightblue-300">
      {props.children}
    </h5>
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
export async function action({ request }: ActionArgs) {}

export default function UserProfile() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <div className="mt-20 px-8">
      <div className="fixed left-8 right-8 top-8 flex justify-between">
        <ExitLink to=".." />
      </div>
      <div className="flex items-center justify-center">
        <UserProfileIcon>User Profile</UserProfileIcon>
      </div>
      <div className="mt-4 gap-2 text-center">
        <UserNameTitle>
          {user.firstName} {user.lastName}
        </UserNameTitle>
        <UserEmailTitle>{user.email}</UserEmailTitle>
      </div>
      <div className="mt-10 flex flex-col items-center gap-2"></div>
    </div>
  );
}
