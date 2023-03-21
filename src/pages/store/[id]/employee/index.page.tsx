import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps } from "next";
import React from "react";

import { NextPageWithLayout } from "@/pages/_app.page";
import { StoreLayout } from "@/pages-layout/store/StoreLayout";

import { EmployeeBody } from "./EmployeeBody";

const Employee: NextPageWithLayout = () => {
  return (
    <div>
      <EmployeeBody />
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

  return {
    props: {
      initialSession: session,
      user: session,
    },
  };
};

Employee.getLayout = StoreLayout;

export default Employee;
