<script lang="ts">
	import GoogleLogo from './GoogleLogo.svelte';
	import { auth } from './firebase-client';
	import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
	// import { enhance } from '$lib/form';
	// type Action = Parameters<typeof enhance>[1];
	// const params: Action = {
	// 	result: (res, form) => {
	// 		console.log(res);
	// 	}
	// };
	const handler = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider).then((r) => {
			console.log(r);
		});
	};
	const handler2 = () => {
		fetch('/api/claims')
			.then((r) => r.json())
			.then(console.log);
	};
</script>

<!-- <form method="post" action="/api/login" use:enhance={params}> -->
<button
	class="border border-gray-300 rounded px-2 h-8 flex items-center truncate text-sm hover:bg-gray-50 transition ease-linear duration-75"
	on:click={handler2}
>
	<GoogleLogo class="h-4 pr-2" />
	Sign in with Google
</button>
<!-- </form> -->
