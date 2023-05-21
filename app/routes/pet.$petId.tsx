import poppyProfile from "@/assets/poppy.jpg";
import { ExitLink, ProfileButton } from "@/components/Buttons";
import { NavLink, Outlet } from "@remix-run/react";

export default function PetPage() {
  return (
    <div className="">
      <div className="fixed top-8 left-8 right-8 flex justify-between z-10">
        <ExitLink to="/" />
        <ProfileButton>User Profile</ProfileButton>
      </div>
      <img
        src={poppyProfile}
        alt=""
        width={500}
        height={500}
        className="fixed"
      />
      <div className="absolute inset-x-0 bottom-0 bg-grey-500 rounded-lg py-5 px-4">
        <div className="rounded-full bg-blue-500 flex flex-row justify-between">
          <NavLink
            to="."
            className="text-pink-500 [&.active]:bg-pink-500 [&.active]:text-blue-500 py-4 px-8 -mx-2 rounded-full"
            end
          >
            Overview
          </NavLink>
          <NavLink
            to="vaccinations"
            className="text-pink-500 [&.active]:bg-pink-500 [&.active]:text-blue-500 py-4 px-8 -mx-2 rounded-full"
          >
            Vaccinations
          </NavLink>
          <NavLink
            to="records"
            className="text-pink-500 [&.active]:bg-pink-500 [&.active]:text-blue-500 py-4 px-8 -mx-2 rounded-full"
          >
            Records
          </NavLink>
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
