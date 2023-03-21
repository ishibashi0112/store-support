import { useRouter } from "next/router";
import useSWRImmutable from "swr/immutable";

import { MenuCategory } from "@/pages/store/[id]/menu/type/type";

import { getMenuCategoriesByStoreId } from "../supabase/database";

const fetcher = async (url: string): Promise<MenuCategory[]> => {
  const storeId = url.split("/")[1];
  const categories = await getMenuCategoriesByStoreId(storeId);

  return categories;
};

export const useCategories = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data,
    isLoading,
    error: isError,
  } = useSWRImmutable<MenuCategory[], Error>(
    id ? `/${id}/categoreis` : null,
    fetcher
  );

  return { categories: data, isLoading, isError };
};
