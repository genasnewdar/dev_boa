import { ICourseLesson } from "@/types";

export const SingleCourseScreen = ({ course }: { course: ICourseLesson | null }) => {

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
        <div className="flex gap-10 w-full items-start">
            {
                course && (<iframe width="100%" height="560px" src={convertToEmbedCode(course?.videoUrl)} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>)
            }
        </div>
    )
}