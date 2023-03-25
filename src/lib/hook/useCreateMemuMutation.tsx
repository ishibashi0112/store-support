import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

import { imageUpload } from "../supabase/storage";
import { AddMenuFormValues } from "../zod/schema";

type Arg = { arg: AddMenuFormValues };

const createMenuWithImageUpload = async (url: string, { arg }: Arg) => {
  const imagePath = arg.image ? await imageUpload(arg.image) : null;

  const { image, ...trimedBody } = arg;
  const newRequestBody = { ...trimedBody, imagePath };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRequestBody),
  });

  if (!res.ok) {
    throw Error;
  }

  return await res.json();
};

export const useCreateMemuMutation = () => {
  const router = useRouter();
  const { id } = router.query;
  const { trigger, isMutating } = useSWRMutation(
    `/api/${id}/menus`,
    createMenuWithImageUpload
  );

  return { trigger, isMutating };
};
