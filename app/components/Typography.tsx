import type { ReactNode } from "react";

export function SectionTitle(props: { children: ReactNode }) {
  return (
    <h4 className=" py-1 text-2xl font-bold text-yellow-200">
      {props.children}
    </h4>
  );
}

export function PetNameTitle(props: { children: ReactNode }) {
  return (
    <h5 className=" py-1 text-xl font-bold text-pink-500">{props.children}</h5>
  );
}

export function PetSubtitle(props: { children: ReactNode }) {
  return (
    <h6 className=" py-1 text-lg font-bold text-yellow-200">
      {props.children}
    </h6>
  );
}

export function PetDescription(props: { children: ReactNode }) {
  return (
    <h6 className=" py-1 text-base font-medium text-white">{props.children}</h6>
  );
}

export function Title(props: { children: ReactNode }) {
  return (
    <h1 className="text-center text-3xl font-bold text-pink-500">
      {props.children}
    </h1>
  );
}
