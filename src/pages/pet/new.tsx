import { ReactNode } from "react";
import Image from "next/image";
import petPlus from "@/assets/petplus.svg";
import andrewProfile from "@/assets/andrew.png";
import { DarkButton, LightButton } from "@/components/Buttons";

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

export default function NewPetPage() {
  return (
    <div className="px-8 mt-20">
      <div className="flex flex-col items-center gap-3 mb-4">
        <div className="flex flex-row items-center gap-16 mb-7">
          <Image src={petPlus} alt="" width={50} height={50} />
          <Title>PetPlus</Title>
          <Image
            src={andrewProfile}
            alt=""
            width={50}
            height={50}
            className="rounded-full w-10 h-10 object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 bg-grey-500 rounded-lg py-5">
        <Subtitle>New Account</Subtitle>
        <div className="flex col">
          <form className="w-full px-4">
            <input
              type="text"
              className="rounded-lg bg-grey-500 border-pink-500 border-4 py-2 px-4 text-pink-500 block w-full placeholder:text-pink-500"
              placeholder="First Name"
            />
          </form>
          <form className="w-full px-4">
            <input
              type="text"
              className="rounded-lg bg-grey-500 border-pink-500 border-4 py-2 px-4 text-pink-500 block w-full placeholder:text-pink-500"
              placeholder="Last Name"
            />
          </form>
        </div>
        <form className="w-full px-4">
          <input
            type="text"
            className="rounded-lg bg-grey-500 border-pink-500 border-4 py-2 px-4 text-pink-500 block w-full placeholder:text-pink-500"
            placeholder="E-mail"
          />
        </form>
        <form className="w-full px-4">
          <input
            type="text"
            className="rounded-lg bg-grey-500 border-pink-500 border-4 py-2 px-4 text-pink-500 block w-full placeholder:text-pink-500"
            placeholder="Password"
          />
        </form>
        <form className="w-full px-4">
          <input
            type="text"
            className="rounded-lg bg-grey-500 border-pink-500 border-4 py-2 px-4 text-pink-500 block w-full placeholder:text-pink-500"
            placeholder="Confirm Password"
          />
        </form>
        <LightButton>Create Account</LightButton>
      </div>
    </div>
  );
}
