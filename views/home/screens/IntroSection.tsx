"use client";

import { Button, Flex } from "@mantine/core";
import LayoutWrapper from "@/components/wrapper";
import { IconArrowRight, IconSchool, IconStar } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const IntroSection = () => {
  const router = useRouter();

  return (
    <LayoutWrapper>
      <div className="py-[10px] md:pb-[200px] pb-[100px] flex flex-col md:gap-[140px] gap-[100px] relative">
        <Image
          src="/vectors/left-vector.svg"
          className="hidden md:flex absolute -top-[100px] left-[300px] !w-[360px] !h-[460px]"
          width={80}
          height={80}
          alt="vector"
        />
        <Image
          src="/vectors/left-vector.svg"
          className="md:!hidden absolute -top-[30px] left-[190px] !w-[200px] !h-[300px]"
          width={80}
          height={80}
          alt="vector"
        />
        <Image
          src="/vectors/right-vector.svg"
          className="hidden md:block absolute top-[120px] left-[600px] !w-[460px] !h-[560px]"
          width={80}
          height={80}
          alt="vector"
        />
        <Image
          src="/vectors/rectangle.svg"
          className="hidden md:block absolute top-[280px] left-[160px] !w-[30px] !h-[30px]"
          width={80}
          height={80}
          alt="vector"
        />
        <Image
          src="/vectors/rectangle.svg"
          className="hidden md:block absolute top-[380px] transform rotate-45 left-[640px] !w-[40px] !h-[40px]"
          width={80}
          height={80}
          alt="vector"
        />

        <Flex gap={30}>
          <Flex
            flex={1}
            justify={"end"}
            direction={"column"}
            className="gap-[30px] md:gap-[100px]"
          >
            <Flex justify={"space-between"} align={"center"}>
              <div className="font-extrabold text-common-tdark text-[24px] md:text-[30px] lg:text-[60px] lg:leading-[70px]">
                О-Мастерт <br /> Тавтай морил
              </div>
              <Image
                src="/vectors/intro-users.svg"
                className="w-[42%] md:!hidden z-[100]"
                width={80}
                height={80}
                alt="logo"
              />
            </Flex>

            <Flex direction={"column"} gap={60} align={"start"}>
              <div className="flex items-center gap-4">
                <div className="bg-primary-600/20 p-3 rounded-2xl">
                  <IconStar color="#E33839" />
                </div>
                <Flex direction={"column"} gap={12}>
                  <div className="font-medium text-common-tdark">
                    Зөвлөх үйлчилгээ
                  </div>
                  <div className="text-common-tgrey">
                    Энд дарж зөвлөх үйлчилгээний цагаа захиалаарай{" "}
                  </div>
                </Flex>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-yellow-600/20 p-3 rounded-2xl">
                  <IconSchool color="#FFB400" />
                </div>
                <Flex direction={"column"} gap={12}>
                  <div className="font-medium text-common-tdark">Сургалт</div>
                  <div className="text-common-tgrey">
                    Энд дарж өөрт хэрэгтэй сургалтаа үзнэ үү 
                  </div>
                </Flex>
              </div>
              <Button h={44} onClick={() => router.push("/user/consulting")}>
                <div className="mr-2">Зөвлөхөөс цаг захиалах </div>
                <IconArrowRight size={16} />
              </Button>
            </Flex>
          </Flex>
          <div className="hidden items-start w-[50%] md:flex">
            <Image
              src="/vectors/intro-users.svg"
              className="w-full z-[100]"
              width={80}
              height={80}
              alt="logo"
            />
          </div>
        </Flex>

        <Flex
          align={"center"}
          direction={"column"}
          gap={24}
          className="w-full md:w-[80%] m-auto bg-custom-gradient py-10 px-6 rounded-[20px]"
        >
          <div className="font-semibold text-common-tdark text-center text-xl md:text-3xl">
            Бидэнтэй хамтран ажилладаг <br /> байгууллагууд
          </div>
          <div className="text-common-tgrey text-sm md:text-base">
            Бид 700+ төсөл 1000+ зөвлөгөө 30+ аж ахуй нэгжтэй хамтран ажилласан
            туршлагатай
          </div>
          <div className="w-full md:w-[60%] flex flex-col gap-4 md:gap-6">
            <div className="grid grid-cols-5 gap-4 md:gap-6 justify-items-center">
              <Image
                src="/logo/1-removebg-preview.svg"
                className="w-[60px] md:w-[80px]"
                width={80}
                height={80}
                alt="logo"
              />
              <Image
                src="/logo/2-removebg-preview.svg"
                className="w-[60px] md:w-[80px]"
                width={80}
                height={80}
                alt="logo"
              />
              <Image
                src="/logo/3-removebg-preview.svg"
                className="w-[60px] md:w-[80px]"
                width={80}
                height={80}
                alt="logo"
              />
              <Image
                src="/logo/4-removebg-preview.svg"
                className="w-[60px] md:w-[80px]"
                width={80}
                height={80}
                alt="logo"
              />
              <Image
                src="/logo/5-removebg-preview.svg"
                className="w-[60px] md:w-[80px]"
                width={80}
                height={80}
                alt="logo"
              />
            </div>

            <div className="flex justify-center gap-4 md:gap-6">
              <Image
                src="/logo/6-removebg-preview.svg"
                className="w-[60px] md:w-[80px]"
                width={80}
                height={80}
                alt="logo"
              />
              <Image
                src="/logo/logo-removebg-preview.svg"
                className="w-[60px] md:w-[80px]"
                width={80}
                height={80}
                alt="logo"
              />
              <Image
                src="/logo/8-removebg-preview.svg"
                className="w-[60px] md:w-[80px]"
                width={80}
                height={80}
                alt="logo"
              />
              <Image
                src="/logo/9-removebg-preview.svg"
                className="w-[60px] md:w-[80px]"
                width={80}
                height={80}
                alt="logo"
              />
            </div>
          </div>
        </Flex>
      </div>
    </LayoutWrapper>
  );
};
