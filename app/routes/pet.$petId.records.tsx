import ClipboardIcon from "@/assets/clipboard.svg";
import { SectionTitle } from "@/components/Typography";

function HealthRecord() {
  return (
    <div className="flex flex-row flex-nowrap items-center gap-6 rounded-lg bg-pink-50 p-4 text-blue-500">
      <div className="rounded-full bg-pink-500 p-4">
        <img
          src={ClipboardIcon}
          width={64}
          height={64}
          alt=""
          className="h-10 w-10"
        />
      </div>
      <div className="">
        <p className="text-lg font-bold">Health Record Title</p>
        <p className="text-sm">Health Record Date</p>
      </div>
    </div>
  );
}

export default function () {
  return (
    <div className="mt-4 flex flex-col gap-5">
      <SectionTitle>Vaccination Records</SectionTitle>
      <HealthRecord></HealthRecord>
      <HealthRecord></HealthRecord>
      <HealthRecord></HealthRecord>
      <HealthRecord></HealthRecord>
      <HealthRecord></HealthRecord>
    </div>
  );
}
