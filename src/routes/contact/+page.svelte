<script lang="ts">
	import { onMount } from 'svelte';
	import { toast } from 'svoast';

	let isLoading: boolean = false;
	let form: { email: string; fullname: string; content: string } = {
		email: '',
		fullname: '',
		content: ''
	};
	let responseFetch = {
		status: 0,
		message: ''
	};

	async function sendMail() {
		try {
			isLoading = true;
			const res = await fetch('/api/email', { method: 'POST', body: JSON.stringify(form) });
			responseFetch = {
				status: Number(res?.status),
				message: 'Pesan terkirim'
			};
			toast.success(responseFetch.message);
		} catch (error: any) {
			responseFetch = {
				status: Number(error?.status),
				message: 'Pesan gagal terkirim'
			};
			toast.success(responseFetch.message);
		} finally {
			isLoading = false;
			form = {
				email: '',
				fullname: '',
				content: ''
			};
		}
	}
</script>

<form class="p-4 mt-5 flex justify-center items-center" on:submit={sendMail}>
	<div class="w-full sm:w-3/4 md:w-2/3 lg:w-40% rounded-md flex flex-col justify-center">
		<div class="text-white text-lg text-center font-bold mb-8">
			Jika ada info lowongan kerja, Freelance, dll. <br /> bisa kirim pesan disini.
		</div>
		<label for="email" class="text-white mb-1 text-sm">Email</label>
		<input
			type="email"
			name="email"
			id="email"
			bind:value={form.email}
			required
			placeholder="Masukan email"
			class="p-2 mb-4 bg-white border-none outline-solid rounded w-fill h-8 outline-white"
		/>

		<label for="email" class="text-white mb-1 text-sm">Nama lengkap</label>
		<input
			type="text"
			name="fullname"
			id="fullname"
			bind:value={form.fullname}
			required
			placeholder="Masukan nama lengkap"
			class="p-2 mb-4 bg-white border-none outline-solid rounded w-fill h-8 outline-white"
		/>

		<label for="email" class="text-white mb-1 text-sm">Isi pesan</label>
		<textarea
			name="content"
			id="content"
			bind:value={form.content}
			required
			placeholder="Masukan isi pesan"
			class="p-2 mb-4 bg-white border-none outline-solid rounded w-fill h-20 outline-white"
		/>

		<button
			disabled={isLoading}
			class="bg-orange-5 cursor-pointer border-none p-4 rounded-md text-white font-bold disabled:bg-githubDark-2 disabled:cursor-not-allowed"
		>
			{#if isLoading}
				Mengirim pesan
			{:else}
				Kirim
			{/if}
		</button>
	</div>
</form>

<style></style>
