import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

import { imageUpload, updateImage } from "../supabase/storage";
import { AddMenuFormValues } from "../zod/schema";

type Arg = {
  arg: { values: AddMenuFormValues; id: string; currentImagePath: string };
};

type Method = "POST" | "PUT";

const fetcher = async (url: string, method: Method, bodyData: any) => {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });

  if (!res.ok) {
    throw Error;
  }

  return await res.json();
};

const createMenuWithImageUpload = async (url: string, { arg }: Arg) => {
  const { values } = arg;
  const imagePath = values.image ? await imageUpload(values.image) : null;

  const { image, ...trimedBody } = values;
  const newRequestBody = { ...trimedBody, imagePath };

  return await fetcher(url, "POST", newRequestBody);
};

const updateMenuWithImageUpload = async (url: string, { arg }: Arg) => {
  const { values, id, currentImagePath } = arg;
  const imagePath = values.image
    ? await updateImage(values.image, currentImagePath)
    : currentImagePath;

  const { image, ...trimedBody } = values;
  const newRequestBody = { ...trimedBody, imagePath, id };

  return await fetcher(url, "PUT", newRequestBody);
};

export const useMemuMutation = (method: Method) => {
  const router = useRouter();
  const { id } = router.query;
  const mutationFunc =
    method === "POST" ? createMenuWithImageUpload : updateMenuWithImageUpload;

  const { trigger, isMutating } = useSWRMutation(
    `/api/${id}/menus`,
    mutationFunc
  );

  return { trigger, isMutating };
};
