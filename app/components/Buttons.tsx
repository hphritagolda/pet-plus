import { XMarkIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/solid";
import { Link } from "@remix-run/react";
import { To } from "@remix-run/router";
import type { ReactNode } from "react";

export function LightButton(props: {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
}) {
  return (
    <button
      className="w-full max-w-xs rounded-full bg-pink-500 px-8 py-2 text-center font-bold text-slate-900"
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
      className="w-full max-w-xs rounded-full bg-slate-900 py-2 text-center font-bold text-pink-500"
    >
      {props.children}
    </Link>
  );
}

export function ExitLink(props: { to: string }) {
  return (
    <Link
      className="inline-flex items-center justify-center rounded-full bg-pink-500 p-2 text-blue-500 hover:bg-blue-500 hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
      to={props.to}
    >
      <span className="sr-only"></span>

      <XMarkIcon className="h-6 w-6" />
    </Link>
  );
}

export function ProfileLink(props: { to: string }) {
  return (
    <Link
      className="inline-flex items-center justify-center rounded-full bg-pink-500 p-2 text-blue-500 hover:bg-blue-500 hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
      to={props.to}
    >
      <span className="sr-only"></span>

      <UserIcon className="h-6 w-6" />
    </Link>
  );
}

export function UploadButton(props: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-full bg-pink-500 p-2 text-blue-500 hover:bg-blue-500 hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
    >
      <span className="sr-only">Close menu</span>

      <ArrowUpOnSquareIcon className="h-6 w-6" />
    </button>
  );
}

export function DeleteButton(props: { children: ReactNode }) {
  return (
    <button className="w-full max-w-xs gap-6 rounded-full bg-yellow-200 px-11 py-2 text-center font-bold text-slate-900">
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
