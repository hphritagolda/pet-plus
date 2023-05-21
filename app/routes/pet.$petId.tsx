import { useParams } from "@remix-run/react";

export default function PetPage() {
  const router = useParams();

  return <div>Pet with id of {router.petId}</div>;
}
