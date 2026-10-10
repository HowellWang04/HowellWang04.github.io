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
					primary: "#1B6B73",
					"primary-content": "#FFFFFF",
					secondary: "#DD7A67",
					"secondary-content": "#1E2B31",
					accent: "#A95F3E",
					"accent-content": "#FFFFFF",
					neutral: "#1E2B31",
					"neutral-content": "#F5F3EE",
					"base-100": "#FFFFFF",
					"base-200": "#ECE9E2",
					"base-300": "#D9DFDB",
					"base-content": "#1E2B31",
					info: "#6A9EC8",
					"info-content": "#1E2B31",
					success: "#7FAF8D",
					"success-content": "#1E2B31",
					warning: "#D9A277",
					"warning-content": "#1E2B31",
					error: "#C65F5F",
					"error-content": "#FFFFFF",
				},
			},
			{
				dark: {
					"color-scheme": "dark",
					primary: "#79C2C4",
					"primary-content": "#151E23",
					secondary: "#DD7A67",
					"secondary-content": "#1E2B31",
					accent: "#D9A277",
					"accent-content": "#151E23",
					neutral: "#202B30",
					"neutral-content": "#EAF1EE",
					"base-100": "#202B30",
					"base-200": "#1B262B",
					"base-300": "#34434A",
					"base-content": "#EAF1EE",
					info: "#6A9EC8",
					"info-content": "#1E2B31",
					success: "#7FAF8D",
					"success-content": "#1E2B31",
					warning: "#D9A277",
					"warning-content": "#1E2B31",
					error: "#C65F5F",
					"error-content": "#FFFFFF",
				},
			},
		],
		darkTheme: "dark",
		logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
	  }
}
