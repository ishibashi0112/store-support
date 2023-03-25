import { Radio } from "@mantine/core";
import React, { FC } from "react";
import { useSnapshot } from "valtio";

import { setSelectedMenus, state } from "@/lib/store/state";

import { Menu } from "../type/type";

type Props = {
  menuId: Menu["id"];
  className?: string;
};

export const MenuSelectRadio: FC<Props> = (props) => {
  const { selectedMenus } = useSnapshot(state);
  return (
    <Radio
      classNames={{ root: `${props.className}`, radio: "cursor-pointer" }}
      checked={selectedMenus.includes(props.menuId)}
      readOnly
      onClick={() => setSelectedMenus(props.menuId)}
    />
  );
};
