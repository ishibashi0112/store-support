import { Menu, MenuCategory } from "@/pages/store/[id]/menu/type/type";

import { supabase } from "./supabase";

export const getStoreIdByCurrentUser = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select(`*`)
    .eq("id", userId);

  if (error) {
    throw error;
  }

  return data[0].storeId;
};

export const getSeatsByStoreId = async (storeId: string) => {
  const { data, error } = await supabase
    .from("seats")
    .select(`*`)
    .eq("storeId", storeId);

  if (error) {
    throw error;
  }

  return data;
};

export const getMenusByStoreId = async (storeId: string): Promise<Menu[]> => {
  const { data, error } = await supabase
    .from("menus")
    .select(`*`)
    .eq("storeId", storeId);

  const menus = data as Menu[];

  if (error) {
    throw error;
  }

  return menus;
};

export const getMenuCategoriesByStoreId = async (
  storeId: string
): Promise<MenuCategory[]> => {
  const { data, error } = await supabase
    .from("menu-categories")
    .select(`*`)
    .eq("storeId", storeId);

  const categories = data as MenuCategory[];

  if (error) {
    throw error;
  }

  return categories;
};

export const createSeats = async (seatsData: any) => {
  const { error } = await supabase.from("seats").insert(seatsData);

  if (error) {
    throw error;
  }
};

export const createMenus = async (menusData: any) => {
  const { error } = await supabase.from("menus").insert(menusData);

  if (error) {
    throw error;
  }
};
