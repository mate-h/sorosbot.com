<script lang="ts">
	import SigninForm from '$lib/SigninForm.svelte';
</script>

<svelte:head>
	<title>Sign in - Soros Bot</title>
</svelte:head>

<section class="container mx-auto p-6">
	<img class="mx-auto" src="/robot.png" alt="Small Robot" />
	<h1 class="text-3xl font-medium mb-4 text-center">Soros Bot</h1>
	<SigninForm />
</section>

<footer class="container mx-auto p-6">
	<p class="text-xs">
		Report an issue at <a href="mailto:contact@sorosbot.com">contact@sorosbot.com</a>
	</p>
</footer>

<style>
	img {
		width: 200px;
		height: 200px;
	}
	:root {
		@apply bg-gray-50;
	}
	section,
	footer {
		max-width: 24rem;
	}
</style>
