<script lang="ts">
  import { untrack } from "svelte"
  import Icon from "@iconify/svelte"

  type Theme = "light" | "dark"

  let theme = $state()

  $effect(() => {
    const savedTheme = localStorage.getItem("theme")
    let currTheme: Theme

    if (theme === "light" || theme === "dark") {
      currTheme = $state.snapshot(theme)
    } else if (savedTheme === "light" || savedTheme === "dark") {
      currTheme = savedTheme
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      currTheme = "light"
    } else {
      currTheme = "dark"
    }

    if (currTheme === "light") {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", $state.snapshot(theme))
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", $state.snapshot(theme))
    }

    untrack(() => {
      theme = currTheme
    })
  })
</script>

<button
  class="theme-btn"
  aria-label="切换主题"
  onclick={() => {
    theme = theme === "dark" ? "light" : "dark"
  }}
>
  {#if theme === "dark"}
    <Icon icon="tabler:moon" />
  {:else}
    <Icon icon="tabler:sun" />
  {/if}
</button>

<style>
  .theme-btn {
    cursor: pointer;
    font-size: 1.25rem;
  }

  .theme-btn:hover {
    color: var(--color-primary);
  }
</style>
