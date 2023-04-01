import { createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";

import { sendInviteMailFormSchema } from "@/pages/store/[id]/employee/lib/zod/employeeSchema";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body } = req;
  const storeId = query.id as string;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE;

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const session = await supabase.auth.getSession();

    if (!session) {
      if (!session)
        return res.status(401).json({
          error: "not_authenticated",
          description:
            "The user does not have an active session or is not authenticated",
        });
    }

    const parsedBody = sendInviteMailFormSchema.parse(body);

    const { data, error } = await supabase.auth.admin.inviteUserByEmail(
      parsedBody.email,
      {
        redirectTo: `http://localhost:3000/store/${storeId}/inviteForm`,
      }
    );

    if (error) {
      throw error;
    }

    res.status(200).json(data);
  }
};

export default handler;
