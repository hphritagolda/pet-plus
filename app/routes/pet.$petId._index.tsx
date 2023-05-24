import { DeleteButton } from "@/components/Buttons";
import { HealthRecord } from "@/components/HealthRecord";
import { SectionTitle } from "@/components/Typography";
import { VaccinationRecord } from "@/components/VaccinationRecord";
import { getCurrentUser } from "@/models/Auth";
import Pet from "@/models/Pets";
import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

export async function action({ request, params }: ActionArgs) {
  const user = await getCurrentUser(request);

  if (!user) {
    return redirect("/signin");
  }

  const petId = params.petId;

  if (!petId) {
    return redirect("/");
  }

  const pet = await Pet.findById(petId);

  if (!pet) {
    return redirect("/");
  }

  if (pet.user.toString() !== user.id) {
    return json({ error: "You do not own this pet" });
  }

  await pet.deleteOne();

  return redirect("/");
}

export default function () {
  const actionData = useActionData<typeof action>();
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
      <Form method="post" className="mt-4 self-center">
        <DeleteButton type="submit">Delete Pet</DeleteButton>
      </Form>
      {actionData?.error}
    </div>
  );
}
