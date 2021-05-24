<script context="module" lang="ts">
	import type { Load, Page } from '@sveltejs/kit';
	import type { ExchangeInfo } from 'binance-api-node';
	export const load: Load = async ({ fetch, page }) => {
		const symbols = await fetch('https://api.binance.com/api/v3/exchangeInfo')
			.then((r) => r.json())
			.then((r: ExchangeInfo) => {
				return r.symbols.map((s) => s.symbol);
			});
		return {
			props: { page, symbols }
		};
	};
</script>

<script lang="ts">
	import Sidebar from '$lib/template/Sidebar.svelte';
	export let page: Page;
	import { onMount } from 'svelte';
	import type {
		IChartApi,
		ISeriesApi,
		TickMarkFormatter,
		TickMarkType,
		UTCTimestamp
	} from 'lightweight-charts';
	import Datalist from '$lib/Datalist.svelte';
	import { client } from '$lib/binance/api';

	let node;
	let chart: IChartApi;
	export let symbols: string[];

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
		}
	};

	let symbol = 'BTCUSDT';
	let interval = '5m';
	function onSymbolChange(e: Event) {
		const el = e.target as HTMLInputElement;
		symbol = el.value;
	}

	function onIntervalChange(e: Event) {
		const el = e.target as HTMLInputElement;
		interval = el.value;
	}
	let mounted = false;
	$: {
		if (mounted) {
			updateChart({ symbol, interval });
		}
	}

	let candleSeries: ISeriesApi<'Candlestick'>;
	function updateChart({ symbol, interval }: { symbol: string; interval: string }) {
		client.candles({ symbol, interval: interval as any }).then((r) => {
			if (candleSeries) chart.removeSeries(candleSeries);
			candleSeries = chart.addCandlestickSeries();

			const data = r.map((s) => ({
				time:
					new Date(s.openTime + new Date(s.openTime).getTimezoneOffset() * 60 * 1000).getTime() /
					1000,
				open: parseFloat(s.open),
				high: parseFloat(s.high),
				low: parseFloat(s.low),
				close: parseFloat(s.close)
			}));
			candleSeries.setData(data as any);
		});
	}

	let intervalOptions = [
		'1m',
		'3m',
		'5m',
		'15m',
		'30m',
		'1h',
		'2h',
		'4h',
		'6h',
		'8h',
		'12h',
		'1d',
		'3d',
		'1w',
		'1M'
	];

	onMount(() => {
		mounted = true;
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
				height: node.clientHeight,
				layout: {
					fontFamily: 'system-ui'
				},
				timeScale: {
					timeVisible: true,
					secondsVisible: false
				}
			});
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				chart.applyOptions(darkTheme.chart as any);
			}
		});
		return () => {
			observer.unobserve(node);
			window.removeEventListener('wheel', onscroll);
		};
	});
</script>

<Sidebar {page}>
	<div slot="context" class="mb-6">
		<p class="text-xs opacity-50">Chart settings</p>
		<p class="text-sm mb-2">Exchange: Binance</p>
		<p class="mb-2">
			<Datalist on:change={onSymbolChange} options={symbols} value={symbol} placeholder="Symbol" />
		</p>
		<p>
			<Datalist
				on:change={onIntervalChange}
				options={intervalOptions}
				value={interval}
				placeholder="Interval"
			/>
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
