import { Center, SegmentedControl } from "@mantine/core";
import { IconGridDots, IconList } from "@tabler/icons-react";
import React, { FC } from "react";
import { useSnapshot } from "valtio";

import { setMenuDisplay, state } from "@/lib/store/state";

const data = [
  {
    value: "list",
    label: (
      <Center>
        <IconList size="1rem" />
      </Center>
    ),
  },
  {
    value: "grid",
    label: (
      <Center>
        <IconGridDots size="1rem" />
      </Center>
    ),
  },
];

export const DisplaySelector: FC = () => {
  const snap = useSnapshot(state);

  return (
    <SegmentedControl
      data={data}
      value={snap.menuDisplay}
      onChange={setMenuDisplay}
    />
  );
};
