import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps } from "next";
import React from "react";

import { NextPageWithLayout } from "@/pages/_app.page";
import { StoreLayout } from "@/pages-layout/store/StoreLayout";

const Menu: NextPageWithLayout = (props) => {
  return <div></div>;
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

  return {
    props: {
      initialSession: session,
      user: session,
      storeId: ctx.query.id,
    },
  };
};

Menu.getLayout = StoreLayout;

export default Menu;
