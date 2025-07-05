import { useMediaQuery } from "@mantine/hooks";

export const useResponsiveSlideSize = () => {
    const isSm = useMediaQuery('(max-width: 767px)');
    const isMd = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
    const isLg = useMediaQuery('(min-width: 1024px) and (max-width: 1279px)');
    const isXl = useMediaQuery('(min-width: 1280px) and (max-width: 1535px)');
    const is2xl = useMediaQuery('(min-width: 1536px)');

    if (isSm) return '100%';
    if (isMd) return '50%';
    if (isLg) return '33.333%';
    if (isXl) return '25%';
    if (is2xl) return '20%';

    return '100%';
}