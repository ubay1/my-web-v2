<script lang="ts">
	import Seo from '$lib/components/common/Seo.svelte';
	import Education from '$lib/components/home/Education.svelte';
	import Greeting from '$lib/components/home/Greeting.svelte';
	import Profil from '$lib/components/home/Profil.svelte';
	import Skills from '$lib/components/home/Skills.svelte';
</script>

<Seo />

<div class="flex justify-start items-start gap-6 mt-4 px-4 lt-md:flex-col">
	<Profil />
	<div class="w-full flex flex-col dark:text-white">
		<Greeting />
		<Education />
		<Skills />
	</div>
</div>

<style></style>
