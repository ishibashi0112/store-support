import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

import { deleteImage } from "../supabase/storage";
import { fetcher } from "../utils/function";

type DeleteArg = { arg: { id: string; imagePath: string | null } };

const deleteMenuWithImage = async (url: string, { arg }: DeleteArg) => {
  const { id, imagePath } = arg;
  await fetcher(url, "DELETE", { id });
  if (imagePath) {
    await deleteImage(imagePath);
  }
};

export const useDeleteMemuMutation = () => {
  const router = useRouter();
  const { id } = router.query;

  const { trigger, isMutating } = useSWRMutation(
    `/api/${id}/menus`,
    deleteMenuWithImage
  );

  return { trigger, isMutating };
};
