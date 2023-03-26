import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

import { fetcher } from "../utils/function";
import { CategoryFormValues } from "../zod/schema";

type Arg = {
  arg: { values: CategoryFormValues; id: string };
};

const updateCategory = async (url: string, { arg }: Arg) => {
  const requestBody = { ...arg.values, id: arg.id };

  return await fetcher(url, "PUT", requestBody);
};

export const useUpdateCategoryMutation = () => {
  const router = useRouter();
  const { id } = router.query;

  const { trigger, isMutating } = useSWRMutation(
    `/api/${id}/categories`,
    updateCategory
  );

  return { trigger, isMutating };
};
