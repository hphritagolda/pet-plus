import { useRouter } from "next/router";

export default function PetPage() {
  const router = useRouter();

  return <div>Pet with id of {router.query.pet_id}</div>;
}
