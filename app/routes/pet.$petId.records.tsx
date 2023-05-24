import { SectionTitle } from "@/components/Typography";
import { HealthRecord } from "../components/HealthRecord";

export default function () {
  return (
    <div className="mt-4 flex flex-col gap-5">
      <SectionTitle>Vaccination Records</SectionTitle>
      <HealthRecord />
      <HealthRecord />
      <HealthRecord />
      <HealthRecord />
      <HealthRecord />
    </div>
  );
}
