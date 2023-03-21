import { AppShell } from "@mantine/core";
import React from "react";

import { CustomLayout } from "@/pages/_app.page";

import { Header } from "./Hearder";
import { Navbar } from "./Navbar";

export const StoreLayout: CustomLayout = (page) => {
  return (
    <AppShell header={<Header />} navbar={<Navbar />}>
      {page}
    </AppShell>
  );
};
