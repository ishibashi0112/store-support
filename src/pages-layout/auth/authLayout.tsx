import React from "react";

import { CustomLayout } from "@/pages/_app.page";

export const AuthLayout: CustomLayout = (page) => {
  // const { isLoading } = useListenVerifyEmail();
  return (
    <>
      {page}
      {/* <LoadingOverlay visible={isLoading} /> */}
    </>
  );
};
