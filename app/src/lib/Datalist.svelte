<script lang="ts">
	const uid = Math.random().toString(36).substr(2, 7);
	const list = Math.random().toString(36).substr(2, 7);
	export let options: string[] = [];
</script>

<label for={uid}>
	<slot name="label" />
</label>
<input
	on:change
	{...$$restProps}
	class={`text-sm dark:bg-gray-800 ring-1 ring-gray-300 dark:ring-gray-700 ${$$restProps.class}`}
	{list}
	id={uid}
/>

<datalist id={list}>
	{#each options as o}
		<option value={o} />
	{/each}
</datalist>

<style>
	input {
		height: 1.5rem;
		padding-left: 0.5rem;
		border: none;
		appearance: none;
		border-radius: 1px;
	}
	input:focus {
		outline: none;
		@apply ring-blue-500;
	}
</style>
