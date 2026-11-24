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
					// Ink and paper, with one colour: a muted terracotta orange. It fills the
					// buttons (primary) and marks the small things (accent: links, icons, dots), and a pale tint of it
					// (secondary) sits under a hovered tag. Text and outlines stay ink (base-content, neutral).
					primary: "#8B4935",
					"primary-content": "#FCF8EC",
					secondary: "#EFD9CB",
					"secondary-content": "#6E3826",
					accent: "#8B4935",
					"accent-content": "#FCF8EC",
					neutral: "#1C1B1A",
					"neutral-content": "#FCF8EC",
					"base-100": "#FCF8EC",
					"base-200": "#F1EAD9",
					"base-300": "#E4DAC4",
					"base-content": "#1C1B1A",
					// Controls and cards share one firm line and modest corners.
					"--rounded-btn": "0.5rem",
					"--rounded-box": "0.75rem",
					"--rounded-badge": "0.5rem",
					"--border-btn": "1.5px",
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
					// The same at night: the orange lifts to a lighter clay so it reads on the dark page.
					primary: "#D5966F",
					"primary-content": "#211B18",
					secondary: "#3B2B24",
					"secondary-content": "#EAE8E2",
					accent: "#D5966F",
					"accent-content": "#211B18",
					neutral: "#2A2B2E",
					"neutral-content": "#EAE8E2",
					"base-100": "#1E1F21",
					"base-200": "#191A1C",
					"base-300": "#343538",
					"base-content": "#EAE8E2",
					"--rounded-btn": "0.5rem",
					"--rounded-box": "0.75rem",
					"--rounded-badge": "0.5rem",
					"--border-btn": "1.5px",
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
