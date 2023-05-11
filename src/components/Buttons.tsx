import { ReactNode } from "react";

export function LightButton(props: { children: ReactNode }) {
  return (
    <button className="text-center text-slate-900 rounded-full bg-rose-400 py-2 w-full max-w-xs font-bold">
      {props.children}
    </button>
  );
}

export function DarkButton(props: { children: ReactNode }) {
  return (
    <button className="text-center text-rose-400 rounded-full bg-slate-900 py-2 w-full max-w-xs font-bold">
      {props.children}
    </button>
  );
}
