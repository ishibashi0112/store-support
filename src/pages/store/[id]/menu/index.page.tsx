import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps } from "next";
import React from "react";
import { SWRConfig } from "swr";

import {
  getMenuCategoriesByStoreId,
  getMenusByStoreId,
} from "@/lib/supabase/database";
import { NextPageWithLayout } from "@/pages/_app.page";
import { StoreLayout } from "@/pages-layout/store/StoreLayout";

import { MenuBody } from "./component/MenuBody";
import { MenuPageProps } from "./type/type";

const Menu: NextPageWithLayout<MenuPageProps> = (props) => {
  return (
    <SWRConfig value={{ fallback: props.fallback }}>
      <MenuBody />
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/auth/signIn",
        permanent: false,
      },
    };

  const storeId = ctx.query.id as string;
  const menus = await getMenusByStoreId(storeId);
  const categories = await getMenuCategoriesByStoreId(storeId);
  const menusKey = `/${storeId}/menus`;
  const categoriesKey = `/${storeId}/categories`;

  return {
    props: {
      initialSession: session,
      user: session,
      storeId: ctx.query.id,
      fallback: {
        [menusKey]: menus,
        [categoriesKey]: categories,
      },
    },
  };
};

Menu.getLayout = StoreLayout;

export default Menu;
