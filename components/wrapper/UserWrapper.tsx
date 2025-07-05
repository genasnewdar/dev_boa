import { Flex } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface UserWrapperProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    title?: string;
    headerIcons?: React.ReactNode;
}

const UserWrapper = ({ children, breadcrumbs, title, headerIcons }: UserWrapperProps) => {
    const router = useRouter();

    const handleBreadcrumbClick = (item: BreadcrumbItem, index: number) => {
        if (item.path && index < (breadcrumbs?.length ?? 0) - 1) {
            router.push(item.path);
        }
    };

    return (
        <Flex className="w-full h-screen overflow-auto p-4 md:p-8" direction={'column'} gap={40}>
            <Flex justify={'space-between'}>
                <div className="text-grey-400">
                    {breadcrumbs ? (
                        <Flex align="center" gap={8}>
                            {breadcrumbs.map((item, index) => (
                                <Flex 
                                    key={index} 
                                    align="center" 
                                    gap={8}
                                >
                                    {index > 0 && <IconChevronRight size={16} className="text-grey-400" />}
                                    <span 
                                        className={item.path && index < breadcrumbs.length - 1 ? "cursor-pointer hover:text-primary-600" : ""}
                                        onClick={() => handleBreadcrumbClick(item, index)}
                                    >
                                        {item.label}
                                    </span>
                                </Flex>
                            ))}
                        </Flex>
                    ) : title}
                </div>
                <div>{headerIcons}</div>
            </Flex>
            <Flex flex={1}>
                {children}
            </Flex>
        </Flex>
    )
}

export default UserWrapper;