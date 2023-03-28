import { useRouter } from "next/router";
import useSWRImmutable from "swr/immutable";

import { User } from "@/pages/store/[id]/employee/type/types";

const fetcher = async (url: string): Promise<User[]> => {
  const res = await fetch(url);

  if (!res.ok) {
    throw Error;
  }

  const json = (await res.json()) as { users: User[] };

  return json.users;
};

export const useUsers = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data,
    isLoading,
    error: isError,
  } = useSWRImmutable<User[], Error>(id ? `/api/${id}/users` : null, fetcher);

  return { users: data, isLoading, isError };
};
