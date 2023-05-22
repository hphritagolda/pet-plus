import petPlus from "@/assets/petplus.svg";
import { LightButton } from "@/components/Buttons";
import { commitSession, validateUser } from "@/models/Auth";
import User from "@/models/Users";
import { ActionArgs, json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import type { ReactNode } from "react";

function Title(props: { children: ReactNode }) {
  return (
    <h1 className="text-center text-5xl font-bold text-emerald-600">
      {props.children}
    </h1>
  );
}

function Subtitle(props: { children: ReactNode }) {
  return (
    <h2 className="py-2 text-center text-3xl font-bold text-amber-300">
      {props.children}
    </h2>
  );
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof password !== "string"
  ) {
    return json({ error: "Must submit details" });
  }

  if (password !== confirmPassword) {
    return json({ error: "Password must match" });
  }

  const newUser = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    accessLevel: 0,
    password: password,
  });
  await newUser.save();

  const { session, isValid } = await validateUser(request, email, password);

  if (!isValid) {
    return redirect("/signup", {
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
  return (
    <div className="mt-20 px-8">
      <div className="mb-4 flex flex-col items-center gap-3">
        <img src={petPlus} alt="pet plus" width={100} height={100} />
        <Title>PetPlus</Title>
      </div>
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-lg bg-grey-500 py-5">
        <div className="flex h-24 w-24 items-center rounded-full bg-cyan-100"></div>

        <Subtitle>New Account</Subtitle>

        <Form method="post" className="flex flex-col gap-3 px-3">
          <div className="flex flex-row gap-3">
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
          </div>

          <input
            type="email"
            className="block w-full rounded-lg border-4 border-pink-500 bg-grey-500 px-4 py-2 text-pink-500 placeholder:text-pink-500"
            placeholder="E-mail"
            name="email"
            required
          />

          <input
            type="password"
            className="block w-full rounded-lg border-4 border-pink-500 bg-grey-500 px-4 py-2 text-pink-500 placeholder:text-pink-500"
            placeholder="Password"
            name="password"
            required
          />

          <input
            type="password"
            className="block w-full rounded-lg border-4 border-pink-500 bg-grey-500 px-4 py-2 text-pink-500 placeholder:text-pink-500"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
          />

          <div className="mx-auto mb-4 mt-6">
            <LightButton type="submit">Create Account</LightButton>
          </div>
        </Form>
      </div>
    </div>
  );
}
