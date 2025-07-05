import { Flex } from "@mantine/core"
import { IconEye } from "@tabler/icons-react"
import LayoutWrapper from "@/components/wrapper"
import Image from "next/image"

const cardData = [
    {
        title: 'Сургалт',
        description:
            'Empowering businesses to reach their full potential through innovative and strategic branding, marketing, and communication solutions.',
        iconColor: '#E33839',
    },
    {
        title: 'Зөвлөх үйлчилгээ',
        description:
            'To be a leading global agency in the media industry, known for delivering creative, impactful, and sustainable results that shape the future of brands.',
        iconColor: '#E33839',
    },
    {
        title: 'Төсөл төлөвлөгөө',
        description:
            'Shaping Brands, Building Futures: Empowering Businesses Towards Sustainable Success.',
        iconColor: '#E33839',
    },
];

export const InformationSection = () => {
    return (
        <div className="w-full bg-white relative">
            <div className="md:h-[400px] overflow-hidden">
                <Image
                    src={'/vectors/hero.svg'}
                    className="!w-full md:h-[400px] object-contain md:object-cover"
                    width={10000}
                    height={10000}
                    alt="cover"
                />
            </div>

            <LayoutWrapper >
                <Flex justify={'space-between'} className="absolute -bottom-[160px] md:-bottom-[100px] max-w-screen-xl pr-4 md:pr-6 gap-[10px] md:gap-[40px] lg:gap-[60px]">
                    {cardData.map((card, index) => (
                        <div
                            key={index}
                            className="shadow-soft-black bg-white rounded-2xl p-4 py-8 flex items-center flex-col gap-4 flex-1"
                        >
                            <div className="p-2 rounded-full bg-red-600/20 hidden md:flex">
                                <IconEye color={card.iconColor} />
                            </div>
                            <div className="text-[12px] md:text-xl font-bold">{card.title}</div>
                            <div className="text-[8px] md:text-sm text-center">{card.description}</div>
                        </div>
                    ))}
                </Flex>
            </LayoutWrapper>
        </div>
    )
}