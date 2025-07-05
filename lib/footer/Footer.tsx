import { IconBrandFacebook, IconBrandInstagram } from "@tabler/icons-react";
import LayoutWrapper from "@/components/wrapper";
import { Divider, Flex } from "@mantine/core";
import Image from "next/image";

export function Footer() {

  return (
    <LayoutWrapper>
      <Flex direction={'column'} className="py-10">
        <Flex justify={'space-between'} gap={12}>
          <Flex direction={'column'} gap={16} flex={1}>
            <Image src='/images/logo.png' className="w-[80px]" width={80} height={80} alt='logo' />
          </Flex>

          <Flex direction={'column'} gap={24} flex={1}>
            <div className="text-xs md:text-sm cursor-pointer">Байгууллагын тухай</div>
            <div className="text-xs md:text-sm cursor-pointer">Холбоо барих</div>
          </Flex>

          <Flex direction={'column'} gap={24} >
            <div className="text-xs md:text-sm cursor-pointer">Санал хүсэлт</div>
            <div className="text-xs md:text-sm cursor-pointer">Оюуны өмч</div>
          </Flex>
        </Flex>

        <Divider className="my-14" />

        <Flex justify={'space-between'} className="w-full">
          <Flex align={'center'} gap={24}>
            <div className=" text-xs md:text-sm font-light">© 2025. MONGOLIA</div>
            <div className="font-semibold text-xs md:text-base">Үйлчилгээний нөхцөл</div>
          </Flex>
          <Flex align={'center'} gap={24}>
            <a href="https://www.facebook.com/projectmasteroyunka" target="_blank" ><IconBrandFacebook /></a>
            <a href="https://www.instagram.com/oyunka_project_master/" target="_blank"><IconBrandInstagram /></a>
          </Flex>
        </Flex>
      </Flex>
    </LayoutWrapper>
  )
}
