import {
  ActionIcon,
  Button,
  Group,
  Modal,
  NumberInput,
  Select,
  Space,
  Table,
  Tooltip,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconCopy, IconPlus, IconTrash } from "@tabler/icons-react";
import React, { FC, useState } from "react";
import { z } from "zod";

import { createSeats, getStoreIdByCurrentUser } from "@/lib/supabase/database";

import { ManagementPageProps } from "../type/type";

type Props = ManagementPageProps & {
  opened: boolean;
  close: () => void;
};

const initialSelectData = [
  "カウンター",
  "テーブル",
  "座敷",
  "ブース",
  "テラス",
  "ラウンジ",
];

const schema = z.object({
  seats: z
    .array(
      z.object({
        number: z
          .number({ invalid_type_error: "半角数字を入力してください" })
          .positive("1以上を入力してください"),
        name: z.string().min(1, "必ず入力してください。"),
        headcount: z
          .number({ invalid_type_error: "半角数字を入力してください" })
          .positive("1以上を入力してください"),
      })
    )
    .min(1),
});

export const FormModal: FC<Props> = (props) => {
  const [selectData, setSelectData] = useState(initialSelectData);
  const [isLoading, setIsloading] = useState(false);

  const form = useForm({
    initialValues: {
      seats: [{ number: 1, name: "", headcount: 1 }],
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setIsloading(true);
      const storeId = await getStoreIdByCurrentUser(props.user.user.id);

      const seatsData = values.seats.map((value) => ({
        ...value,
        storeId,
      }));
      await createSeats(seatsData);

      form.reset();
      props.close();
    } catch (error) {
      console.error(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div>
      <Modal
        classNames={{ body: "min-h-[300px]" }}
        opened={props.opened}
        onClose={props.close}
        title="座席登録"
        size="auto"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Table>
            <thead>
              <tr>
                <th>No.</th>
                <th>席名</th>
                <th>人数</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {form.values.seats.map((item, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>
                      <NumberInput
                        styles={{ input: { fontSize: "1rem" } }}
                        size="xs"
                        w="3rem"
                        hideControls
                        {...form.getInputProps(`seats.${index}.number`)}
                      />
                    </td>
                    <td>
                      <Select
                        data={selectData}
                        size="xs"
                        searchable
                        creatable
                        getCreateLabel={(query) => `+ その他 ${query}`}
                        onCreate={(query) => {
                          setSelectData((current) => [...current, query]);
                          return query;
                        }}
                        {...form.getInputProps(`seats.${index}.name`)}
                      />
                    </td>
                    <td>
                      <Group spacing={1}>
                        <NumberInput
                          styles={{ input: { fontSize: "1rem" } }}
                          size="xs"
                          w="3rem"
                          hideControls
                          {...form.getInputProps(`seats.${index}.headcount`)}
                        />
                      </Group>
                    </td>
                    <td>
                      <Group spacing="xs" noWrap>
                        <Tooltip label="複製コピー">
                          <ActionIcon
                            color="gray"
                            onClick={() => {
                              form.insertListItem("seats", {
                                ...form.values.seats[index],
                              });
                            }}
                          >
                            <IconCopy size={18} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="削除">
                          <ActionIcon
                            color="red"
                            onClick={() => form.removeListItem("seats", index)}
                          >
                            <IconTrash size={18} />
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </Table>
          <Group position="right">
            <Button
              size="xs"
              variant="subtle"
              leftIcon={<IconPlus size={16} />}
              onClick={() => {
                form.insertListItem("seats", {
                  number: form.values.seats.length + 1,
                  name: "",
                  headcount: "",
                });
              }}
            >
              追加
            </Button>
          </Group>

          <Space h="3rem" />

          <Group position="right">
            <Button
              size="xs"
              miw="5rem"
              type="submit"
              loading={isLoading}
              loaderPosition="center"
            >
              {isLoading ? "" : "Comfirm"}
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
};
