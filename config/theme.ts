'use client';
import { createTheme } from '@mantine/core';

import twConfig from '../tailwind.config';
import { Tuple } from '@/types';


interface ITailwindColors {
	primary: Tuple<string, 10>;
	yellow: Tuple<string, 10>;
	grey: Tuple<string, 10>;
}

const getTailwindColors = () => {
	const colors = twConfig.theme?.extend?.colors;
	if (colors) {
		const { primary, yellow, grey } = colors as { primary: Record<string, string>, yellow: Record<string, string>, grey: Record<string, string> };
		if (typeof primary === 'object' && typeof yellow === 'object') {
			const colorValues: ITailwindColors = {
				primary: Object.values(primary) as Tuple<string, 10>,
				yellow: Object.values(yellow) as Tuple<string, 10>,
				grey: Object.values(grey) as Tuple<string, 10>
			};
			return colorValues;
		}
	}
	return null;
};

// design system config is here
export const theme = createTheme({
	primaryColor: 'primary',
	defaultRadius: 4,
	colors: {
		...getTailwindColors(),
	},
	components: {
		Button: {
			defaultProps: {
				color: 'primary',
			},
		},
	},
});
