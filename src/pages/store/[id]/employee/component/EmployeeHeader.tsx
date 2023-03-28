import { Group, Text } from "@mantine/core";
import React, { FC } from "react";

import { AddEmployeeModalButton } from "./AddEmployeeModalButton";

export const EmployeeHeader: FC = () => {
  return (
    <div>
      <Group position="apart">
        <Text fw="bold">従業員リスト</Text>

        <AddEmployeeModalButton />
      </Group>
    </div>
  );
};
