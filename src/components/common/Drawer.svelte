<script lang="ts">
  import { fade, fly } from "svelte/transition"
  import { createEventDispatcher, onMount } from "svelte"

  let isOpen = false
  export let direction: "left" | "right" | "top" | "bottom" = "right"
  export let closeOnOverlayClick = true
  export let showCloseButton = true

  const dispatch = createEventDispatcher()

  function handleClose() {
    isOpen = false
    dispatch("close")
  }

  function handleOverlayClick() {
    if (closeOnOverlayClick) {
      handleClose()
    }
  }

  export function toggleDrawer() {
    isOpen = !isOpen
  }

  $: slideDirection = {
    left: { x: "-100%", duration: 200 },
    right: { x: "100%", duration: 200 },
    top: { y: "-100%", duration: 200 },
    bottom: { y: "100%", duration: 200 }
  }[direction]

  onMount(() => {
    return () => {
      document.body.classList.remove("drawer-open")
    }
  })

  $: if (typeof document !== "undefined") {
    if (isOpen) {
      document.body.classList.add("drawer-open")
    } else {
      document.body.classList.remove("drawer-open")
    }
  }
</script>

<button
  class="drawer-toggle"
  on:click={() => (isOpen = !isOpen)}
  aria-label="打开菜单"
  aria-expanded={isOpen}
>
  <slot name="button-icon" />
</button>

{#if isOpen}
  <div
    role="dialog"
    aria-modal="true"
    tabindex="0"
    class="drawer-overlay"
    on:click={handleOverlayClick}
    on:keydown={(e) => e.key === "Escape" && handleClose()}
    transition:fade={{ duration: 200 }}
  >
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="drawer"
      class:left={direction === "left"}
      class:right={direction === "right"}
      class:top={direction === "top"}
      class:bottom={direction === "bottom"}
      on:click|stopPropagation
      transition:fly={slideDirection}
    >
      <div class="drawer-header">
        <slot name="header" />
        {#if showCloseButton}
          <button
            class="close-button close-button__position-{direction}"
            type="button"
            on:click={handleClose}>×</button
          >
        {/if}
      </div>
      <div class="drawer-content">
        <slot />
      </div>
    </div>
  </div>
{/if}

<style>
  .drawer-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    overflow: hidden;
  }

  .drawer {
    position: fixed;
    background-color: var(--color-background-secondary);
    z-index: 1001;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transform: translateX(0);
    transition: transform 0.2s ease;
  }

  .drawer.left,
  .drawer.right {
    top: 0;
    height: 100vh;
    width: 300px;
  }

  .drawer.top,
  .drawer.bottom {
    left: 0;
    width: 100vw;
    height: 300px;
  }

  .drawer.left {
    left: 0;
  }

  .drawer.right {
    right: 0;
  }

  .drawer.top {
    top: 0;
  }

  .drawer.bottom {
    bottom: 0;
  }

  .drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1rem 0;
  }

  .drawer-content {
    padding: 0 1rem;
    height: calc(100% - 60px);
    overflow-y: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }

  .drawer-content::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  /* 当抽屉打开时，禁用body滚动 */
  :global(body.drawer-open) {
    overflow: hidden;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    color: var(--color-natural);
    transition: color 0.3s ease;
  }

  .close-button:hover {
    color: var(--color-primary);
  }

  .close-button__position-left {
    position: absolute;
    right: 1rem;
    top: 0;
  }

  .close-button__position-right {
    position: absolute;
    left: 1rem;
    top: 0;
  }

  .close-button__position-top {
    position: absolute;
    left: 1rem;
    top: 0;
  }

  .close-button__position-bottom {
    position: absolute;
    right: 1rem;
    top: 0;
  }

  .drawer-toggle {
    min-width: 32px;
    min-height: 32px;
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
