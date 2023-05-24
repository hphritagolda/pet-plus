import { DeleteButton, ExitLink, LightButtonLink } from "@/components/Buttons";
import { UserProfileImage } from "@/components/UserProfileImage";
import { getCurrentUser, logoutSession } from "@/models/Auth";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { ReactNode } from "react";

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

// User Sign Out
export async function action({ request }: ActionArgs) {
  const session = await logoutSession(request);

  return redirect("/signin", { headers: { "Set-Cookie": session } });
}

export default function UserProfile() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <div className="mt-20 px-8">
      <div className="fixed left-8 right-8 top-8 flex justify-between">
        <ExitLink to=".." />
      </div>
      <div className="flex items-center justify-center">
        <UserProfileImage imageBase64={user.imageBase64} alt={user.firstName} />
      </div>
      <div className="mt-4 gap-2 text-center">
        <UserNameTitle>
          {user.firstName} {user.lastName}
        </UserNameTitle>
        <UserEmailTitle>{user.email}</UserEmailTitle>
      </div>
      <div className="mx-auto mt-10 flex w-40 flex-col items-center gap-2">
        <LightButtonLink to="/profile/edit">Edit Profile</LightButtonLink>
        <Form method="post">
          <DeleteButton type="submit">Sign Out</DeleteButton>
        </Form>
      </div>
    </div>
  );
}
