import { proxy } from "valtio";

import { Menu } from "@/pages/store/[id]/menu/type/type";

type ValtioState = {
  menuDisplay: "grid" | "list";
  selectedMenus: Menu["id"][];
};

export const state = proxy<ValtioState>({
  menuDisplay: "list",
  selectedMenus: [],
});

export const setMenuDisplay = (value: "grid" | "list") => {
  state.menuDisplay = value;
};

export const setSelectedMenus = (menuId: string) => {
  if (state.selectedMenus.includes(menuId)) {
    state.selectedMenus = state.selectedMenus.filter((id) => id !== menuId);
  } else {
    state.selectedMenus.push(menuId);
  }
};
