<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch, session, context }) => {
		if (page.path === '/') {
			return {
				status: 302,
				redirect: '/console'
			};
		}
	};
</script>
