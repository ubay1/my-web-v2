import {
	defineConfig,
	// presetAttributify,
	presetWind,
	presetMini,
	presetIcons,
	presetTypography,
	presetUno,
	presetWebFonts
	// transformerDirectives,
	// transformerVariantGroup
} from 'unocss';

export default defineConfig({
	shortcuts: [
		[
			'form-input',
			'bg-white px-3 rounded-md h-10 w-fill text-sm border-none focus:outline-orange-5'
		],
		[
			'btn-primary',
			'bg-orange-5 p-2 rounded-lg border-none text-white cursor-pointer hover:bg-orange-6 disabled:opacity-25 disabled:cursor-not-allowed'
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
		}),
		presetWebFonts({
			provider: 'google',
			fonts: {
				default: 'Poppins:300, 600'
			}
		})
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
