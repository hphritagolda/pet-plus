import { XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowUpOnSquareIcon, UserIcon } from "@heroicons/react/24/solid";
import { Link } from "@remix-run/react";
import type { ReactNode } from "react";
import { useState } from "react";

export function LightButton(props: {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
}) {
  return (
    <button
      className="w-full rounded-full bg-pink-500 px-8 py-2 text-center font-bold text-slate-900"
      type={props.type}
    >
      {props.children}
    </button>
  );
}

export function LightButtonLink(props: { children: ReactNode; to: string }) {
  return (
    <Link
      to={props.to}
      className="w-full max-w-xs rounded-full bg-pink-500 px-8 py-2 text-center font-bold text-slate-900"
    >
      {props.children}
    </Link>
  );
}

export function DarkButton(props: { children: ReactNode }) {
  return (
    <button className="w-full max-w-xs rounded-full bg-slate-900 py-2 text-center font-bold text-pink-500">
      {props.children}
    </button>
  );
}
export function DarkButtonLink(props: { children: ReactNode; to: string }) {
  return (
    <Link
      to={props.to}
      className="w-full max-w-xs rounded-full bg-slate-900 px-8 py-2 text-center font-bold text-pink-500"
    >
      {props.children}
    </Link>
  );
}

export function ExitLink(props: { to: string }) {
  return (
    <Link
      className="inline-flex items-center justify-center rounded-full bg-pink-500 p-2 text-blue-500 ring-offset-4 ring-offset-blue-500 hover:bg-blue-500 hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
      to={props.to}
    >
      <span className="sr-only"></span>

      <XMarkIcon className="h-6 w-6" />
    </Link>
  );
}

export function ProfileLink(props: {
  to: string;
  imageBase64?: string | undefined;
}) {
  return (
    <Link
      className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-pink-500 text-blue-500 ring-offset-4 ring-offset-blue-500 hover:bg-blue-500 hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
      to={props.to}
      id="profile"
    >
      <span className="sr-only"></span>
      {props.imageBase64 ? (
        <img
          src={props.imageBase64}
          alt="profile"
          className="h-full w-full"
          width={32}
          height={32}
        />
      ) : (
        <UserIcon className="h-full w-full p-2" />
      )}
    </Link>
  );
}

export function UploadInput() {
  const [file, setFile] = useState<string | undefined>(undefined);

  return (
    <label className="inline-flex items-center justify-center gap-2 rounded-full bg-pink-500 p-2 text-blue-500 hover:bg-blue-500 hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500">
      <span className="sr-only">Close menu</span>

      <ArrowUpOnSquareIcon className="h-6 w-6" />
      <input
        onChange={(e) => {
          const value = e.currentTarget.files?.item(0);
          if (value) {
            setFile(value.name);
          }
        }}
        type="file"
        name="profilePhoto"
        accept="image/*"
        className="hidden"
      ></input>
      {file}
    </label>
  );
}

export function DeleteButton(props: {
  children: ReactNode;
  type: "button" | "submit" | "reset" | undefined;
}) {
  return (
    <button
      type="submit"
      className="w-full max-w-xs gap-6 rounded-full bg-yellow-200 px-11 py-2 text-center font-bold text-slate-900"
    >
      {props.children}
    </button>
  );
}

export function EditProfileButton(props: { children: ReactNode }) {
  return (
    <button className="w-full max-w-xs gap-6 rounded-full bg-pink-500 px-11 py-2 text-center font-bold text-slate-900">
      {props.children}
    </button>
  );
}
