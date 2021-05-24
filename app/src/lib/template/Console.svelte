<script lang="ts">
	import Icon from '$lib/Icon.svelte';
	import Sidebar from '$lib/template/Sidebar.svelte';
	import pages from '$lib/pages';
	import { page as pageStore } from '$app/stores';
	import Breadcrumb from '$lib/Breadcrumb.svelte';
	import type { Page } from '@sveltejs/kit';

	function p(i: number) {
		if (i < 0) return i + pages.length;
		return i % pages.length;
	}
	export let page: Page;
	function getState(path: string) {
		const currentIndex = pages.findIndex((p) => p.href === path);
		let prevPage = pages[p(currentIndex - 1)];
		let nextPage = pages[p(currentIndex + 1)];
		return { prevPage, nextPage };
	}
	let { prevPage, nextPage } = getState(page.path);
	let currentPage = page;
	pageStore.subscribe((p) => {
		let r = getState(p.path);
		prevPage = r.prevPage;
		nextPage = r.nextPage;
		currentPage = p;
	});
</script>

<Sidebar {page}>
	<header class="container mx-auto p-6">
		{#if prevPage && nextPage}
			<div class="flex">
				<a class="text-sm" href={prevPage.href}><Icon name="chevron.left" /> Back</a>
				<a class="text-sm ml-auto" href={nextPage.href}>Next <Icon name="chevron.right" /></a>
			</div>
			<div class="flex mb-2">
				<span class="text-sm">{prevPage.name}</span>
				<span class="text-sm ml-auto">{nextPage.name}</span>
			</div>
		{/if}
		<Breadcrumb page={currentPage} />
	</header>

	<slot />
</Sidebar>
