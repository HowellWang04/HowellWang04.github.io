/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography"),require("daisyui")],
	daisyui: {
		themes: [
			{
				"portfolio-light": {
					"color-scheme": "light",
					primary: "#8B4935",
					"primary-content": "#FFFFFF",
					secondary: "#C7795D",
					"secondary-content": "#211D19",
					accent: "#926738",
					"accent-content": "#FFFFFF",
					neutral: "#292B2A",
					"neutral-content": "#F8F4EA",
					"base-100": "#F8F4EA",
					"base-200": "#E4DBCC",
					"base-300": "#D1C3AF",
					"base-content": "#292B2A",
					info: "#7896A0",
					"info-content": "#172328",
					success: "#98A575",
					"success-content": "#1D2518",
					warning: "#D1A675",
					"warning-content": "#292B2A",
					error: "#C65F5F",
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
