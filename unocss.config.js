import {
	defineConfig,
	// presetAttributify,
	presetWind,
	presetMini,
	presetIcons,
	presetTypography,
	presetUno
	// presetWebFonts,
	// transformerDirectives,
	// transformerVariantGroup
} from 'unocss';

export default defineConfig({
	shortcuts: [
		[
			'form-input',
			'bg-gray-2 font-standar px-3 rounded-md h-10 w-fill text-sm border-none focus:outline-stone-3'
		]
	],
	presets: [
		presetUno(),
		presetWind(),
		presetMini({
			dark: 'class'
		}),
		presetTypography(),
		// presetAttributify(),
		presetIcons({
			warn: true
		})
		// presetWebFonts({
		// provider: 'google',
		// fonts: {
		// 	default: 'Roboto'
		// }
		// })
	],
	// transformers: [transformerDirectives(), transformerVariantGroup()],
	safelist: 'prose prose-sm m-auto text-left'.split(' '),
	rules: [
		['w-fill', { width: '-webkit-fill-available' }],
		['grid-cols-2-home', { 'grid-template-columns': '20% 80%' }]
	],
	theme: {
		colors: {
			githubDark: {
				1: '#22272e',
				2: '#adbac7'
			}
		},
		boxShadow: {
			insetBs: 'inset 0 -1px 1px rgba(33, 71, 41, 0.15),0 0.25rem 1.5rem rgba(255, 255, 255, 0.75)'
		},
		breakpoints: {
			xxs: '320px',
			xs: '480px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px'
		}
	}
});
