<script lang="ts">
  import { fade } from "svelte/transition"

  export let dropdownTrigger: "hover" | "click" | "focus" = "hover"

  let open = false
  let hideTimeout: ReturnType<typeof window.setTimeout> | null = null

  function toggle(type: "hover" | "click" | "focus" | "force") {
    if (type === dropdownTrigger) {
      open = !open
    }
  }

  function show(type: "hover" | "click" | "focus" | "force") {
    if (type === dropdownTrigger || type === "force") {
      if (hideTimeout) clearTimeout(hideTimeout)
      open = true
    }
  }

  function hide(type: "hover" | "click" | "focus" | "force") {
    if (type === dropdownTrigger || type === "force") {
      if (hideTimeout) clearTimeout(hideTimeout)
      hideTimeout = setTimeout(() => {
        open = false
      }, 200)
    }
  }
</script>

<div
  class="dropdown"
  role="combobox"
  aria-expanded={open}
  aria-haspopup="listbox"
  aria-controls="dropdown-menu"
  tabindex="0"
  on:mouseenter={() => show("hover")}
  on:mouseleave={() => hide("hover")}
  on:focusin={() => show("focus")}
  on:focusout={() => hide("focus")}
>
  <button
    class="dropdown-trigger dropdown-trigger__{dropdownTrigger}"
    on:click={() => toggle("click")}
    type="button"
    aria-label="打开下拉菜单"
  >
    <slot name="trigger" />
  </button>

  {#if open}
    <div
      id="dropdown-menu"
      class="dropdown-menu"
      role="listbox"
      transition:fade={{ duration: 160 }}
    >
      <slot name="menu" />
    </div>
  {/if}
</div>

<style>
  .dropdown {
    position: relative;
    display: inline-block;
  }
  .dropdown-menu {
    position: absolute;
    left: 0;
    top: calc(100% + 4px);
    background: var(--color-background-secondary, #242424);
    border-radius: 4px;
    min-width: 140px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 10;
  }
  .dropdown-trigger {
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
  }
  .dropdown-trigger.dropdown-trigger__hover {
    cursor: default;
  }
  .dropdown .dropdown-trigger__focus:hover :global(*),
  .dropdown .dropdown-trigger__click:hover :global(*) {
    color: var(--color-primary);
  }
</style>
