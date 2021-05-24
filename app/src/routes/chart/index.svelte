<script context="module" lang="ts">
	import type { Load, Page } from '@sveltejs/kit';
	export const load: Load = async ({ page }) => {
		return {
			props: { page }
		};
	};
</script>

<script lang="ts">
	import Sidebar from '$lib/template/Sidebar.svelte';
	export let page: Page;

	import { onMount } from 'svelte';
	import type { IChartApi } from 'lightweight-charts';
	import Datalist from '$lib/Datalist.svelte';

	//

	let node;
	let chart: IChartApi;

	onMount(() => {
		function onresize(e) {
			const n = e[0];
			if (chart) chart.resize(n.contentRect.width, n.contentRect.height);
		}
		const observer = new ResizeObserver(onresize);
		observer.observe(node);
		function onwheel(e: WheelEvent) {
			const focused = document.activeElement === node;
			e.preventDefault();
			if (e.ctrlKey) {
				// chart.timeScale().setVisibleRange()
				// const deltaZoom = -e.deltaY * (PTM / 100);
			} else if (focused) {
				// canvasOffset.x -= e.deltaX * dppx;
				// canvasOffset.y -= e.deltaY * dppx;
			}
		}
		node.focus();
		window.addEventListener('wheel', onwheel, { passive: false });

		import('lightweight-charts').then(({ createChart }) => {
			chart = createChart(node, {
				width: node.clientWidth,
				height: node.clientHeight
			});
			const lineSeries = chart.addLineSeries();
			lineSeries.setData([
				{ time: '2019-04-11', value: 80.01 },
				{ time: '2019-04-12', value: 96.63 },
				{ time: '2019-04-13', value: 76.64 },
				{ time: '2019-04-14', value: 81.89 },
				{ time: '2019-04-15', value: 74.43 },
				{ time: '2019-04-16', value: 80.01 },
				{ time: '2019-04-17', value: 96.63 },
				{ time: '2019-04-18', value: 76.64 },
				{ time: '2019-04-19', value: 81.89 },
				{ time: '2019-04-20', value: 74.43 }
			]);
		});
		return () => {
			observer.unobserve(node);
			window.removeEventListener('wheel', onscroll);
		};
	});
</script>

<Sidebar {page}>
	<div class="root relative">
		<div class="main" tabindex="0" bind:this={node} />
		<div style="top: 1px; left: 2px; z-index: 10" class="absolute p-1">
			<Datalist options={['BTCUSDT', 'ETHUSDT', 'DOGEUSDT']} value="BTCUSDT" placeholder="Symbol" />
			<Datalist
				options={['1m', '3m', '5m', '15m']}
				value="5m"
				placeholder="Timeframe"
				class="ml-1"
			/>
		</div>
	</div>

	<slot />
</Sidebar>

<style>
	.root,
	.main {
		width: 100%;
		height: 100vh;
	}
	.main {
		border: 1px solid transparent;
	}
	.main:focus {
		@apply border;
		@apply border-blue-500;
	}
</style>
