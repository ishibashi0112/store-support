import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps } from "next";
import React from "react";
import { SWRConfig } from "swr";

import { NextPageWithLayout } from "@/pages/_app.page";
import { StoreLayout } from "@/pages-layout/store/StoreLayout";

import { EmployeeBody } from "./component/EmployeeBody";
import { User } from "./type/types";

type Props = {
  fallback: any;
};

const Employee: NextPageWithLayout<Props> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <EmployeeBody />
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient<"users">(ctx);

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
  const usersKey = `/api/${storeId}/users`;

  const { data, error } = await supabase
    .from<"users", User>("users")
    .select(`*`)
    .eq("storeId", storeId);

  if (error) {
    throw error;
  }

  return {
    props: {
      initialSession: session,
      user: session,
      fallback: { [usersKey]: data },
    },
  };
};

Employee.getLayout = StoreLayout;

export default Employee;
