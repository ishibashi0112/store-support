import { Alert, Container, Group, Space, Tabs } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import React, { FC } from "react";

import { useMeuns } from "@/lib/hook/useMenus";

import { CategoriesWithMenus } from "./CategoriesWithMenus";
import { DisplaySelector } from "./DisplaySelector";
import { MenuHeader } from "./MenuHeader";

const tabsListData = [
  {
    value: "all",
    text: "All",
  },
  {
    value: "recommend",
    text: "おすすめ",
  },
  {
    value: "settings",
    text: "朝食",
  },
  {
    value: "settings",
    text: "ランチ",
  },
  {
    value: "settings",
    text: "ディナー",
  },
];

export const MenuBody: FC = () => {
  const { menus } = useMeuns();

  if (!menus) {
    return <Alert>データの取得に失敗しました。</Alert>;
  }

  return (
    <Container>
      <MenuHeader />

      <Space h="1rem" />

      {!menus.length ? (
        <Alert icon={<IconAlertCircle size={18} />}>
          メニューがまだありません。
        </Alert>
      ) : (
        <Tabs variant="pills" defaultValue="all">
          <Group position="apart">
            <Tabs.List>
              {tabsListData.map((data) => (
                <Tabs.Tab key={data.text} value={data.value}>
                  {data.text}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            <DisplaySelector />
          </Group>

          <Tabs.Panel value="all" pt="xs">
            <CategoriesWithMenus />
          </Tabs.Panel>

          <Tabs.Panel value="recommend" pt="xs">
            Messages tab content
          </Tabs.Panel>

          <Tabs.Panel value="settings" pt="xs">
            Settings tab content
          </Tabs.Panel>
        </Tabs>
      )}
    </Container>
  );
};
