import { Group, Header as MantineHeader, Text } from "@mantine/core";
import React, { FC } from "react";

export const Header: FC = () => {
  return (
    <MantineHeader height={50} px="xs">
      <Group h={50} align="center" position="apart">
        <Text>store support</Text>
      </Group>
    </MantineHeader>
  );
};
