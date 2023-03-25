import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

import {
  postMenuRequestBodySchema,
  putMenuRequestBodySchema,
} from "@/lib/zod/schema";
import { Menu } from "@/pages/store/[id]/menu/type/type";

type Data =
  | {
      menus: Menu[];
    }
  | { menu: Menu };

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { query, method, body } = req;
  const storeId = query.id as string;

  const supabase = createServerSupabaseClient({
    req,
    res,
  });

  if (method === "GET") {
    const { data, error } = await supabase
      .from("menus")
      .select(`*`)
      .eq("storeId", storeId);

    const menus = data as Menu[];

    if (error) {
      throw error;
    }

    res.status(200).json({ menus });
  } else if (method === "POST") {
    const parsedBody = postMenuRequestBodySchema.parse(body);
    const newBodyData = { ...parsedBody, storeId };

    const { data, error } = await supabase
      .from("menus")
      .insert(newBodyData)
      .select();

    if (error) {
      throw error;
    }

    const menu = data[0] as Menu;

    res.status(200).json({ menu });
  } else if (method === "PUT") {
    const parsedBody = putMenuRequestBodySchema.parse(body);
    const { id, ...newBodyData } = parsedBody;

    const { data, error } = await supabase
      .from("menus")
      .update(newBodyData)
      .eq("id", id)
      .select();

    console.log(1);

    if (error) {
      throw error;
    }

    const menu = data[0] as Menu;

    console.log(2);

    res.status(200).json({ menu });
  } else {
    res.status(200).json({ menus: [] });
  }
};

export default handler;
