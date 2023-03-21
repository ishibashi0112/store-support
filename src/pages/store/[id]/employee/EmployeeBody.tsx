import { Avatar, Badge, Group, Select, Table, Text } from "@mantine/core";
import React, { FC } from "react";

interface UsersTableProps {
  data: {
    avatar: string;
    name: string;
    job: string;
    email: string;
    role: string;
  }[];
}

const rolesData = ["Manager", "Collaborator", "Contractor"];

const data = [
  { name: "test1", email: "test@test.com", role: "Manager" },
  { name: "test2", email: "test@test.com", role: "Collaborator" },
  { name: "test3", email: "test@test.com", role: "Collaborator" },
  { name: "test4", email: "test@test.com", role: "Collaborator" },
  { name: "test5", email: "test@test.com", role: "Collaborator" },
  { name: "test6", email: "test@test.com", role: "Collaborator" },
];

export const EmployeeBody: FC = () => {
  const rows = data.map((item) => (
    <tr key={item.name}>
      <td>
        <Group spacing="sm">
          <Avatar size={40} radius={40} />
          <div>
            <Text fz="sm" fw={500}>
              {item.name}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.email}
            </Text>
          </div>
        </Group>
      </td>

      <td>
        <Select data={rolesData} defaultValue={item.role} variant="unstyled" />
      </td>
      <td>{Math.floor(Math.random() * 6 + 5)} days ago</td>
      <td>
        {Math.random() > 0.5 ? (
          <Badge fullWidth>Active</Badge>
        ) : (
          <Badge color="gray" fullWidth>
            Disabled
          </Badge>
        )}
      </td>
    </tr>
  ));
  return (
    <div>
      <Text fw="bold">従業員リスト</Text>
      <Table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Role</th>
            <th>Last active</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};
