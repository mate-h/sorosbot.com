<script lang="ts">
	import { browser } from '$app/env';
	import { createEventDispatcher } from 'svelte';
	import { host } from './config';
	import Icon from './Icon.svelte';
	import pages from './pages';
	import { page as pageStore } from '$app/stores';
	import type { Page } from '@sveltejs/kit';

	export let width = 16;
	export let page: Page;
	const dispatch = createEventDispatcher();

	let followPos;
	let following = false;
	let origWidth = width;
	$: {
		if (browser) {
			if (following) {
				document.documentElement.style.cursor = 'ew-resize';
				document.documentElement.style['user-select'] = 'none';
			} else {
				document.documentElement.style['user-select'] = 'auto';
				document.documentElement.style.cursor = 'auto';
			}
		}
	}
	function follow(e: PointerEvent) {
		const x = e.clientX;
		const y = e.clientY;
		followPos = { x, y };
		following = true;
	}
	function stop(e: PointerEvent) {
		if (!following) return;
		const x = e.clientX;
		const y = e.clientY;
		width = adjust(x, y);
		dispatch('change', { width });
		origWidth = width;
		following = false;
	}
	const minW = 8 / 16;
	let maxW = Infinity;
	if (browser) {
		maxW = (window.innerWidth - 8) / 16;
	}
	function move(e: PointerEvent) {
		if (!following) return;
		const x = e.clientX;
		const y = e.clientY;
		width = adjust(x, y);
		dispatch('change', { width });
	}
	function adjust(x: number, y: number) {
		const rem = 16;
		const dx = (x - followPos.x) / rem;
		return Math.min(maxW, Math.max(minW, origWidth + dx));
	}
	const services = [
		{
			name: 'API',
			href: `https://api.${host}`
		},
		{
			name: 'VSCode',
			href: `https://code.${host}`
		},
		{
			name: 'Freqtrade',
			href: `https://freqtrade.${host}`
		},
		{
			name: 'Portainer',
			href: `https://portainer.${host}`
		}
	];
	const shared = [
		{
			name: 'GitHub',
			href: 'https://github.com/sorosbot-com/sorosbot.com'
		},
		{
			name: 'Drive',
			href: 'https://drive.google.com/drive/u/0/folders/1PcnaWJwOJTCUgqRCQWQANo6xfIawLfRV'
		},
		{
			name: 'Discord',
			href: 'discord://discordapp.com/channels/688798152152973435/688798152710684758',
			app: true
		},
		{
			name: 'Telegram',
			href: 'https://t.me/joinchat/bGJYXd0hPxUyYzBk'
		}
	];
	const bookmarks = [
		{
			name: 'sorosbot.com',
			href: 'https://sorosbot.com'
		},
		{
			name: 'binance.com',
			href: 'https://binance.com'
		},
		{
			name: 'bitmart.com',
			href: 'https://bitmart.com'
		},
		{
			name: 'nomics.com',
			href: 'https://nomics.com/'
		},
		{
			name: 'coinmarketcap.com',
			href: 'https://coinmarketcap.com'
		},
		{
			name: 'pancakeswap.finance',
			href: 'https://pancakeswap.finance'
		},
		{
			name: 'dex.guru',
			href: 'https://dex.guru'
		},
		{
			name: 'freqtrade.io',
			href: 'https://www.freqtrade.io'
		}
	];
	const forums = [
		{
			name: 'reddit.com/r/CryptoCurrency',
			href: 'https://www.reddit.com/r/CryptoCurrency'
		},
		{
			name: 'reddit.com/r/CryptoCurrencies',
			href: 'https://www.reddit.com/r/CryptoCurrencies'
		},
		{
			name: 'reddit.com/r/CryptoMarkets',
			href: 'https://www.reddit.com/r/CryptoMarkets'
		}
	];
	type Folder = {
		name: string;
		items: {
			name: string;
			href: string;
			app?: boolean;
			local?: boolean;
			selected?: boolean;
		}[];
		icon: any;
	};
	let folders: Folder[];
	$: {
		folders = [
			{
				name: 'Pages',
				items: pages.map((p) => ({ ...p, local: true, selected: page.path === p.href })),
				icon: 'doc.text'
			},
			{
				name: 'Services',
				items: services,
				icon: 'cloud'
			},
			{
				name: 'Shared',
				items: shared,
				icon: 'globe'
			},
			{
				name: 'Bookmarks',
				items: bookmarks,
				icon: 'link'
			},
			{
				name: 'Forums',
				items: forums,
				icon: 'message'
			}
		];
	}
	function getStyle(href: string) {
		const l = href.split('/').length - 2;
		return `padding-left: ${l}rem`;
	}
	function isSelected(path: string, i: number) {
		const currentIndex = pages.findIndex((p) => p.href === path);
		return currentIndex === i;
	}
</script>

<svelte:window on:pointerup={stop} on:pointermove={move} />

<div class="fixed h-full border-r border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-500">
	<nav style={`width: ${width}rem`} class="h-full relative">
		<div class="p-6 overflow-hidden">
			<slot />
			{#each folders as { name, items, icon }}
				<p class="truncate opacity-50 uppercase text-xs font-medium tracking-widest">
					<Icon name={icon} />
					{name}
				</p>
				<ul class="mb-4">
					{#each items as { href, name, app, local, selected }, i}
						<li class="truncate" class:selected>
							{#if app}
								<a rel="external" {href}>{name}</a>
							{:else if local}
								<a style={getStyle(href)} {href}>{name}</a>
							{:else}
								<a target="_blank" rel="noopener noreferrer" {href}>{name}</a>
							{/if}
						</li>
					{/each}
				</ul>
			{/each}
		</div>

		<hr
			on:pointerdown={follow}
			class={`w-2 border-0 bg-opacity-20 hover:bg-blue-500 hover:bg-opacity-20 h-full transform translate-x-1 absolute top-0 right-0 ${
				following ? 'bg-blue-500' : ''
			}`}
		/>
	</nav>
</div>

<style>
	hr {
		cursor: ew-resize;
	}
	.selected {
		@apply font-bold;
	}
</style>
