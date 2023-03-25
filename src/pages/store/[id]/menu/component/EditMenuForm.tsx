import { Group, NumberInput, Text, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconCurrencyYen } from "@tabler/icons-react";
import React, { FC } from "react";
import { z } from "zod";

import { calculatePriceWithTax } from "@/lib/utils/function";
import { addMenuFormSchema } from "@/lib/zod/schema";

import { Menu as MenuType } from "../type/type";

type Props = {
  menu: MenuType;
};

const schema = z.object({});

export const EditMenuForm: FC<Props> = (props) => {
  const form = useForm({
    initialValues: {
      name: props.menu.name,
      price: props.menu.price,
      description: props.menu.description,
      image: null,
      menuCategoryId: props.menu.menuCategoryId,
    },
    validate: zodResolver(addMenuFormSchema),
  });
  return (
    <div>
      <form>
        <TextInput {...form.getInputProps("name")} />
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
      </form>
    </div>
  );
};
