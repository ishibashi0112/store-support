import { Alert, Space, Tabs } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import React, { FC } from "react";

import { useMeuns } from "@/lib/hook/useMenus";

import { MenuHeader } from "./MenuHeader";
import { Menus } from "./Menus";

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
  const { menus, isLoading } = useMeuns();

  // if (isLoading) {
  //   return (
  //     <Group position="center">
  //       <Loader />
  //     </Group>
  //   );
  // }

  if (!menus) {
    return <Alert>データの取得に失敗しました。</Alert>;
  }

  return (
    <div>
      <MenuHeader />

      <Space h="1rem" />

      {!menus.length ? (
        <Alert icon={<IconAlertCircle size={18} />}>
          メニューがまだありません。
        </Alert>
      ) : (
        <Tabs variant="pills" defaultValue="all">
          <Tabs.List>
            {tabsListData.map((data) => (
              <Tabs.Tab key={data.text} value={data.value}>
                {data.text}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Tabs.Panel value="all" pt="xs">
            <Menus />
          </Tabs.Panel>

          <Tabs.Panel value="recommend" pt="xs">
            Messages tab content
          </Tabs.Panel>

          <Tabs.Panel value="settings" pt="xs">
            Settings tab content
          </Tabs.Panel>
        </Tabs>
      )}
    </div>
  );
};
