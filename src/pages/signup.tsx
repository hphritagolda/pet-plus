import { ReactNode } from "react";
import Image from "next/image";
import petPlus from "@/assets/petplus.svg";
import { DarkButton, LightButton } from "@/components/Buttons";
import { FormEvent } from "react";

function Title(props: { children: ReactNode }) {
  return (
    <h1 className="text-center text-emerald-600 font-bold text-5xl">
      {props.children}
    </h1>
  );
}

function Subtitle(props: { children: ReactNode }) {
  return (
    <h2 className="text-center text-amber-300 font-bold text-3xl py-2">
      {props.children}
    </h2>
  );
}

export default function LoginRoute() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    fetch("/api/signup", {
      method: "post",
      body: formData,
    });
  };

  return (
    <div className="px-8 mt-20">
      <div className="flex flex-col items-center gap-3 mb-4">
        <Image src={petPlus} alt="" width={100} height={100} />
        <Title>PetPlus</Title>
      </div>
      <div className="flex flex-col items-center gap-4 bg-grey-500 rounded-lg py-5 max-w-lg mx-auto">
        <div className="flex items-center w-24 h-24 bg-cyan-100 rounded-full"></div>

        <Subtitle>New Account</Subtitle>

        <form
          method="post"
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 px-3"
        >
          <div className="flex flex-row gap-3">
            <input
              type="text"
              className="rounded-lg bg-grey-500 border-pink-500 border-4 py-2 px-4 text-pink-500 block w-full placeholder:text-pink-500"
              placeholder="First Name"
              name="firstname"
              required
            />

            <input
              type="text"
              className="rounded-lg bg-grey-500 border-pink-500 border-4 py-2 px-4 text-pink-500 block w-full placeholder:text-pink-500"
              placeholder="Last Name"
              name="lastname"
              required
            />
          </div>

          <input
            type="email"
            className="rounded-lg bg-grey-500 border-pink-500 border-4 py-2 px-4 text-pink-500 block w-full placeholder:text-pink-500"
            placeholder="E-mail"
            required
          />

          <input
            type="password"
            className="rounded-lg bg-grey-500 border-pink-500 border-4 py-2 px-4 text-pink-500 block w-full placeholder:text-pink-500"
            placeholder="Password"
            required
          />

          <input
            type="password"
            className="rounded-lg bg-grey-500 border-pink-500 border-4 py-2 px-4 text-pink-500 block w-full placeholder:text-pink-500"
            placeholder="Confirm Password"
            required
          />

          <div className="mt-6 mb-4 mx-auto">
            <LightButton type="submit">Create Account</LightButton>
          </div>
        </form>
      </div>
    </div>
  );
}
