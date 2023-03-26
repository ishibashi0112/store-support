import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

import { imageUpload, updateImage } from "../supabase/storage";
import { fetcher } from "../utils/function";
import { AddMenuFormValues } from "../zod/schema";

type Arg = {
  arg: { values: AddMenuFormValues; id: string; currentImagePath: string };
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

export const useMemuMutation = (method: "POST" | "PUT") => {
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
