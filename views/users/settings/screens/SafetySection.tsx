import { Button, PasswordInput, Switch } from "@mantine/core"
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";

interface IFormValues {
    password: string,
    receiveEmails: boolean
    confirmPassword: string
    receiveSessionInfo: boolean
    receiveNewLessonInfo: boolean
    receiveLessonSeriesUpdates: boolean
}

export const SafetySection = () => {

    const form = useForm<IFormValues>({
        initialValues: {
            password: '',
            confirmPassword: '',
            receiveEmails: false,
            receiveSessionInfo: false,
            receiveNewLessonInfo: false,
            receiveLessonSeriesUpdates: false,
        },
        validate: {
            confirmPassword: (value, values) => value !== values.password ? 'Нууц үгүүд таарахгүй байна' : null,
            password: (value) => value ? null : 'Нууц үг оруулна уу',
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
                <PasswordInput
                    label="Шинэ нууц үг"
                    placeholder="Шинэ нууц үг оруулна уу"
                    key={form.key('password')}
                    className="w-full"
                    {...form.getInputProps('password')}
                />

                <PasswordInput
                    mt="sm"
                    className="w-full"
                    label="Шинэ нууц үг (баталгаажуулах)"
                    key={form.key('confirmPassword')}
                    placeholder="Шинэ нууц үг (баталгаажуулах) оруулна уу"
                    {...form.getInputProps('confirmPassword')}
                />

                <div className="flex items-center justify-between w-full mt-4">
                    <div className="font-semibold">Мэдээллүүд имэйл-ээр авах</div>
                    <Switch {...form.getInputProps('receiveEmails')} />
                </div>

                <div className="flex items-center justify-between w-full">
                    <div className="font-semibold">Нэвтэрсэн мэдээлэл авах</div>
                    <Switch {...form.getInputProps('receiveSessionInfo')} />
                </div>

                <div className="flex items-center justify-between w-full">
                    <div className="font-semibold">Шинэ хичээлийн мэдээлэл авах</div>
                    <Switch {...form.getInputProps('receiveNewLessonInfo')} />
                </div>

                <div className="flex items-center justify-between w-full">
                    <div className="font-semibold">Шинэ цуврал хичээлийн мэдээлэл авах</div>
                    <Switch {...form.getInputProps('receiveLessonSeriesUpdates')} />
                </div>

                <Button onClick={handleSubmit} className="mt-4" fullWidth={useResponsiveButtonWidth()}>
                    Хадгалах
                </Button>
            </div>

            <div className="md:flex-1"></div>
        </div>
    )
}