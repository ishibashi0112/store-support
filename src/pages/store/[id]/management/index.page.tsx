import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps } from "next";
import React from "react";

import { getSeatsByStoreId } from "@/lib/supabase/database";
import { NextPageWithLayout } from "@/pages/_app.page";
import { StoreLayout } from "@/pages-layout/store/StoreLayout";

import { ManagementBody } from "./component/ManagementBody";
import { ManagementPageProps } from "./type/type";

const Management: NextPageWithLayout<ManagementPageProps> = (props) => {
  return (
    <div>
      <ManagementBody {...props} />
    </div>
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
  const seats = await getSeatsByStoreId(storeId);

  return {
    props: {
      initialSession: session,
      user: session,
      seats,
    },
  };
};

Management.getLayout = StoreLayout;

export default Management;
