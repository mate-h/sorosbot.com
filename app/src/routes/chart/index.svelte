<script context="module" lang="ts">
	import type { Load, Page } from '@sveltejs/kit';
	export const load: Load = async ({ page }) => {
		const symbols = await client.exchangeInfo().then((r) => r.symbols.map((s) => s.symbol));
		return {
			props: { page, symbols }
		};
	};
</script>

<script lang="ts">
	import Sidebar from '$lib/template/Sidebar.svelte';
	export let page: Page;

	import { onMount } from 'svelte';
	import type { BarData, ChartOptions, DeepPartial, IChartApi } from 'lightweight-charts';
	import Datalist from '$lib/Datalist.svelte';
	import { CandleChartInterval } from 'binance-api-node';
	import { client } from '$lib/binance/api';

	let node;
	let chart: IChartApi;
	export let symbols: string[];

	const defaultSymbol = 'BTCUSDT';
	const darkTheme = {
		chart: {
			layout: {
				backgroundColor: '#111827',
				lineColor: 'rgba(255,255,255,0.12)',
				textColor: 'rgba(255,255,255,0.86)'
			},
			crosshair: {
				vertLine: {
					color: 'rgba(255,255,255,0.54)'
				},
				horzLine: {
					color: 'rgba(255,255,255,0.54)'
				}
			},
			grid: {
				vertLines: {
					color: 'rgba(255,255,255,0.12)'
				},
				horzLines: {
					color: 'rgba(255,255,255,0.12)'
				}
			}
		},
		series: {
			topColor: 'rgba(32, 226, 47, 0.56)',
			bottomColor: 'rgba(32, 226, 47, 0.04)',
			lineColor: 'rgba(32, 226, 47, 1)'
		}
	};

	function onSymbolChange(e: Event) {
		const el = e.target as HTMLInputElement;
		updateChart(el.value);
	}
	let candleSeries;
	function updateChart(symbol: string) {
		client.candles({ symbol, interval: CandleChartInterval.ONE_DAY }).then((r) => {
			if (candleSeries) chart.removeSeries(candleSeries);
			candleSeries = chart.addCandlestickSeries();
			const data: BarData[] = r.map((s) => ({
				time: new Date(s.openTime).toUTCString(),
				open: parseFloat(s.open),
				high: parseFloat(s.high),
				low: parseFloat(s.low),
				close: parseFloat(s.close)
			}));
			console.log(data[0]);
			candleSeries.setData(data);
			candleSeries.applyOptions(darkTheme.series);
		});
	}

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
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				chart.applyOptions(darkTheme.chart as any);
			}

			updateChart(defaultSymbol);
		});
		return () => {
			observer.unobserve(node);
			window.removeEventListener('wheel', onscroll);
		};
	});
</script>

<Sidebar {page}>
	<div slot="context" class="mb-6">
		<p class="mb-2">
			<Datalist on:change={onSymbolChange} options={symbols} value="BTCUSDT" placeholder="Symbol" />
		</p>
		<p>
			<Datalist options={['1m', '3m', '5m', '15m']} value="5m" placeholder="Interval" />
		</p>
	</div>
	<div class="root relative">
		<div class="main" tabindex="0" bind:this={node} />
	</div>
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
