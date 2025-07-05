import { useForm } from "@mantine/form";
import { Avatar, Button, Flex, Textarea, TextInput } from "@mantine/core"
import { IconBrandDiscord, IconBrandInstagram, IconBrandTwitter, IconPencil, IconWorld } from "@tabler/icons-react";
import { useFileDialog } from "@mantine/hooks";
import { useState } from "react";

interface IFormValues {
    userName: string,
    description: string,
    webLink?: string,
    instagramLink?: string,
    twitterLink?: string,
    discordLink?: string,
}

export const GeneralInfoSection = () => {
    const [avatarImg, setAvatarImg] = useState('')

    const onUploadImage = (files: FileList | null) => {
        if (!files) return

        Array.from(files).forEach((file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarImg(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        });
    }

    const fileDialog = useFileDialog({
        multiple: false,
        onChange: onUploadImage
    });

    const form = useForm<IFormValues>({
        initialValues: {
            userName: '',
            description: '',
            instagramLink: '',
            twitterLink: '',
            discordLink: '',
            webLink: '',
        },
        validate: {
        },
    });

    const handleSubmit = async () => {
        form.onSubmit((val) => {
            console.log(val, 'submit');
        })()
    };

    return (

        <div className="w-full h-full flex gap-8">
            <div className="flex-1 flex flex-col gap-6 items-start justify-start">
                <TextInput
                    label="Таны нэр"
                    className="w-full"
                    placeholder="Byambadalai Sumiya"
                    {...form.getInputProps('userName')}
                />

                <Textarea
                    label="Тайлбар"
                    placeholder="Өөрийнхөө талаар дэлгэрэнгүй тайлбарлана уу."
                    className="w-full"
                    rows={6}
                    {...form.getInputProps('description')}
                />

                <div className="text-lg">Сошиал хаяг</div>

                <Flex direction={'column'} gap={16} className="w-full">
                    <TextInput
                        className="w-full"
                        placeholder="Вебсайт"
                        leftSection={<IconWorld />}
                        {...form.getInputProps('webLink')}
                    />

                    <TextInput
                        className="w-full"
                        placeholder="Инстаграм"
                        leftSection={<IconBrandInstagram />}
                        {...form.getInputProps('instagramLink')}
                    />

                    <TextInput
                        className="w-full"
                        placeholder="Твиттер"
                        leftSection={<IconBrandTwitter />}
                        {...form.getInputProps('twitterLink')}
                    />

                    <TextInput
                        className="w-full"
                        placeholder="Дискорд"
                        leftSection={<IconBrandDiscord />}
                        {...form.getInputProps('discordLink')}
                    />
                </Flex>

                <Button onClick={handleSubmit}>
                    Хүсэлт илгээх
                </Button>
            </div>


            <div className="flex-1 flex justify-start items-center flex-col gap-8">
                <div className="text-xl font-bold">Профайл зураг</div>

                <div
                    onClick={fileDialog.open}
                    className="border-2 relative flex items-center justify-center border-dashed rounded-full border-primary-600 cursor-pointer"
                >
                    <Avatar className="w-[100px] h-[100px] !bg-white/10" w={200} src={avatarImg} h={200}> </Avatar>
                    <IconPencil className="absolute text-primary-600" size={30} />
                </div>
            </div>
        </div>
    )
}