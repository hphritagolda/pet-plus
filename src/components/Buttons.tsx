import { XMarkIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/solid";
import { ReactNode } from "react";

export function LightButton(props: { children: ReactNode }) {
  return (
    <button className="text-center text-slate-900 rounded-full bg-pink-500 py-2 w-full max-w-xs font-bold">
      {props.children}
    </button>
  );
}

export function DarkButton(props: { children: ReactNode }) {
  return (
    <button className="text-center text-pink-500 rounded-full bg-slate-900 py-2 w-full max-w-xs font-bold">
      {props.children}
    </button>
  );
}

export function ExitButton(props: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="bg-pink-500 rounded-full p-2 inline-flex items-center justify-center text-blue-500 hover:text-pink-500 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
    >
      <span className="sr-only">Close menu</span>

      <XMarkIcon className="w-6 h-6" />
    </button>
  );
}

export function ProfileButton(props: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="bg-pink-500 rounded-full p-2 inline-flex items-center justify-center text-blue-500 hover:text-pink-500 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
    >
      <span className="sr-only">Close menu</span>

      <UserIcon className="w-6 h-6" />
    </button>
  );
}

export function UploadButton(props: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="bg-pink-500 rounded-full p-2 inline-flex items-center justify-center text-blue-500 hover:text-pink-500 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
    >
      <span className="sr-only">Close menu</span>

      <ArrowUpOnSquareIcon className="w-6 h-6" />
    </button>
  );
}
