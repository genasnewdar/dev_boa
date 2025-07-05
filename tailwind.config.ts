import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./lib/**/*.{js,ts,jsx,tsx,mdx}',
		'./views/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@tremor/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			colors: {
				primary: {
					100: '#F3E2E2',
					200: '#F1CFCF',
					300: '#EA8484',
					400: '#E97172',
					500: '#E75E5F',
					600: '#E33839',
					700: '#DF1A1D',
					800: '#BC1719',
					900: '#991315',
				},
				yellow: {
					100: '#F6EEDC',
					200: '#FAD47A',
					300: '#F9C34D',
					400: '#F8B12F',
					500: '#F7A100',
					600: '#FFB400',
					700: '#CC8F00',
					800: '#996B00',
					900: '#664700',
				},
				grey: {
					100: '#ecedee',
					200: '#d0d1d4',
					300: '#ababab',
					400: '#737780',
					500: '#444955',
					600: '#333740',
					700: '#22252b',
					800: '#000000',
				},
				common: {
					grey: '#F9FAFB',
					green: '#2ecc71',
					tdark: '#1D1D3C',
					tgrey: '#737780'
				},
				tremor: {
					brand: {
						faint: "#eff6ff",
						muted: "#bfdbfe",
						subtle: "#60a5fa",
						DEFAULT: "#3b82f6",
						emphasis: "#1d4ed8",
						inverted: "#ffffff",
					},
					background: {
						muted: "#f9fafb",
						subtle: "#f3f4f6",
						DEFAULT: "#ffffff",
						emphasis: "#374151",
					},
					border: {
						DEFAULT: "#e5e7eb",
					},
					ring: {
						DEFAULT: "#e5e7eb",
					},
					content: {
						subtle: "#9ca3af",
						DEFAULT: "#6b7280",
						emphasis: "#374151",
						strong: "#111827",
						inverted: "#ffffff",
					},
				},
			},
			boxShadow: {
				'soft-black': '0px 0px 20px 0px #0000001A',
				'tremor-input': "0 1px 2px 0 rgb(0 0 0 / 0.05)",
				'tremor-card': "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
				'tremor-dropdown': "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
			},
			backgroundImage: {
				'custom-gradient': 'linear-gradient(180deg, rgba(227, 56, 57, 0.15) 0%, rgba(227, 56, 57, 0) 100%)',
			},
			borderRadius: {
				'tremor-small': "0.375rem",
				'tremor-default': "0.5rem",
				'tremor-full': "9999px",
			},
			fontSize: {
				'tremor-label': ["0.75rem"],
				'tremor-default': ["0.875rem", { lineHeight: "1.25rem" }],
				'tremor-title': ["1.125rem", { lineHeight: "1.75rem" }],
				'tremor-metric': ["1.875rem", { lineHeight: "2.25rem" }],
			},
		},
	},
	plugins: [],
	// corePlugins: {
	// 	preflight:false,
	// },
};
export default config;
