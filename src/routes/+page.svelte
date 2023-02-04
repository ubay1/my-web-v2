<script lang="ts">
	import Education from '$lib/components/molecules/home/Education.svelte';
	import Greeting from '$lib/components/molecules/home/Greeting.svelte';
	import Profil from '$lib/components/molecules/home/Profil.svelte';
	import Skills from '$lib/components/molecules/home/Skills.svelte';

	const fetchAndDecode = async (url: string, type: string) => {
		const response = await fetch(url);

		let content;

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		} else {
			if (type === 'json') {
				content = await response.json();
			} else if (type === 'text') {
				content = await response.text();
			}
		}
		return content;
	};

	const loadAllDog = async () => {
		const dogAkita = fetchAndDecode('https://dog.ceo/api/breed/akita/images/random', 'json');
		const dogFrench = fetchAndDecode(
			'https://dog.ceo/api/breed/bulldog/french/images/random',
			'json'
		);

		const [akita, french]: { status: string; message: string }[] = await Promise.all([
			dogAkita,
			dogFrench
		]);
		console.log('promise.all with fetch and asyncAwait = ', akita.message + ', ' + french.message);
	};

	loadAllDog();
</script>

<div class="flex justify-start items-start gap-6 mt-4 px-4 lt-md:flex-col">
	<Profil />
	<div class="w-full flex flex-col dark:text-white ">
		<Greeting />
		<Education />
		<Skills />
	</div>
</div>

<style></style>
