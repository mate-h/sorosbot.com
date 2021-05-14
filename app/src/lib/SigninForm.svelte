<script lang="ts">
	import GoogleLogo from './GoogleLogo.svelte';
	import { auth } from './firebase-client';
	import { signInWithPopup, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';
	import { enhance } from '$lib/form';
	type Action = Parameters<typeof enhance>[1];
	const params: Action = {
		result: (res, form) => {
			console.log(res);
		}
	};
	const handler = (type: 'google' | 'email') => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider).then((r) => {
			console.log(r);
		});
	};
	const inputComponent = 'text-sm border border-gray-300 rounded px-2 h-8 block mb-2';
</script>

<div class="root rounded bg-white mx-auto p-6">
	<form method="post" action="/api/login" use:enhance={params}>
		<input
			required
			class={inputComponent}
			type="email"
			name="email"
			autocomplete="email"
			placeholder="Email"
		/>
		<input
			required
			class={inputComponent}
			type="password"
			name="password"
			autocomplete="password"
			placeholder="Password"
		/>
		<button
			class="rounded ml-auto block bg-blue-500 hover:bg-blue-400 text-white truncate text-sm font-medium px-2 h-8 transition ease-linear duration-75"
			type="submit"
		>
			Sign in
		</button>
	</form>
	<button
		class="google mt-2 border border-gray-300 rounded px-2 h-8 text-center truncate text-sm hover:bg-gray-50 transition ease-linear duration-75"
		on:click={() => handler('google')}
	>
		<GoogleLogo class="h-4 pr-1 inline" />
		Sign in with Google
	</button>
</div>

<!-- </form> -->
<style>
	.root {
		width: 100%;
	}
	form *,
	.google {
		width: 100%;
	}
</style>
