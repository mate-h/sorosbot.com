<script lang="ts">
	import GoogleLogo from './GoogleLogo.svelte';
	import CheckBox from './CheckBox.svelte';
	import Loading from './Loading.svelte';
	import { auth, authMessages } from './firebase-client';
	import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';

	let error;
	let loading = false;
	async function submit(e: Event) {
		error = '';
		loading = true;
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const data = new FormData(form);
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const credential = await signInWithEmailAndPassword(auth, email, password).catch((e) => {
			error = authMessages[e.code] || 'Unauthorized';
		});
		if (credential) {
			const idToken = await credential.user.getIdToken();
			const user = await fetch('/api/session', {
				method: 'post',
				headers: {
					Authorization: `Bearer ${idToken}`
				}
			}).then((r) => r.json());
			error = user.email;
		}
		loading = false;
	}

	const handler = (e: Event) => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider).then((r) => {
			console.log(r);
		});
	};
	const inputComponent =
		'text-sm border border-gray-300 rounded px-2 h-8 block mb-2 appearance-none';
</script>

<div class="root rounded bg-white mx-auto p-6">
	{#if error}
		<p class="bg-red-100 text-red-500 rounded mb-2 px-2 py-1 text-xs">{error}</p>
	{/if}
	<p class="text-xs text-gray-400 mb-2">Sign in to your administrator account</p>
	<form on:submit={submit}>
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
		<div class="mb-2 flex">
			<CheckBox checked id="remember-me">Remember me</CheckBox>
			<a class="text-sm ml-auto" href="/signin/password-reset">Reset password</a>
		</div>

		<button
			disabled={loading}
			class="rounded ml-auto block bg-blue-500 hover:bg-blue-400 text-white truncate text-sm font-medium px-2 h-8 transition ease-linear duration-75"
			type="submit"
		>
			{#if loading}
				<Loading class="inline-block" />
			{/if}
			Sign in
		</button>
	</form>
	<button
		class="google mt-2 border border-gray-300 rounded px-2 h-8 text-center truncate text-sm hover:bg-gray-50 transition ease-linear duration-75"
		on:click={handler}
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
	form > *,
	.google {
		width: 100%;
	}
</style>
