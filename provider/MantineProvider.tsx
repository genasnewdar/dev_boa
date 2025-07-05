'use client';

import { theme } from '@/config/theme';
import { MantineProvider as MantineProv } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';

export function MantineProvider(props: { children: React.ReactNode }) {
	return (
		<MantineProv theme={theme}>
			<ModalsProvider>
				<Notifications />
				{props.children}
			</ModalsProvider>
		</MantineProv>
	);
}
