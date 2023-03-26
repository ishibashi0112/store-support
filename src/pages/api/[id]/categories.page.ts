import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

import {
  deleteCategoryRequestBodySchema,
  postCategoryRequestBodySchema,
  putCategoryRequestBodySchema,
} from "@/lib/zod/schema";
import { MenuCategory } from "@/pages/store/[id]/menu/type/type";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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

    res.status(200).json({ categories });
  } else if (method === "POST") {
    const parsedBody = postCategoryRequestBodySchema.parse(body);
    const newBodyData = parsedBody.map((bodyData) => ({
      ...bodyData,
      storeId,
    }));

    const { data, error } = await supabase
      .from("menu-categories")
      .insert(newBodyData)
      .select();

    if (error) {
      throw error;
    }

    const categories = data as MenuCategory[];

    res.status(200).json({ categories });
  } else if (method === "PUT") {
    const parsedBody = putCategoryRequestBodySchema.parse(body);
    const { id, name } = parsedBody;

    const { data, error } = await supabase
      .from("menu-categories")
      .update({ name })
      .eq("id", id)
      .select();

    if (error) {
      throw error;
    }

    const category = data[0] as MenuCategory;

    res.status(200).json({ category });
  } else if (method === "DELETE") {
    const parsedBody = deleteCategoryRequestBodySchema.parse(body);
    const { categoryId } = parsedBody;

    const { error: menuUpdateError } = await supabase
      .from("menus")
      .update({ menuCategoryId: null })
      .eq("menuCategoryId", categoryId);

    if (menuUpdateError) {
      throw menuUpdateError;
    }

    const { error: categoryDeleteError } = await supabase
      .from("menu-categories")
      .delete()
      .eq("id", categoryId);

    if (categoryDeleteError) {
      throw categoryDeleteError;
    }

    res.status(200).json({});
  } else {
    res.status(200).json({ categories: [] });
  }
};

export default handler;
