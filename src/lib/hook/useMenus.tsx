import { useRouter } from "next/router";
import useSWRImmutable from "swr/immutable";

import { Menu } from "@/pages/store/[id]/menu/type/type";

const fetcher = async (url: string): Promise<Menu[]> => {
  const res = await fetch(url);

  if (!res.ok) {
    throw Error;
  }

  const json = (await res.json()) as { menus: Menu[] };

  return json.menus;
};

export const useMeuns = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data,
    isLoading,
    error: isError,
  } = useSWRImmutable<Menu[], Error>(id ? `/api/${id}/menus` : null, fetcher);

  return { menus: data, isLoading, isError };
};
