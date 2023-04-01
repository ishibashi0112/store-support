import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { UserAttributes, UserResponse } from "@supabase/supabase-js";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

import { InviteFormBody } from "./component/InviteFormBody";

type Props = {
  storeName: string;
  updateUser: (
    attributes: UserAttributes,
    options?:
      | {
          emailRedirectTo?: string | undefined;
        }
      | undefined
  ) => Promise<UserResponse>;
};

const InviteForm: NextPage<Props> = (props) => {
  return (
    <div>
      <InviteFormBody {...props} />
    </div>
  );
};
export default InviteForm;

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
  const { data, error } = await supabase
    .from("stores")
    .select("name")
    .eq("id", storeId);

  if (error) {
    throw error;
  }

  const storeName = data[0].name as string;

  return {
    props: {
      initialSession: session,
      user: session,
      storeName,
    },
  };
};
