import { Button, Flex, NumberInput, Select } from "@mantine/core"
import { IconCalendarTime } from "@tabler/icons-react";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import Image from "next/image";
import { useMediaQuery } from "@mantine/hooks";

interface IFormValues {
    phoneNumber: number | null,
    teacherName: string,
    date: Date | null,
}

export const OnlineSection = () => {

    const form = useForm<IFormValues>({
        initialValues: {
            phoneNumber: null,
            date: null,
            teacherName: '',
        },
        validate: {
            phoneNumber: (value) => value && /^\d{8}$/.test(`${value}`) ? null : 'Утасны дугаар 8 оронтой байх ёстой',
            date: (value) => {
                if (!value) return 'Цаг сонгоно уу';
                if (value <= new Date()) return 'Өнгөрсөн огноо сонгож болохгүй';
                return null;
            },
            teacherName: (value) => value ? null : 'Багшийн нэр сонгоно уу',
        },
    });

    const handleSubmit = async () => {
        form.onSubmit((val) => {
            console.log(val, 'submit');
        })()
    };

    const useResponsiveButtonWidth = () => {
        const isSm = useMediaQuery('(max-width: 767px)');
        if (isSm) return true;

        return false;
    }

    return (

        <div className="w-full h-full flex md:gap-8">
            <div className="flex-1 flex flex-col gap-6 items-start justify-start">
                <div className="text-2xl font-semibold">
                    Цаг сонгох
                </div>

                <Select
                    searchable
                    className="w-full"
                    label="Багшийн нэр"
                    placeholder="Багшийн нэр сонгоно уу"
                    data={teacherDummy}
                    {...form.getInputProps('teacherName')}
                />

                <DateTimePicker
                    label="Цаг сонгох"
                    leftSection={<IconCalendarTime size={18} />}
                    className="w-full"
                    placeholder="Цаг сонгоно уу"
                    {...form.getInputProps('date')}
                />

                <NumberInput
                    hideControls
                    className="w-full"
                    placeholder="Утасны дугаар оруулна уу"
                    label='Утасны дугаар'
                    allowDecimal={false}
                    allowNegative={false}
                    {...form.getInputProps('phoneNumber')}
                />

                <div className="flex flex-col gap-2">
                    <div className="text-sm">Төлбөр төлөх (50’000₮)</div>
                    <Flex gap={16}>
                        <div className="p-2 border rounded-[10px] bg-white cursor-pointer">
                            <Image src='/vectors/khan-bank.svg' className="w-[40px]" width={80} height={80} alt='khan-bank' />
                        </div>
                        <div className="p-2 border rounded-[10px] bg-white cursor-pointer">
                            <Image src='/vectors/golomt-bank.svg' className="w-[40px]" width={80} height={80} alt='khan-bank' />
                        </div>
                    </Flex>
                </div>

                <Button onClick={handleSubmit} fullWidth={useResponsiveButtonWidth()}>
                    Хүсэлт илгээх
                </Button>
            </div>


            <div className="md:flex-1"></div>
        </div>
    )
}

const teacherDummy = [
    {
        value: 'darkhan',
        label: 'Darkhan'
    },
    {
        value: 'ulaanbaatar',
        label: 'Ulaanbaatar'
    },
    {
        value: 'selenge',
        label: 'Selenge'
    },
    {
        value: 'uvs',
        label: 'Uvs'
    },
]