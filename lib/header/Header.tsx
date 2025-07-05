'use client'

import { IconBell, IconCertificate, IconClockHour3, IconHelpCircle, IconHome, IconMenu2, IconSchool, IconSearch } from "@tabler/icons-react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Avatar, Button, Drawer, Flex, Input } from "@mantine/core";
import LayoutWrapper from "@/components/wrapper";
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from "next/navigation";
import Image from "next/image";

export function Header() {
  const { user } = useUser();

  const router = useRouter()
  const isSm = useMediaQuery('(max-width: 767px)');
  const [opened, { open, close }] = useDisclosure(false);

  const headTitleList = [
    {
      title: 'Бүх сургалт',
      path: user ? '/user/courses' : '/public/courses',
      icon: <IconSchool />
    },
    {
      title: 'Багц сургалт',
      path: user ? '/user/courses' : '/public/courses',
      icon: <IconBell />
    },
    {
      title: 'Захиалгат сургалт',
      path: user ? '/user/home' : '/public/home',
      icon: <IconClockHour3 />
    },
    {
      title: 'Үнэгүй сургалт',
      path: user ? '/user/courses' : '/public/courses',
      icon: <IconCertificate />

    },
    {
      title: 'Зөвлөх үйлчилгээ',
      path: user ? '/user/certificates' : '/public/certificates',
      icon: <IconHelpCircle />
    }
  ]

  return (
    <div className="sticky top-0 left-0 bg-common-grey py-4 z-[10000]">
      <LayoutWrapper>
        <Flex justify={'space-between'} align={'center'} gap={12}>
          <Input
            placeholder="Хайх"
            leftSection={<IconSearch />}
            classNames={{ input: '!border-none !bg-[#F4F7F5] !w-[120px]' }}
            className="md:hidden"
          />

          <Flex gap={16} align={'center'}>
            <Flex>
              <Image src='/images/logo.png' className="w-[80px]" width={1000} height={1000} alt='logo' />
            </Flex>

            {
              !isSm && headTitleList.map((item, index) => (
                <Flex key={index} className="mx-4 text-common-tdark hover:text-primary-600/80">
                  <a className="hidden md:flex md:text-sm lg:text-base" href={item.path}>{item.title}</a>
                </Flex>
              ))
            }
          </Flex>

          <Flex gap={16} align={'center'}>
            <Input
              placeholder="Хайх"
              leftSection={<IconSearch />}
              classNames={{ input: '!border-none !bg-[#F4F7F5] !w-[120px] lg:!w-[180px]' }}
              className="hidden md:flex"
            />

            {
              !user ? (
                <Button onClick={() => { router.push('/auth/login') }} px={isSm ? 8 : 16} className="!text-xs md:text-sm">
                  Нэвтрэх
                </Button>
              ) : (
                <Flex align={'center'} gap={8}>
                  <Avatar src={user.picture} size={32} className="cursor-pointer" onClick={() => router.push('/user')} />
                </Flex>
              )
            }

            <IconMenu2 className="md:!hidden " onClick={open} />
          </Flex>
        </Flex>
      </LayoutWrapper>



      <Drawer opened={opened} position={'right'} zIndex={1000000} onClose={close}>
        <Flex direction={'column'} gap={24}>
          <Flex gap={16} className="bg-primary-600/10 rounded-xl p-4">
            <IconHome className="text-primary-600" />
            <div>Нүүр хуудас</div>
          </Flex>
          {
            headTitleList.map(({ title, icon, path }, index) => {
              return (
                <Flex gap={16} key={index} onClick={() => router.push(path)} className="hover:bg-primary-600/10 rounded-xl p-4">
                  <div>{icon}</div>
                  <div>{title}</div>
                </Flex>
              )
            })
          }
        </Flex>
      </Drawer>
    </div>
  )
}
