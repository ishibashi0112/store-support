import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

import { fetcher } from "@/lib/utils/function";

import { InviteUserFormValues } from "../zod/inviteFormSchema";

type Arg = {
  arg: InviteUserFormValues;
};

const updateInviteUser = async (url: string, { arg }: Arg) => {
  return await fetcher(url, "POST", arg);
};

export const useUpdateInviteUserMutation = () => {
  const router = useRouter();
  const { id } = router.query;

  const { trigger, isMutating } = useSWRMutation(
    `/api/${id}/updateInviteUser`,
    updateInviteUser
  );

  return { trigger, isMutating };
};
