import { SectionTitle } from "@/components/Typography";
import SyringeIcon from "@/assets/syringe.svg";

function VaccinationRecord() {
  return (
    <div className="flex flex-row flex-nowrap items-center gap-6 rounded-lg bg-pink-50 p-4 text-blue-500">
      <div className="rounded-full bg-pink-500 p-4">
        <img
          src={SyringeIcon}
          width={64}
          height={64}
          alt=""
          className="h-10 w-10"
        />
      </div>
      <div className="">
        <p className="text-lg font-bold">Vaccination Title</p>
        <p className="text-sm">Vaccination Date</p>
      </div>
    </div>
  );
}

export default function () {
  return (
    <div className="mt-4 flex flex-col gap-5">
      <SectionTitle>Vaccination Records</SectionTitle>
      <VaccinationRecord></VaccinationRecord>
      <VaccinationRecord></VaccinationRecord>
      <VaccinationRecord></VaccinationRecord>
      <VaccinationRecord></VaccinationRecord>
      <VaccinationRecord></VaccinationRecord>
      <VaccinationRecord></VaccinationRecord>
      <VaccinationRecord></VaccinationRecord>
      <VaccinationRecord></VaccinationRecord>
      <VaccinationRecord></VaccinationRecord>
      <VaccinationRecord></VaccinationRecord>
    </div>
  );
}
