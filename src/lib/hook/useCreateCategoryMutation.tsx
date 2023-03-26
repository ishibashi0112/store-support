import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

import { fetcher } from "../utils/function";
import { AddCategoryFormValues } from "../zod/schema";

type CreateArg = {
  arg: AddCategoryFormValues;
};

const createCategory = async (url: string, { arg }: CreateArg) => {
  const { inputs } = arg;

  return await fetcher(url, "POST", inputs);
};

export const useCreateCategoryMutation = () => {
  const router = useRouter();
  const { id } = router.query;

  const { trigger, isMutating } = useSWRMutation(
    `/api/${id}/categories`,
    createCategory
  );

  return { trigger, isMutating };
};
