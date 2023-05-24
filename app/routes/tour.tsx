import { getCurrentUser } from "@/models/Auth";
import User from "@/models/Users";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import type { CallBackProps, Step } from "react-joyride";
import Joyride from "react-joyride";
import { useMount } from "react-use";

export async function loader({ request }: LoaderArgs) {
  const user = await getCurrentUser(request);

  if (!user) {
    throw redirect("/signin");
  }

  return json({ completed: !!user.completedTour });
}

export async function action({ request }: ActionArgs) {
  const user = await getCurrentUser(request);

  if (!user) {
    throw redirect("/signin");
  }

  await User.findByIdAndUpdate(user.id, {
    $set: {
      completedTour: true,
    },
  });

  return json({ success: true });
}

const steps: Step[] = [
  {
    target: "#home",
    content: (
      <div className="text-left">
        <p>
          Welcome to PetPlus, where keeping track of your pet health records
          doesn't have to be so complicated!
        </p>
      </div>
    ),
    disableBeacon: true,
  },
  {
    target: "#profile",
    content: (
      <div className="text-left">
        <p>See and edit your profile here on the top right corner!</p>
        <p>
          Alternatively, you can also sign out from there (but we know you'll
          love it here)
        </p>
      </div>
    ),
    disableBeacon: true,
  },

  {
    target: "#add-pet",
    content: (
      <div className="text-left">
        <p>
          Add your pets here, where you'll be able to set up their profiles.
        </p>
      </div>
    ),
    disableBeacon: true,
  },
];

export function Tour() {
  const fetcher = useFetcher<typeof loader>();

  useMount(() => {
    fetcher.load("/tour");
  });

  if (!fetcher.data) {
    return null;
  }

  const handleCallback = ({ type }: CallBackProps) => {
    if (type === "tour:end") {
      fetcher.submit({}, { method: "post", action: "/tour" });
    }
  };

  //   const run = fetcher.data.completed === false;
  const run = true;

  return (
    <Joyride callback={handleCallback} continuous run={run} steps={steps} />
  );
}
