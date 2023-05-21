import type { ReactNode } from "react";

export function SectionTitle(props: { children: ReactNode }) {
  return (
    <h4 className=" text-amber-300 font-bold text-2xl py-2">
      {props.children}
    </h4>
  );
}
