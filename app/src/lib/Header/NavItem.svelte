<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '$lib/Icon.svelte';

	import { navItems } from '$lib/stores';

	export let tab: boolean;
	export let name: string;
	export let path: string;
	export let sm: boolean = false;

	const index = navItems.findIndex((i) => i.path === path);
	let currentNavItem;
	$: {
		currentNavItem = navItems.findIndex((i) => i.path === $page.path);
	}
	const navComponent =
		'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium';
	const navComponentM =
		'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium';
	const activeNavComponent =
		'bg-gray-900 hover:bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium';
	const activeNavComponentM =
		'bg-gray-900 hover:bg-gray-800 text-white block px-3 py-2 rounded-md text-base font-medium';
	function c(active = false) {
		if (active) return sm ? activeNavComponentM : activeNavComponent;
		return sm ? navComponentM : navComponent;
	}
</script>

{#if tab}
	<a target="_blank" rel="noopener noreferrer" href={path} class={c()}>
		<Icon name="arrow.up.right" />
		{name}</a
	>
{:else if index === currentNavItem}
	<a href={path} class={c(true)}>{name}</a>
{:else}
	<a href={path} class={c()}>{name}</a>
{/if}
