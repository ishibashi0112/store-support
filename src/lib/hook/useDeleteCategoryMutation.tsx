import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

import { fetcher } from "../utils/function";

type DeleteArg = { arg: { categoryId: string } };

const deleteCategoryWithMenus = async (url: string, { arg }: DeleteArg) => {
  await fetcher(url, "DELETE", arg);
};

export const useDeleteCategoryMutation = () => {
  const router = useRouter();
  const { id } = router.query;

  const { trigger, isMutating } = useSWRMutation(
    `/api/${id}/categories`,
    deleteCategoryWithMenus
  );

  return { trigger, isMutating };
};
