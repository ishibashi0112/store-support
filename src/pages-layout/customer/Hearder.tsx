import { Group, Header as MantineHeader, Text } from "@mantine/core";
import React, { FC } from "react";

export const Header: FC = () => {
  return (
    <MantineHeader height={50}>
      <Group h={50} align="center">
        <Text>customer</Text>
      </Group>
    </MantineHeader>
  );
};
