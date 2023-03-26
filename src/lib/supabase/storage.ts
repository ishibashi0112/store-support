import { randomId } from "@mantine/hooks";

import { supabase } from "./supabase";

export const imageUpload = async (image: File): Promise<string> => {
  const { data, error } = await supabase.storage
    .from("menu-image")
    .upload(`${randomId()}.png`, image);

  if (error) {
    throw error;
  }

  return data.path;
};

export const updateImage = async (
  image: File,
  currentImagePath: string
): Promise<string> => {
  const { data, error } = await supabase.storage
    .from("menu-image")
    .upload(currentImagePath ? currentImagePath : `${randomId()}.png`, image, {
      upsert: true,
    });

  if (error) {
    throw error;
  }

  return data.path;
};

export const deleteImage = async (imagePath: string): Promise<void> => {
  const { error } = await supabase.storage
    .from("menu-image")
    .remove([imagePath]);

  if (error) {
    throw error;
  }
};

export const getImageUrl = (imagePath: string) => {
  const { data } = supabase.storage.from("menu-image").getPublicUrl(imagePath);

  return data.publicUrl;
};
