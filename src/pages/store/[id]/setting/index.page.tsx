import React from "react";

import { NextPageWithLayout } from "@/pages/_app.page";
import { StoreLayout } from "@/pages-layout/store/StoreLayout";

const Setting: NextPageWithLayout = () => {
  return (
    <div>
      <p className="text-red-400">settings</p>
      <p></p>
    </div>
  );
};

Setting.getLayout = StoreLayout;

export default Setting;
