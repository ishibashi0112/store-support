import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

import { fetcher } from "@/lib/utils/function";

import { SendInviteMailFormValues } from "../zod/employeeSchema";

type Arg = {
  arg: SendInviteMailFormValues;
};

const sendInviteEmail = async (url: string, { arg }: Arg) => {
  console.log(123);

  return await fetcher(url, "POST", arg);
};

export const useSendInviteEmailMutation = () => {
  const router = useRouter();
  const { id } = router.query;

  const { trigger, isMutating } = useSWRMutation(
    `/api/${id}/sendInviteEmail`,
    sendInviteEmail
  );

  return { trigger, isMutating };
};
