import { SectionTitle } from "@/components/Typography";
import SyringeIcon from "@/assets/syringe.svg";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

function Record() {
  return (
    <div className="bg-pink-50 rounded-lg p-4 text-blue-500 flex flex-row flex-nowrap items-center gap-6">
      <div className="bg-pink-500 rounded-full p-4">
        <img
          src={SyringeIcon}
          width={64}
          height={64}
          alt=""
          className="w-10 h-10"
        />
      </div>
      <div className="">
        <p className="font-bold text-lg">Vaccination Title</p>
        <p className="text-sm">Vaccination Date</p>
      </div>
    </div>
  );
}

export default function () {
  return (
    <div className="mt-4">
      <SectionTitle>Recent Vaccinations</SectionTitle>
      <div className="">
        <Record></Record>
      </div>

      <SectionTitle>Recent Records</SectionTitle>
      <div className="">
        <Record></Record>
      </div>
    </div>
  );
}
