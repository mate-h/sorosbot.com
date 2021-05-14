<script lang="ts">
	import lookup from './sf-symbol-table';
	export let name: keyof typeof lookup;
</script>

<i {...$$restProps} on:click>{lookup[name]}</i>

<style>
	i {
		font-family: 'SF Symbols';
		font-style: normal;
	}
</style>
