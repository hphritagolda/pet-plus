import { DeleteButton } from "@/components/Buttons";
import { HealthRecord } from "@/components/HealthRecord";
import { SectionTitle } from "@/components/Typography";
import { VaccinationRecord } from "@/components/VaccinationRecord";

export default function () {
  return (
    <div className="mt-4 flex flex-col gap-4">
      <SectionTitle>Recent Vaccinations</SectionTitle>
      <div>
        <VaccinationRecord />
      </div>

      <SectionTitle>Recent Records</SectionTitle>
      <div>
        <HealthRecord />
      </div>
      <div className="mt-4 self-center">
        <DeleteButton>Delete Pet</DeleteButton>
      </div>
    </div>
  );
}
