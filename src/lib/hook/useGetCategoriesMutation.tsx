import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

import { MenuCategory } from "@/pages/store/[id]/menu/type/type";

const getCategories = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw Error;
  }

  const resJson = await res.json();
  const categories = resJson.categories;

  return categories;
};

export const useGetCategoriesMutation = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, trigger, isMutating } = useSWRMutation<MenuCategory[]>(
    `/api/${id}/categories`,
    getCategories
  );

  return { categories: data, trigger, isMutating };
};
