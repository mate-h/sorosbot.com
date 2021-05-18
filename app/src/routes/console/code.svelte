<script>
	import { codeHost } from '$lib/config';

	const src = codeHost;
</script>

<iframe {src} title="Visual Studio Code" />

<style>
	iframe {
		width: 100%;
		min-height: calc(100vh - 4rem);
	}
</style>
