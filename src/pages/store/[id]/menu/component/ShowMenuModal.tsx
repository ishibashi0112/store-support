import {
  ActionIcon,
  Badge,
  Card,
  CardSection,
  CloseButton,
  Group,
  Modal,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconStackPop } from "@tabler/icons-react";
import Image from "next/image";
import React, { FC } from "react";

import { getImageUrl } from "@/lib/supabase/storage";
import { calculatePriceWithTax } from "@/lib/utils/function";

import { Menu as MenuType } from "../type/type";

type Props = {
  menu: MenuType;
};

export const ShowMenuModal: FC<Props> = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <ActionIcon size="sm" radius="xl" onClick={open}>
        <IconStackPop size={18} />
      </ActionIcon>

      <Modal
        opened={opened}
        onClose={close}
        padding={0}
        withCloseButton={false}
      >
        <Card>
          <CardSection>
            {props.menu.imagePath ? (
              <div className="relative h-96 w-full ">
                <Image
                  className="object-contain"
                  src={getImageUrl(props.menu.imagePath)}
                  alt="menu-image"
                  fill
                />
              </div>
            ) : (
              <div className="flex h-[120px] w-full items-center justify-center bg-gray-100">
                <Text fw="bold">NO IMAGE</Text>
              </div>
            )}
          </CardSection>

          <Space h="0.25rem" />

          <Stack justify="space-between">
            <div>
              <Text weight={500}>{props.menu.name}</Text>

              <Text size="sm" color="dimmed">
                {props.menu.description}
              </Text>
            </div>

            <div>
              <Group spacing={2} position="right">
                <Badge>期間限定</Badge>
                <Badge>おすすめ</Badge>
              </Group>

              <Group position="right">
                <Text size="sm">{`¥ ${calculatePriceWithTax(
                  props.menu.price
                ).toLocaleString()}(税込) `}</Text>
              </Group>
            </div>
          </Stack>
        </Card>
        <CloseButton
          className="absolute top-2 right-2"
          size="md"
          radius="xl"
          onClick={close}
        />
      </Modal>
    </div>
  );
};
