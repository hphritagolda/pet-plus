import poppyProfile from "@/assets/poppy.jpg";
import { ExitLink, ProfileButton } from "@/components/Buttons";
import { NavLink, Outlet } from "@remix-run/react";
import {
  PetNameTitle,
  PetSubtitle,
  PetDescription,
} from "@/components/Typography";

export default function PetPage() {
  return (
    <div className="">
      <div className="fixed inset-x-8 top-8 z-10 flex justify-between md:left-[28rem]">
        <ExitLink to="/" />
        <ProfileButton>User Profile</ProfileButton>
      </div>
      <div className="fixed inset-x-0 top-0 h-96 md:bottom-0 md:left-96 md:h-full">
        <img
          src={poppyProfile}
          alt=""
          width={500}
          height={500}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-x-0 bottom-16 text-center">
          <PetNameTitle>Poppy</PetNameTitle>
          <PetSubtitle>Golden Retriever</PetSubtitle>
          <PetDescription>Female | 5Y.O | 56CM | 29KG</PetDescription>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 flex h-[60vh] flex-col flex-nowrap rounded-t-lg bg-grey-500 px-4 py-5 md:left-0 md:right-auto md:top-0 md:h-full md:max-w-md md:rounded-r-lg md:rounded-tl-none">
        <div className="mb-4 flex flex-row justify-between rounded-full bg-blue-500">
          <NavLink
            to="."
            className="-mr-2 rounded-full px-8 py-4 text-pink-500 [&.active]:bg-pink-500 [&.active]:text-blue-500"
            end
          >
            Overview
          </NavLink>
          <NavLink
            to="vaccinations"
            className="-mx-2 rounded-full px-8 py-4 text-pink-500 [&.active]:bg-pink-500 [&.active]:text-blue-500"
          >
            Vaccinations
          </NavLink>
          <NavLink
            to="records"
            className="-ml-2 rounded-full px-8 py-4 text-pink-500 [&.active]:bg-pink-500 [&.active]:text-blue-500"
          >
            Records
          </NavLink>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
