import { SectionTitle } from "@/components/Typography";
import { VaccinationRecord } from "@/components/VaccinationRecord";

export default function () {
  return (
    <div className="mt-4 flex flex-col gap-5">
      <SectionTitle>Vaccination Records</SectionTitle>
      <VaccinationRecord />
      <VaccinationRecord />
      <VaccinationRecord />
      <VaccinationRecord />
      <VaccinationRecord />
      <VaccinationRecord />
      <VaccinationRecord />
      <VaccinationRecord />
      <VaccinationRecord />
      <VaccinationRecord />
    </div>
  );
}
