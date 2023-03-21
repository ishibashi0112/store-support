import { AppShell } from "@mantine/core";
import React from "react";

import { CustomLayout } from "@/pages/_app.page";

import { Header } from "./Hearder";

export const TopLayout: CustomLayout = (page) => {
  return <AppShell header={<Header />}>{page}</AppShell>;
};
