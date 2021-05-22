<script context="module" lang="ts">
	import type { ErrorLoad } from '@sveltejs/kit';
	export const load: ErrorLoad = async ({ error, status }) => {
		return {
			props: { error, status }
		};
	};
</script>

<script lang="ts">
	import { dev } from '$app/env';
	export let status: number;
	export let error: Error;
	const offline = typeof navigator !== 'undefined' && navigator.onLine === false;
	const title = offline ? 'Offline' : `${status} ${error.message}`;
	const message = offline ? 'Connect to a network and try again' : error.message;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<section class="container mx-auto p-6 text-center">
	<h1 class="text-3xl font-medium mb-4">{title}</h1>

	<p class="text-sm">{message}</p>

	{#if dev && error.stack}
		<pre>{error.stack}</pre>
	{/if}
</section>
