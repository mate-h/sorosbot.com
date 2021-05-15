<script lang="ts">
	import Icon from '$lib/Icon.svelte';
	import { auth, authMessages } from '$lib/firebase-client';
	import { sendPasswordResetEmail } from 'firebase/auth';
	import Loading from '$lib/Loading.svelte';

	let error;
	let success = false;
	let loading = false;
	async function submit(e: Event) {
		error = '';
		loading = true;
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const data = new FormData(form);
		const email = data.get('email') as string;
		try {
			await sendPasswordResetEmail(auth, email);
			success = true;
		} catch (e) {
			error = authMessages[e.code] || 'Error';
		}
		loading = false;
	}
	const inputComponent =
		'text-sm border border-gray-300 rounded px-2 h-8 block mb-2 appearance-none';
</script>

<div class="root rounded bg-white mx-auto p-6">
	{#if error}
		<p class="bg-red-100 text-red-500 rounded mb-2 px-2 py-1 text-xs">{error}</p>
	{/if}
	{#if success}
		<p class="bg-green-100 text-green-500 rounded mb-2 px-2 py-1 text-xs">
			<Icon name="checkmark.circle.fill" />
			Password reset email sent
		</p>
	{/if}
	<p class="text-xs text-gray-400 mb-2">
		<a href="/signin">
			<Icon name="chevron.left" /> Back
		</a>
		• Reset your account's password
	</p>
	<form on:submit={submit}>
		<input
			disabled={success}
			required
			class={inputComponent}
			type="email"
			name="email"
			autocomplete="email"
			placeholder="Email"
		/>
		<button
			disabled={success || loading}
			class={`rounded ml-auto block  text-white truncate text-sm font-medium px-2 h-8 transition ease-linear duration-75
      ${success ? 'bg-gray-300 cursor-auto' : 'bg-blue-500 hover:bg-blue-400'}`}
			type="submit"
		>
			{#if loading}
				<Loading class="inline-block" />
			{/if}
			Reset password
		</button>
	</form>
</div>

<style>
	.root {
		width: 100%;
	}
	form > * {
		width: 100%;
	}
</style>
