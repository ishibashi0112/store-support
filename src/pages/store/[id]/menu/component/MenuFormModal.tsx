import {
  Button,
  FileInput,
  Group,
  Image,
  Modal,
  NumberInput,
  Select,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconCurrencyYen, IconPhoto } from "@tabler/icons-react";
import { useRouter } from "next/router";
import React, { FC, useMemo, useState } from "react";
import { z } from "zod";

import { useCategories } from "@/lib/hook/useCategories";
import { createMenus } from "@/lib/supabase/database";
import { imageUpload } from "@/lib/supabase/storage";
import { calculatePriceWithTax } from "@/lib/utils/function";

const schema = z.object({
  name: z.string().min(1, "必ず入力してください。"),
  price: z
    .number({ invalid_type_error: "半角数字を入力してください" })
    .positive("1以上を入力してください"),

  description: z.string(),
  image: z.custom<File>().nullable(),
  menuCategoryId: z.string().min(1, "必ず入力してください。"),
});

export const MenuFormModal: FC = () => {
  const { query } = useRouter();
  const [isLoading, setIsloading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const { categories } = useCategories();

  const selectData = categories
    ? categories.map((category) => ({
        label: category.name,
        value: category.id,
      }))
    : [];

  const form = useForm<z.infer<typeof schema>>({
    initialValues: {
      name: "",
      price: 0,
      description: "",
      image: null,
      menuCategoryId: "",
    },
    validate: zodResolver(schema),
  });

  const preview = useMemo(() => {
    if (!form.values.image) return <></>;

    const imageUrl = URL.createObjectURL(form.values.image);
    return (
      <Image
        src={imageUrl}
        width={120}
        height={120}
        fit="contain"
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  }, [form.values.image]);

  const handleSubmit = async (values: typeof form.values) => {
    if (!query.id) return;
    try {
      setIsloading(true);

      const storeId = query.id as string;

      const filePath = values.image ? await imageUpload(values.image) : null;
      const { image, ...newValue } = values;

      const menusData = { ...newValue, storeId, imagePath: filePath };
      await createMenus(menusData);

      form.reset();
      close();
      alert("メニューを作成しました。");
    } catch (error) {
      console.error(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div>
      <Button size="xs" onClick={open}>
        メニュー追加
      </Button>

      <Modal
        classNames={{ body: "min-h-[300px]" }}
        opened={opened}
        onClose={close}
        title="メニュー登録"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack spacing="xs">
            <TextInput
              label="メニュー名"
              size="xs"
              withAsterisk
              {...form.getInputProps("name")}
            />
            <div>
              <NumberInput
                label="価格"
                icon={<IconCurrencyYen size={18} />}
                size="xs"
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                formatter={(value) =>
                  !Number.isNaN(parseFloat(value))
                    ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                    : ""
                }
                withAsterisk
                hideControls
                {...form.getInputProps("price")}
              />
              {form.values.price ? (
                <Group position="right">
                  <Text>{`税抜¥ ${form.values.price.toLocaleString()} (税込¥ ${calculatePriceWithTax(
                    form.values.price
                  ).toLocaleString()})`}</Text>
                </Group>
              ) : null}
            </div>

            <TextInput
              label="説明"
              size="xs"
              {...form.getInputProps("description")}
            />

            <Select
              data={selectData}
              label="カテゴリー"
              placeholder="カテゴリーを選択してください"
              size="xs"
              {...form.getInputProps("menuCategoryId")}
            />

            <FileInput
              label="イメージ"
              placeholder="イメージ画像を選択してください"
              size="xs"
              clearable
              accept="image/*"
              icon={<IconPhoto size={18} />}
              {...form.getInputProps("image")}
            />

            {preview}

            <Space h="1rem" />

            <Button
              size="xs"
              type="submit"
              loading={isLoading}
              loaderPosition="center"
            >
              {isLoading ? "" : "Comfirm"}
            </Button>
          </Stack>
        </form>
      </Modal>
    </div>
  );
};
