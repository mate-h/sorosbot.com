<script lang="ts">
	import { browser } from '$app/env';
	import { createEventDispatcher } from 'svelte';
	import Icon from './Icon.svelte';

	export let width = 16;
	const dispatch = createEventDispatcher();

	let followPos;
	let following = false;
	let origWidth = width;
	$: {
		if (browser) {
			if (following) {
				document.documentElement.style.cursor = 'ew-resize';
				document.body.classList.add('pointer-events-none');
			} else {
				document.body.classList.remove('pointer-events-none');
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
	const shared = [
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
		}[];
		icon: any;
	};
	const folders: Folder[] = [
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
</script>

<svelte:window on:pointerup={stop} on:pointermove={move} />

<div class="fixed h-full border-r border-gray-100 bg-white">
	<nav style={`width: ${width}rem`} class="h-full relative">
		<div class="p-6 overflow-hidden">
			{#each folders as { name, items, icon }}
				<p class="truncate text-gray-500 uppercase text-xs tracking-widest">
					<Icon name={icon} />
					{name}
				</p>
				<ul class="mb-4">
					{#each items as { href, name, app }}
						<li class="truncate">
							{#if app}
								<a rel="external" {href}>{name}</a>
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
</style>
