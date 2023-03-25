import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

import { MenuCategory } from "@/pages/store/[id]/menu/type/type";

type Data = { categories: MenuCategory[] };

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { query, method, body } = req;
  const storeId = query.id as string;

  const supabase = createServerSupabaseClient({
    req,
    res,
  });

  if (method === "GET") {
    const { data, error } = await supabase
      .from("menu-categories")
      .select(`*`)
      .eq("storeId", storeId);

    const categories = data as MenuCategory[];

    if (error) {
      throw error;
    }

    console.log(categories);

    res.status(200).json({ categories });
  }
  // else if (method === "POST") {
  //   const parsedBody = createMenuRequestBodySchema.parse(body);
  //   const newBodyData = { ...parsedBody, storeId };

  //   const { data, error } = await supabase
  //     .from("menus")
  //     .insert(newBodyData)
  //     .select();

  //   if (error) {
  //     throw error;
  //   }

  //   const menu = data[0] as Menu;

  //   res.status(200).json({ menu });
  // }
  else {
    res.status(200).json({ categories: [] });
  }
};

export default handler;
