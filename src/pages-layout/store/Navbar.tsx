import { Navbar as MantineNavbar, NavLink } from "@mantine/core";
import {
  IconHome2,
  IconLogout,
  IconReceipt,
  IconSettings,
  IconToolsKitchen2,
  IconUserCircle,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";

import { signOut } from "@/lib/supabase/auth";

const NavData = [
  { label: "店内", icon: <IconHome2 size={18} />, path: "management" },
  { label: "注文", icon: <IconReceipt size={18} />, path: "orders" },
  { label: "従業員", icon: <IconUsers size={18} />, path: "employee" },
  { label: "メニュー", icon: <IconToolsKitchen2 size={18} />, path: "menu" },
];

export const Navbar: FC = () => {
  const { pathname, replace, query } = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      replace("/auth/signIn");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MantineNavbar className="justify-between" width={{ base: 250 }} p="xs">
      <MantineNavbar.Section>
        {NavData.map((data) => (
          <NavLink
            key={data.path}
            label={data.label}
            active={pathname === `/store/[id]/${data.path}`}
            component={Link}
            icon={data.icon}
            href={`/store/${query.id}/${data.path}`}
          />
        ))}
      </MantineNavbar.Section>

      <MantineNavbar.Section>
        <NavLink
          label="設定"
          icon={<IconSettings size={18} />}
          active={pathname === "/store/[id]/setting"}
          component={Link}
          href={`/store/${query.id}/setting`}
        />
        <NavLink label="石橋 佑貴" icon={<IconUserCircle size={18} />} />
        <NavLink
          label="ログアウト"
          icon={<IconLogout size={18} />}
          onClick={() => handleSignOut()}
        />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};
