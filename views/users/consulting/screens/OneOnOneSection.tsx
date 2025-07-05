import { Button, NumberInput, Select } from "@mantine/core"
import { IconCalendarTime } from "@tabler/icons-react";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";

interface IFormValues {
    phoneNumber: number | null,
    location: string,
    date: Date | null,
}

export const OneOnOneSection = () => {

    const form = useForm<IFormValues>({
        initialValues: {
            phoneNumber: null,
            location: '',
            date: null,
        },
        validate: {
            phoneNumber: (value) => value && /^\d{8}$/.test(`${value}`) ? null : 'Утасны дугаар 8 оронтой байх ёстой',
            date: (value) => {
                if (!value) return 'Цаг сонгоно уу';
                if (value <= new Date()) return 'Өнгөрсөн огноо сонгож болохгүй';
                return null;
            },
            location: (value) => value ? null : 'Газар сонгоно уу',
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
                <Select
                    searchable
                    className="w-full"
                    label="Газар сонгох"
                    placeholder="Газар сонгоно уу"
                    data={teacherDummy}
                    {...form.getInputProps('location')}
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

                <Button onClick={handleSubmit} fullWidth={useResponsiveButtonWidth()}>
                    Хүсэлт илгээх
                </Button>
            </div>


            <div className="md:flex-1"> </div>
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