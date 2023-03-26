import { useRouter } from "next/router";
import useSWRImmutable from "swr/immutable";

import { MenuCategory } from "@/pages/store/[id]/menu/type/type";

const fetcher = async (url: string): Promise<MenuCategory[]> => {
  const res = await fetch(url);

  if (!res.ok) {
    throw Error;
  }

  const json = (await res.json()) as { categories: MenuCategory[] };

  return json.categories;
};

export const useCategories = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data,
    isLoading,
    error: isError,
  } = useSWRImmutable<MenuCategory[], Error>(
    id ? `/api/${id}/categories` : null,
    fetcher
  );

  return { categories: data, isLoading, isError };
};
