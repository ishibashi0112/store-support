import { Badge, Card, Group, Text } from "@mantine/core";
import React, { FC } from "react";

import { calculatePriceWithTax } from "@/lib/utils/function";

import { Menu as MenuType } from "../type/type";
import { MenuSelectRadio } from "./MenuSelectRadio";
import { OperationMenu } from "./OperationMenu";
import { ShowMenuModal } from "./ShowMenuModal";

type Props = {
  menu: MenuType;
};

export const ListMenu: FC<Props> = (props) => {
  return (
    <Card sx={{ overflow: "visible" }} padding="xs" withBorder>
      <Group position="apart" noWrap>
        <Group>
          <MenuSelectRadio menuId={props.menu.id} />
          <Text>{props.menu.name}</Text>
        </Group>
        <Group>
          <ShowMenuModal {...props} />

          <OperationMenu {...props} />
        </Group>
      </Group>
      <Group spacing="xs" position="apart">
        <div>
          <Badge>期間限定</Badge>
          <Badge>おすすめ</Badge>
        </div>

        <Text size="sm">{`¥ ${calculatePriceWithTax(
          props.menu.price
        ).toLocaleString()}(税込) `}</Text>
      </Group>
    </Card>
  );
};
