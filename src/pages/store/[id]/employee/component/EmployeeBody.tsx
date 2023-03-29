import {
  Avatar,
  Badge,
  Container,
  Group,
  Select,
  Space,
  Table,
  Text,
} from "@mantine/core";
import React, { FC } from "react";

import { useUsers } from "@/lib/hook/useUsers";

import { EmployeeHeader } from "./EmployeeHeader";

interface UsersTableProps {
  data: {
    avatar: string;
    name: string;
    job: string;
    email: string;
    role: string;
  }[];
}

const rolesData = ["admin", "Collaborator", "Contractor"];

export const EmployeeBody: FC = () => {
  const { users } = useUsers();

  if (!users) {
    return <></>;
  }

  return (
    <Container>
      <EmployeeHeader />

      <Space h="1rem" />

      <Table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Role</th>
            <th>Last active</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Group spacing="sm">
                  <Avatar size={40} radius={40} />
                  <Text fz="sm" fw={500}>
                    {user.name}
                  </Text>
                </Group>
              </td>

              <td>
                <Select
                  data={rolesData}
                  defaultValue={user.role}
                  variant="unstyled"
                />
              </td>
              <td>5 days ago</td>
              <td>
                <Badge color="gray" fullWidth>
                  Disabled
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
