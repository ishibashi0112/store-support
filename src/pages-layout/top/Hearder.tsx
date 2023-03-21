import { Button, Group, Header as MantineHeader, Text } from "@mantine/core";
import React, { FC } from "react";

export const Header: FC = () => {
  return (
    <MantineHeader height={50} px="sm">
      <Group h={50} align="center" position="apart">
        <Text fz="lg" fw="bold">
          Store Support
        </Text>
        <Button variant="subtle">ログイン</Button>
      </Group>
    </MantineHeader>
  );
};
