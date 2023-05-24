import { UserIcon } from "@heroicons/react/24/solid";
import type { ReactNode } from "react";

function UserProfileIcon(props: { children: ReactNode }) {
  return (
    <div className="inline-flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-pink-500 text-blue-500">
      {props.children}
    </div>
  );
}

export function UserProfileImage(props: {
  imageBase64: string | undefined;
  alt: string;
}) {
  return (
    <UserProfileIcon>
      {props.imageBase64 ? (
        <img
          src={props.imageBase64}
          alt={props.alt}
          className="h-full w-full"
          width={128}
          height={128}
        />
      ) : (
        <UserIcon className="h-full w-full p-2" />
      )}
    </UserProfileIcon>
  );
}
