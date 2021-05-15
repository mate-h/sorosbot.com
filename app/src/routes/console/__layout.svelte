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
<div>
	<slot />
</div>

<style>
	nav {
		width: 16rem;
	}
	div {
		padding-left: 17.5rem;
	}
	:root {
		@apply bg-gray-50;
	}
</style>
