import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

import {
  deleteMenuRequestBodySchema,
  postMenuRequestBodySchema,
  putMenuRequestBodySchema,
} from "@/lib/zod/schema";
import { Menu } from "@/pages/store/[id]/menu/type/type";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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

    if (error) {
      throw error;
    }

    const menu = data[0] as Menu;

    res.status(200).json({ menu });
  } else if (method === "DELETE") {
    const parsedBody = deleteMenuRequestBodySchema.parse(body);
    const { id } = parsedBody;

    const { error } = await supabase.from("menus").delete().eq("id", id);

    if (error) {
      throw error;
    }

    res.status(200).json({});
  } else {
    res.status(200).json({ menus: [] });
  }
};

export default handler;
