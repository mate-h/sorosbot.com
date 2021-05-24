<script lang="ts">
	import type { Page } from '@sveltejs/kit';

	export let page: Page;
	let crumbs: { href: string; name: string }[];
	$: {
		crumbs = page.path
			.split('/')
			.filter((x) => x)
			.reduce(
				(acc, curr) => [
					...acc,
					{
						href: [...acc.map((a) => a.href), curr].join('/'),
						name: curr
					}
				],
				[]
			);
	}
</script>

{#each crumbs as c, i}
	<a class:font-bold={i === crumbs.length - 1} href={'/' + c.href}>{'/' + c.name}</a>
{/each}
