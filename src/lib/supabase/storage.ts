import { randomId } from "@mantine/hooks";

import { supabase } from "./supabase";

export const imageUpload = async (image: File) => {
  const { data, error } = await supabase.storage
    .from("menu-image")
    .upload(`${randomId()}.png`, image);
  if (error) {
    throw error;
  }

  return data.path;
};

export const getImageUrl = (imagePath: string) => {
  const { data } = supabase.storage.from("menu-image").getPublicUrl(imagePath);

  return data.publicUrl;
};
