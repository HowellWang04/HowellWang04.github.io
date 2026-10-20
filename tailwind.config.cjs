/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				// Body text uses the default "sans" family; headings use font-heading. Both are defined in global.css.
				sans: ["var(--font-body)"],
				heading: ["var(--font-heading)"],
			},
		},
	},
	plugins: [require("@tailwindcss/typography"),require("daisyui")],
	daisyui: {
		themes: [
			{
				"portfolio-light": {
					"color-scheme": "light",
					primary: "#8B4935",
					"primary-content": "#FFFFFF",
					secondary: "#E9D3C6",
					"secondary-content": "#6E3826",
					accent: "#9C7448",
					"accent-content": "#FFFFFF",
					neutral: "#2E2A27",
					"neutral-content": "#FBF9F5",
					"base-100": "#FCFAF6",
					"base-200": "#F0EBE2",
					"base-300": "#E4DCCF",
					"base-content": "#2E2A27",
					info: "#DCE2DD",
					"info-content": "#3D4B44",
					success: "#E1E4D2",
					"success-content": "#4A5434",
					warning: "#EEDCC2",
					"warning-content": "#6B4A22",
					error: "#B5534A",
					"error-content": "#FFFFFF",
				},
			},
			{
				dark: {
					"color-scheme": "dark",
					primary: "#D5966F",
					"primary-content": "#211B18",
					secondary: "#C7795D",
					"secondary-content": "#211B18",
					accent: "#D1B47A",
					"accent-content": "#211B18",
					neutral: "#30312E",
					"neutral-content": "#EEE8DB",
					"base-100": "#242624",
					"base-200": "#20211F",
					"base-300": "#3A3C38",
					"base-content": "#EEE8DB",
					info: "#8CAAB1",
					"info-content": "#172328",
					success: "#A3AE81",
					"success-content": "#1D2518",
					warning: "#D1A675",
					"warning-content": "#211B18",
					error: "#C65F5F",
					"error-content": "#FFFFFF",
				},
			},
		],
		darkTheme: "dark",
		logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
	  }
}
