import { ICourseData } from "@/types";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";

export const CollectiveScreen = ({ course }: { course: ICourseData | null }) => {
    const isSm = useMediaQuery('(max-width: 767px)');
    const [courseIndex, setCourseIndex] = useState<number>(0)
    const convertToEmbedCode = (videoUrl: string) => {
        const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = videoUrl?.match(regex);

        if (match && match[1]) {
            const videoId = match[1];
            return `https://www.youtube.com/embed/${videoId}`;
        } else {
            return 'Invalid YouTube URL';
        }
    }

    return (
        <div className="flex gap-10 w-full items-start max-h-560px overflow-auto">
            {
                course && (<iframe width="100%" height={isSm ? '260px' : "560px"} src={convertToEmbedCode(course?.lessons[courseIndex]?.videoUrl)} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>)
            }

            <div className="w-[40%] border border-black/30 rounded-lg h-full overflow-auto hidden">
                {
                    course?.lessons.map(({ title }, index) => {
                        return (
                            <div
                                className={`border-b p-4 border-black/30 cursor-pointer flex items-center gap-4 ${courseIndex === index && 'bg-primary-600/10'}`}
                                onClick={() => setCourseIndex(index)}
                                key={index}
                            >
                                <h3>{`${(index + 1).toString().padStart(2, '0')}`}: {title}</h3>
                                <div className="flex-1 flex justify-end">
                                    <div className="border border-primary-600 text-primary-600 rounded-[6px] p-1">
                                        <IconChevronDown size={14} />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}