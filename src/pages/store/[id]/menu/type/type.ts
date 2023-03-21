import { Session } from "@supabase/supabase-js";

export type Menu = {
  id: string;
  created_at: Date;
  uddated_at: Date;
  name: string;
  price: number;
  description: string;
  storeId: string;
  imagePath: string;
  menuCategoryId: string;
};

export type MenuCategory = {
  id: string;
  created_at: Date;
  name: string;
  storeId: string;
};

export type MenuPageProps = {
  initialSession: Session;
  user: Session;
  storeId: string;
  fallback: any;
  menus: Menu[];
  categories: MenuCategory[];
};
