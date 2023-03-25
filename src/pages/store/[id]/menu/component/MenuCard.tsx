import {
  ActionIcon,
  Badge,
  Card,
  Group,
  Menu as MantineMenu,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { IconDotsVertical, IconEdit } from "@tabler/icons-react";
import Image from "next/image";
import React, { FC } from "react";

import { getImageUrl } from "@/lib/supabase/storage";
import { calculatePriceWithTax } from "@/lib/utils/function";

import { Menu } from "../type/type";
import { MenuSelectRadio } from "./MenuSelectRadio";

type Props = {
  menu: Menu;
};

export const MenuCard: FC<Props> = (props) => {
  return (
    <Card
      key={props.menu.id}
      sx={{ position: "relative" }}
      w={200}
      padding="sm"
      radius="md"
      withBorder
    >
      <Card.Section>
        {props.menu.imagePath ? (
          <Image
            src={getImageUrl(props.menu.imagePath)}
            alt="Norway"
            width={200}
            height={120}
          />
        ) : (
          <div className="flex h-[120px] w-full items-center justify-center bg-gray-100">
            <Text fw="bold">NO IMAGE</Text>
          </div>
        )}
      </Card.Section>

      <Space h="0.25rem" />

      <Stack justify="space-between">
        <div>
          <Text weight={500}>{props.menu.name}</Text>

          <Text size="sm" color="dimmed" lineClamp={2}>
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

      <MenuSelectRadio
        className="absolute top-2 left-2"
        menuId={props.menu.id}
      />

      <MantineMenu>
        <MantineMenu.Target>
          <ActionIcon
            className="absolute top-2 right-2"
            size="sm"
            color="blue"
            radius="xl"
            variant="filled"
          >
            <IconDotsVertical size={18} />
          </ActionIcon>
        </MantineMenu.Target>
        <MantineMenu.Dropdown>
          <MantineMenu.Item icon={<IconEdit size={16} />}>
            編集
          </MantineMenu.Item>
        </MantineMenu.Dropdown>
      </MantineMenu>
    </Card>
  );
};
