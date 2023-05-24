import { DarkButtonLink, LightButton } from "@/components/Buttons";
import { PetplusLogo } from "@/components/PetplusLogo";
import {
  ADMIN_ACCESS_LEVEL,
  commitSession,
  getSession,
  validateUser,
} from "@/models/Auth";
import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { ReactNode } from "react";

function Title(props: { children: ReactNode }) {
  return (
    <h1 className="text-center text-5xl font-bold text-pink-500">
      {props.children}
    </h1>
  );
}

function Subtitle(props: { children: ReactNode }) {
  return (
    <h2 className="py-2 text-center text-3xl font-bold text-yellow-200">
      {props.children}
    </h2>
  );
}

// Cookies
export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/");
  }

  return json(
    { error: session.get("error") },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}

// User Sign In: Email and Password Essential
export async function action({ request }: LoaderArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return json({ error: "Must submit email and password" });
  }

  const { session, isValid, user } = await validateUser(
    request,
    email,
    password
  );

  if (!isValid || !user) {
    return redirect("/signin", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  if (user.accessLevel === ADMIN_ACCESS_LEVEL) {
    return redirect("/admin", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function LoginRoute() {
  const { error } = useLoaderData<typeof loader>();

  return (
    <div className="mt-32 px-8">
      <div className="mb-4 flex flex-col items-center gap-3">
        <PetplusLogo className="h-28 w-28 text-pink-500" />
        <Title>PetPlus</Title>
      </div>
      <div className="mx-auto flex max-w-sm flex-col items-center gap-4 rounded-lg bg-grey-500 py-5">
        <Subtitle>Log In</Subtitle>
        <Form method="post" className="flex w-full flex-col gap-4 px-4">
          <input
            type="email"
            className="block w-full rounded-lg border-4 border-pink-500 bg-grey-500 px-4 py-2 text-pink-500 placeholder:text-pink-500"
            placeholder="E-mail"
            name="email"
          />

          <input
            type="password"
            className="block w-full rounded-lg border-4 border-pink-500 bg-grey-500 px-4 py-2 text-pink-500 placeholder:text-pink-500"
            placeholder="Password"
            name="password"
          />
          {!!error && <div>{error}</div>}

          <LightButton type="submit">Login</LightButton>
        </Form>
        <DarkButtonLink to="/signup">Create new account</DarkButtonLink>
      </div>
    </div>
  );
}
