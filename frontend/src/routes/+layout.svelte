<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import SiteHeader from '$lib/components/ui/site-header.svelte';
	import { ModeWatcher } from "mode-watcher";

	let { children } = $props();
</script>
<ModeWatcher />
<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<SiteHeader />
{@render children?.()}

