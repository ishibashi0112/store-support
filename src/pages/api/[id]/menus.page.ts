import { randomId } from "@mantine/hooks";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

import { addMenuFormschema } from "@/lib/zod/schema";
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
    const parsedBody = addMenuFormschema.parse(body);

    let imagePath = null;
    if (parsedBody.image) {
      const { data: fileData, error: imageUploadError } = await supabase.storage
        .from("menu-image")
        .upload(`${randomId()}.png`, parsedBody.image);

      if (imageUploadError) {
        throw imageUploadError;
      }

      imagePath = fileData.path;
    }

    const { image, ...purgedFormData } = parsedBody;
    const newBodyData = { ...purgedFormData, imagePath, storeId };

    const { data, error } = await supabase
      .from("menus")
      .insert(newBodyData)
      .select();

    if (error) {
      throw error;
    }
    const menu = data[0] as Menu;

    res.status(200).json({ menu });
  } else {
    res.status(200).json({ menus: [] });
  }
};

export default handler;
