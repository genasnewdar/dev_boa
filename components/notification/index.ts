import type { MantineColor } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

export const showMessage = (message: string, color: MantineColor = 'red', description?: string) => {
	showNotification({
		title: message,
		message: description ?? null,
		color,
		autoClose: 3000,
	});
};

export const showCustomMessage = ({
	title,
	message,
	color = 'red',
	autoClose = 5000,
	icon,
	root = 'items-start',
}: {
	title: string;
	message?: string | React.ReactNode;
	color?: MantineColor;
	autoClose?: number;
	icon?: React.ReactNode;
	root?: string;
}) => {
	showNotification({
		title: title,
		message: message ?? null,
		color,
		autoClose,
		icon,
		classNames: { icon: '!bg-white', root: `flex ${root}` },
	});
};

export * from './NotificationDropdown';
