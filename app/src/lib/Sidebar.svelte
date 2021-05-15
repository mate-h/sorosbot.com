<script lang="ts">
	import { browser } from '$app/env';
	import { createEventDispatcher } from 'svelte';
	import { loop_guard } from 'svelte/internal';

	export let width = 16;
	const dispatch = createEventDispatcher();

	let followPos;
	let following = false;
	let origWidth = width;
	$: {
		if (browser) {
			if (following) {
				document.body.classList.add('select-none');
			} else document.body.classList.remove('select-none');
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
</script>

<svelte:window on:pointerup={stop} on:pointermove={move} />

<div class="fixed h-full border-r border-gray-100 bg-white overflow-visible">
	<nav style={`width: ${width}rem`} class="h-full relative">
		<p class="px-6 pt-6">Bookmarks</p>
		<ul class="px-6 pb-6">
			<li>
				<a href="/console">Console</a>
			</li>
		</ul>
		<hr
			on:pointerdown={follow}
			class="w-2 border-0 hover:bg-blue-500 hover:bg-opacity-5 h-full transform translate-x-1 absolute top-0 right-0"
		/>
	</nav>
</div>

<style>
	hr {
		cursor: ew-resize;
	}
</style>
