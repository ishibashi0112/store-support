import React, { FC } from "react";

import { Menu as MenuType } from "../type/type";
import { ListMenu } from "./ListMenu";
import { MenuCard } from "./MenuCard";

type Props = {
  menu: MenuType;
  display: string;
};

export const Menu: FC<Props> = (props) => {
  return props.display === "list" ? (
    <ListMenu menu={props.menu} />
  ) : (
    <MenuCard menu={props.menu} />
  );
};
