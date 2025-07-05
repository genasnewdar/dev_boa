import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";

export const CertificatesSection = () => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <div className="w-full h-full grid md:grid-cols-3 xl:grid-cols-4 grid-cols-2 items-start gap-4">
            {
                Array(10).fill('').map((_, index) => {
                    return (
                        <div key={index} onClick={open} className="w-full border border-black rounded-md md:rounded-[20px] overflow-hidden cursor-pointer">
                            <Image src='/images/certificate.png' className="w-full" width={80} height={80} alt="logo" />
                        </div>
                    )
                })
            }

            <Modal opened={opened} centered size={'2xl'} onClose={close} withCloseButton={false}>
                <Image src='/images/certificate.png' className="w-full" width={80} height={80} alt="logo" />
            </Modal>
        </div>
    )
}