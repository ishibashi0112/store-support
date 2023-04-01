import {
  Button,
  Card,
  Container,
  Group,
  Overlay,
  PasswordInput,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useRouter } from "next/router";
import React, { FC } from "react";

import { useUpdateInviteUserMutation } from "../lib/hook/useUpdateInviteUserMutation";
import {
  transformedInviteUserFormSchema,
  updateInviteUserFormSchema,
} from "../lib/zod/inviteFormSchema";

type Props = {
  storeName: string;
};

export const InviteFormBody: FC<Props> = (props) => {
  const { push } = useRouter();
  const { trigger, isMutating } = useUpdateInviteUserMutation();

  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
    validate: zodResolver(updateInviteUserFormSchema),
  });

  const handleSubmit = (values: typeof form.values) => {
    try {
      const parsedValues = transformedInviteUserFormSchema.parse(values);
      trigger(parsedValues);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Container size="xs">
        <Space h={100} />

        <Text fw="bold" align="center">
          <Text span>{props.storeName}</Text>
        </Text>

        <Space h={20} />

        <Card withBorder>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack spacing="xs">
              <PasswordInput
                label="Password"
                withAsterisk
                {...form.getInputProps("password")}
              />
              <PasswordInput
                label="Confirm Password"
                withAsterisk
                {...form.getInputProps("confirmPassword")}
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

              <Space h={20} />

              <Button
                type="submit"
                loading={isMutating}
                loaderPosition="center"
              >
                {isMutating ? "" : "登録"}
              </Button>
            </Stack>
          </form>
        </Card>
        <Space h="0.5rem" />
      </Container>

      {isMutating && <Overlay opacity={0} />}
    </div>
  );
};
