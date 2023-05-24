import {
  DarkButtonLink,
  LightButton,
  UploadButton,
} from "@/components/Buttons";
import { PetplusLogo } from "@/components/PetplusLogo";
import { commitSession, validateUser } from "@/models/Auth";
import User from "@/models/Users";
import type { ActionArgs } from "@remix-run/node";
import {
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  json,
  unstable_parseMultipartFormData as parseMultipartFormData,
  redirect,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import type { ReactNode } from "react";
import sharp from "sharp";

function Title(props: { children: ReactNode }) {
  return (
    <h1 className="text-center text-5xl font-bold text-pink-500">
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
  const uploadHandler = createMemoryUploadHandler({
    maxPartSize: 500_000,
  });
  const formData = await parseMultipartFormData(request, uploadHandler);

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const profilePhoto = formData.get("profilePhoto");

  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof password !== "string" ||
    !(profilePhoto instanceof File)
  ) {
    return json({ error: "Must submit details" });
  }

  if (password !== confirmPassword) {
    return json({ error: "Password must match" });
  }

  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
  if (!validImageTypes.includes(profilePhoto.type)) {
    return json({ error: "Profile image must be jpeg, png, or gif" });
  }

  const resizedImageBuf = await sharp(await profilePhoto.arrayBuffer())
    .resize(64, 64)
    .toBuffer();

  // const text = await profilePhoto.text();

  return json({
    data: resizedImageBuf.toString("base64"),
  });

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
  const data = useActionData<typeof action>();

  console.log(data);
  return (
    <div className="my-8 px-8">
      <div className="mb-4 flex flex-col items-center gap-3">
        <PetplusLogo className="h-28 w-28 text-pink-500" />
        <Title>PetPlus</Title>
      </div>
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-lg bg-grey-500 py-5">
        <div className="flex items-center"></div>
        <div className="mb-2 mt-2 gap-4">
          <UploadButton>Upload Photo</UploadButton>
        </div>
        <Subtitle>New Account</Subtitle>
        <Form
          method="post"
          encType="multipart/form-data"
          className="flex flex-col gap-3 px-3 "
        >
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

          <input type="file" name="profilePhoto" itemType="image/*"></input>

          <div className="mx-auto mb-4 mt-6 flex flex-col gap-2">
            <LightButton type="submit">Create Account</LightButton>
            <DarkButtonLink to="/signin">Sign In</DarkButtonLink>
          </div>
        </Form>
      </div>
    </div>
  );
}
