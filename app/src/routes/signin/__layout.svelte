<script>
	import Robot from '$lib/Robot.svelte';
</script>

<svelte:head>
	<title>Sign in - Soros Bot</title>
</svelte:head>

<section class="container mx-auto p-6">
	<Robot class="mx-auto" height="220px" />
	<h1 class="text-3xl font-medium text-center mb-4">Soros Bot</h1>
	<slot />
</section>

<footer class="container mx-auto p-6">
	<p class="text-xs text-gray-400">
		Report an issue at <a href="mailto:contact@sorosbot.com">contact@sorosbot.com</a>
	</p>
	<p class="text-xs text-gray-400">© 2021</p>
</footer>

<style>
	section,
	footer {
		max-width: 24rem;
	}
</style>
