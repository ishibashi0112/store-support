import {
  Button,
  Center,
  Container,
  Flex,
  Group,
  Overlay,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Balancer from "react-wrap-balancer";

import { TopLayout } from "@/pages-layout/top/topLayout";

import { NextPageWithLayout } from "./_app.page";

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <div className="relative h-[600px]">
        <div className="relative h-full">
          <Image
            src="/daan-evers-tKN1WXrzQ3s-unsplash.jpg"
            alt="background-image"
            fill
          />
          <Overlay opacity={0.7}>
            <Container size="sm">
              <Flex h={600} justify="center" align="center">
                <Stack>
                  <Center mx="auto">
                    <Balancer>
                      <Title order={1} color="white">
                        注文管理がラクラク！飲食店向けアプリ
                      </Title>
                    </Balancer>
                  </Center>

                  <Center maw={612} mx="auto">
                    <Balancer ratio={0.6}>
                      <Text fz="lg" align="center" color="white">
                        このアプリは、お客さんがスマホで注文を行い、お店側でもスマホで注文管理ができるアプリです。お客さんとお店側でリアルタイムに注文状況や料理の進行状況を共有することができます。
                      </Text>
                    </Balancer>
                  </Center>

                  <Space h={20} />

                  <Group position="center">
                    <Button w={200} component={Link} href="/auth/signUp">
                      今すぐ登録
                    </Button>
                  </Group>
                </Stack>
              </Flex>
            </Container>
          </Overlay>
        </div>
      </div>
    </div>
  );
};

Home.getLayout = TopLayout;

export default Home;
