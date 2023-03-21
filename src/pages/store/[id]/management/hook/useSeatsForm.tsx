import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { z } from "zod";

import { createSeats } from "@/lib/supabase/database";

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

export const useSeatsForm = () => {
  const { query } = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectData, setSelectData] = useState(initialSelectData);
  const [isLoading, setIsloading] = useState(false);

  const form = useForm({
    initialValues: {
      seats: [{ number: 1, name: "", headcount: 1 }],
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values: typeof form.values) => {
    if (!query.id) return;

    try {
      setIsloading(true);
      const storeId = query.id as string;

      const layoutsData = values.seats.map((value) => ({
        ...value,
        storeId,
      }));
      await createSeats(layoutsData);

      form.reset();
      close();
    } catch (error) {
      console.error(error);
    } finally {
      setIsloading(false);
    }
  };

  return {};
};
