import {
	defineConfig,
	// presetAttributify,
	presetWind,
	presetMini,
	presetIcons,
	presetTypography,
	presetUno,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup
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
		// presetAttributify(),
		presetIcons({
			warn: true
		}),
		presetMini({
			dark: 'class'
		}),
		presetTypography(),
		presetWebFonts({
			provider: 'google',
			fonts: {
				// these will extend the default theme
				default: 'Roboto'
			}
		})
	],
	transformers: [transformerDirectives(), transformerVariantGroup()],
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
		}
	}
});
