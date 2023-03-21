import { useRouter } from "next/router";
import useSWRImmutable from "swr/immutable";

import { Menu } from "@/pages/store/[id]/menu/type/type";

import { getMenusByStoreId } from "../supabase/database";

const fetcher = async (url: string): Promise<Menu[]> => {
  const storeId = url.split("/")[1];
  const menus = await getMenusByStoreId(storeId);

  return menus;
};

export const useMeuns = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data,
    isLoading,
    error: isError,
  } = useSWRImmutable<Menu[], Error>(id ? `/${id}/menus` : null, fetcher);

  return { menus: data, isLoading, isError };
};
