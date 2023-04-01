import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

import { transformedInviteUserFormSchema } from "@/pages/store/[id]/inviteForm/lib/zod/inviteFormSchema";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body } = req;
  const storeId = query.id as string;

  const supabase = createServerSupabaseClient({
    req,
    res,
  });
  const parsedBody = transformedInviteUserFormSchema.parse(body);

  const { data, error: updateUserError } = await supabase.auth.updateUser({
    password: parsedBody.password,
  });

  if (updateUserError) {
    throw updateUserError;
  }

  const { password, confirmPassword, ...trimedBody } = parsedBody;
  const newBodyData = {
    ...trimedBody,
    id: data.user.id,
    storeId,
    role: "employee",
  };

  const { error: createUserDataError } = await supabase
    .from("users")
    .insert(newBodyData);

  if (createUserDataError) {
    throw createUserDataError;
  }

  res.status(200).json({ ok: true });
};
export default handler;
