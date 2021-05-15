<script lang="ts">
	export let checked = false;
	export let id: string;
	import lookup from './sf-symbol-table';

	function handler() {
		checked = !checked;
	}
	function keypressHandler(e) {
		if (e.key === 'Enter' || e.key === ' ') {
			handler();
		}
	}
</script>

<span
	tabindex="0"
	on:click={handler}
	on:keypress={keypressHandler}
	class="cursor-pointer text-sm hover:bg-gray-50 rounded inline-block"
>
	<i class="inline-block relative" name={'circle'}>
		<span class="text-gray-500">{lookup['circle']}</span><i
			class={`text-blue-500 absolute top-0 left-0 transform origin-center transition-transform duration-75 ${
				checked ? 'scale-100' : 'scale-0'
			}`}>{lookup['checkmark.circle.fill']}</i
		></i
	><input
		tabindex="-1"
		{id}
		bind:checked
		class="cursor-pointer appearance-none"
		type="checkbox"
	/><label class="cursor-pointer pointer-events-none px-2" for={id}>
		<slot />
	</label>
</span>

<style>
	i {
		font-family: 'SF Symbols';
		font-style: normal;
	}
</style>
