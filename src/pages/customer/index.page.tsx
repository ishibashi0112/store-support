import React from "react";

import { CustomerLayout } from "@/pages-layout/customer/customerLayout";

import { NextPageWithLayout } from "../_app.page";

const Customer: NextPageWithLayout = () => {
  return (
    <div>
      <p className="text-red-400">Custome</p>
    </div>
  );
};

Customer.getLayout = CustomerLayout;

export default Customer;
