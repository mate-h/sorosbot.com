<script lang="ts">
	import Card from '$lib/Card.svelte';
	import Section from '$lib/Section.svelte';
	import Title from '$lib/Title.svelte';
</script>

<svelte:head>
	<title>Console - Soros Bot</title>
</svelte:head>

<Section>
	<Title>Console</Title>

	<Card>
		<h2 class="text-2xl font-medium mb-4">Profit</h2>

		<h3 class="text-lg font-medium">0.00193544 BTC</h3>
		<h4 class="text-md">121.55419004 USD</h4>

		<div class="flex">
			<div>
				<p class="text-gray-400">ROI</p>
				<p class="text-gray-400">Strategy</p>
				<p class="text-gray-400">Total Trade Count</p>
				<p class="text-gray-400">First Trade opened</p>
				<p class="text-gray-400">Last Trade opened</p>
				<p class="text-gray-400">Win / Loss</p>
				<p class="text-gray-400">Avgerage Duration</p>
				<p class="text-gray-400">Best Performing</p>
			</div>
			<div class="ml-2">
				<p>1.04% • 65.3 Σ%</p>
				<p>SampleStrategy</p>
				<p>68</p>
				<p>5 days ago</p>
				<p>6 hours ago</p>
				<p>62 / 1</p>
				<p>6:33:21</p>
				<p>NEO/BTC: 8.22%</p>
			</div>
		</div>
	</Card>
</Section>

<style>
	p {
		@apply text-sm;
	}
</style>
