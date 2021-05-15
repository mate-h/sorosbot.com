<script>
	import Header from '$lib/Header/index.svelte';
</script>

<svelte:head>
	<title>Console - Soros Bot</title>
</svelte:head>

<Header />

<nav class="border-r border-gray-100 bg-white h-full fixed">
	<ul>
		<li>
			<a href="/console">Console</a>
		</li>
	</ul>
</nav>
<section class="container mx-auto p-6">
	<h1 class="text-3xl font-medium mb-4">Console</h1>
</section>

<style>
	nav {
		width: 16rem;
	}
	section {
		padding-left: 17.5rem;
	}
	:root {
		@apply bg-gray-50;
	}
</style>
