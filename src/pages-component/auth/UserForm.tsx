import {
  Button,
  Card,
  Divider,
  Group,
  Overlay,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useUser } from "@supabase/auth-helpers-react";
import { IconBuildingStore, IconPhone, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { z } from "zod";

import { supabase } from "@/lib/supabase/supabase";

type Props = {
  setActive: React.Dispatch<React.SetStateAction<number>>;
};

const scheme = z
  .object({
    firstName: z.string().min(1, "必ず入力してください。"),
    lastName: z.string().min(1, "必ず入力してください。"),
    storeName: z.string().min(1, "必ず入力してください。"),
    tel: z
      .string()
      .min(6, { message: "6桁以上" })
      .refine((data) => /^[0-9]+$/.test(data), "0~9の数字以外入力できません"),
  })

  .transform((data) => ({ ...data, name: data.firstName + data.lastName }));

export const UserForm: FC<Props> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const user = useUser();
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      storeName: "",
      tel: "",
    },
    validate: zodResolver(scheme),
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      if (!user) return;
      setIsLoading(true);
      const parsed = scheme.parse(values);

      const { data: storeData, error: storesError } = await supabase
        .from("stores")
        .insert({
          name: parsed.storeName,
          tel: parsed.tel,
        })
        .select();

      if (storesError) {
        throw storesError;
      }

      const { error: createUserError } = await supabase.from("users").insert({
        id: user.id,
        firstName: parsed.firstName,
        lastName: parsed.lastName,
        name: parsed.name,
        role: "admin",
        storeId: storeData[0].id,
      });

      if (createUserError) {
        throw createUserError;
      }

      await push("/store/management");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Card withBorder>
        <Stack spacing="xs">
          <Divider
            size="sm"
            label={
              <Group spacing="0.25rem">
                <IconUser size={16} />
                <Text fw="bold">ユーザー情報</Text>
              </Group>
            }
          />

          <Group grow>
            <TextInput
              label="First Name"
              placeholder="山田"
              withAsterisk
              {...form.getInputProps("firstName")}
            />
            <TextInput
              label="Last Name"
              placeholder="太郎"
              withAsterisk
              {...form.getInputProps("lastName")}
            />
          </Group>

          <Space h="2rem" />

          <Divider
            label={
              <Group spacing="0.25rem">
                <IconBuildingStore size={16} />
                <Text fw="bold">ストア情報</Text>
              </Group>
            }
            size="sm"
          />

          <TextInput
            label="Store Name"
            withAsterisk
            {...form.getInputProps("storeName")}
          />
          <TextInput
            label="TEL"
            placeholder="例）08012341234 ハイフンなし"
            type="number"
            icon={<IconPhone size={16} />}
            withAsterisk
            {...form.getInputProps("tel")}
          />

          <Space h={20} />
        </Stack>
      </Card>

      <Space h="2rem" />

      <Button
        fullWidth
        type="submit"
        loading={isLoading}
        loaderPosition="center"
      >
        {isLoading ? "" : "comfirm"}
      </Button>

      {isLoading && <Overlay opacity={0} />}
    </form>
  );
};
