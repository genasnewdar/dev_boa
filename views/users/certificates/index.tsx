'use client'

import UserWrapper from "@/components/wrapper/UserWrapper"
import { NotificationDropdown } from '../../../components/notification';
import { useNotifications } from '../../../lib/notifications/useNotifications';
import { Button, Flex, Modal } from "@mantine/core"
import Image from "next/image"
import { useDisclosure } from "@mantine/hooks"
import { useEffect } from 'react';

export const UserCertificates = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { notifications, unreadCount, markAsRead, addNotification } = useNotifications();

  // Add a test notification when component mounts
  useEffect(() => {
    addNotification({
      title: 'Welcome to Certificates',
      message: 'You can view your certificates here',
    });
  }, []);

  return (
    <UserWrapper
      breadcrumbs={[
        { label: "Хичээлүүд", path: "/user/courses" },
        { label: "Гэрчилгээнүүд" }
      ]}
      headerIcons={
        <Flex gap={20} className="text-primary-600">
          <NotificationDropdown
            notifications={notifications}
            unreadCount={unreadCount}
            onNotificationClick={notification => markAsRead(notification.id)}
            className="cursor-pointer"
          />
        </Flex>
      }
    >
      <div className="w-full h-full grid md:grid-cols-3 xl:grid-cols-4 grid-cols-2 items-start gap-4">
        {Array(10).fill('').map((_, index) => (
          <div 
            key={index} 
            onClick={open} 
            className="w-full border border-black rounded-md md:rounded-[20px] overflow-hidden cursor-pointer"
          >
            <Image 
              src='/images/certificate.png' 
              className="w-full" 
              width={80} 
              height={80} 
              alt="logo" 
            />
          </div>
        ))}

        <Modal 
          opened={opened} 
          centered 
          size={'2xl'} 
          onClose={close} 
          withCloseButton={false}
        >
          <Image 
            src='/images/certificate.png' 
            className="w-full" 
            width={80} 
            height={80} 
            alt="logo" 
          />
        </Modal>
      </div>
    </UserWrapper>
  )
}