import {
  Badge,
  Button,
  Card,
  Center,
  Group,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { FC } from "react";

import { ManagementPageProps } from "../type/type";
import { FormModal } from "./FormModal";

export const ManagementBody: FC<ManagementPageProps> = (props) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <Text fw="bold">店内</Text>

      <Space h="1rem" />
      {!props.seats.length ? (
        <Center h="60vh">
          <Card withBorder maw={300}>
            <Stack>
              <Text fz="sm" fw="bold">
                店内
              </Text>

              <Text fz="sm">まずは座席の登録を行ってください。</Text>
              <Button size="xs" onClick={open}>
                座席の登録
              </Button>
            </Stack>
          </Card>
        </Center>
      ) : (
        <SimpleGrid cols={2}>
          {props.seats.map((seat) => (
            <Card key={seat.id} withBorder>
              <Group position="apart">
                <Text>
                  {`No.${seat.number}
              ${seat.name}
              (${seat.headcount}人席)`}
                </Text>

                <Button size="xs">会計</Button>
              </Group>

              <Badge>test</Badge>
              <Badge>test</Badge>
            </Card>
          ))}
        </SimpleGrid>
      )}

      <FormModal {...props} opened={opened} close={close} />
    </div>
  );
};
