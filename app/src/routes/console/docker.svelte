<script lang="ts">
	import Icon from '$lib/Icon.svelte';

	const instances = [
		{
			name: 'Freqtrade',
			image: 'freqtradeorg/freqtrade:stable',
			container_name: 'freqtrade',
			volumes: [
				'conf:/etc/nginx/conf.d',
				'vhost:/etc/nginx/vhost.d',
				'certs:/etc/nginx/certs:ro',
				'./freqtrade/user_data:/freqtrade/user_data',
				'/var/run/docker.sock:/var/run/docker.sock:ro'
			],
			ports: ['8080:8080'],
			command: `trade\n
--logfile /freqtrade/user_data/logs/freqtrade.log\n
--db-url sqlite:////freqtrade/user_data/tradesv3.sqlite\n
--config /freqtrade/user_data/config.json\n
--strategy SampleStrategy`,
			environment: ['VIRTUAL_HOST=freqtrade.${HOST}']
		}
	];
</script>

<section class="container mx-auto p-6">
	<h1 class="text-3xl font-medium mb-4">Docker</h1>

	<div class="bg-white rounded dark:bg-gray-900 p-6">
		<h1 class="text-2xl font-medium mb-4">Instances</h1>
		{#each instances as { name, image, container_name, volumes, ports, command, environment }}
			<h2 class="text-lg font-medium mb-4">{name}</h2>
			<p>
				<span class="mr-2 text-gray-400">Status</span><span
					class="bg-green-900 text-green-500 px-2 rounded"
					><Icon class="text-xs mr-1" name="circle.fill" />Online</span
				>
			</p>
			<p>
				<span class="mr-2 text-gray-400">Image</span>
				<span class="font-mono">{image}</span>
			</p>
			<p>
				<span class="mr-2 text-gray-400">Container name</span>
				<span class="font-mono">{container_name}</span>
			</p>
			<p class="mr-2 text-gray-400">Volumes</p>
			<ul class="px-4">
				{#each volumes as v}
					<li class="font-mono">{v}</li>
				{/each}
			</ul>
			<p class="mr-2 text-gray-400">Ports</p>
			<ul class="px-4">
				{#each ports as p}
					<li class="font-mono">{p}</li>
				{/each}
			</ul>
			<p class="mr-2 text-gray-400">Command</p>
			{#each command.split('\n') as c}
				<p class="font-mono">{c}</p>
			{/each}
			<p class="mr-2 text-gray-400">Environment</p>
			<ul class="px-4">
				{#each environment as e}
					<li class="font-mono">{e}</li>
				{/each}
			</ul>
		{/each}
	</div>
</section>

<style>
	p,
	span,
	ul {
		@apply text-sm;
	}
</style>
