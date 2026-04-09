<script lang="ts">
  import Icon from "@iconify/svelte"
  import { onMount } from "svelte"
  export let type: "default" | "primary" | "success" | "info" | "warning" | "danger" = "default"
  export let noIcon: boolean = false
  export let style: "simple" | "modern" | "flat" | "disabled" = "simple"

  // 配色和icon映射，增加深色条色值和字体色
  const classMap: Record<
    string,
    {
      color: string
      bg: string
      icon?: string
      bar: string
      text: string
      modernText: string
    }
  > = {
    default: {
      color: "#666",
      bg: "#f0f0f0",
      icon: undefined,
      bar: "#333",
      text: "var(--note-color-text, #222)",
      modernText: "#222"
    },
    primary: {
      color: "#6f42c1",
      bg: "#ede7f6",
      icon: "solar:add-circle-linear",
      bar: "#4b277a",
      text: "var(--note-color-text, #222)",
      modernText: "#4b277a"
    },
    success: {
      color: "#388e3c",
      bg: "#e8f5e9",
      icon: "solar:check-circle-linear",
      bar: "#256025",
      text: "var(--note-color-text, #222)",
      modernText: "#256025"
    },
    info: {
      color: "#1976d2",
      bg: "#e3f2fd",
      icon: "solar:info-circle-linear",
      bar: "#0d47a1",
      text: "var(--note-color-text, #222)",
      modernText: "#0d47a1"
    },
    warning: {
      color: "#fbc02d",
      bg: "#fffde7",
      icon: "solar:shield-warning-linear",
      bar: "#b28704",
      text: "var(--note-color-text, #222)",
      modernText: "#b28704"
    },
    danger: {
      color: "#d32f2f",
      bg: "#ffebee",
      icon: "solar:danger-circle-linear",
      bar: "#8a1f1f",
      text: "var(--note-color-text, #222)",
      modernText: "#8a1f1f"
    }
  }

  $: current = classMap[type] || classMap.default

  let container: HTMLDivElement
  onMount(() => {
    const links = container.querySelectorAll('a[href^="http"]')
    links.forEach((link) => {
      // 可根据是否是外链来判断是否加 target
      if (link instanceof HTMLAnchorElement && !link.href.includes(location.hostname)) {
        link.setAttribute("target", "_blank")
        link.setAttribute("rel", "noopener noreferrer")
      }
    })
  })
</script>

<div
  class="note {style} not-prose"
  style="
    --color: {current.color};
    --bg: {current.bg};
    --bar: {current.bar};
    --note-color-text: {current.text};
    --modern-text: {current.modernText};
  "
  bind:this={container}
>
  <!-- svelte-ignore element_invalid_self_closing_tag -->
  <span class="bar" />
  {#if !noIcon && current.icon}
    <span class="icon"><Icon icon={current.icon} color={current.bar} /></span>
  {/if}
  <div class="content"><slot /></div>
</div>

<style>
  .note {
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 6px;
    margin: 1rem 0 2rem;
    font-size: 15px;
    transition: background 0.2s;
    word-break: break-all;
    line-height: 1.5;
    background: transparent;
    border: none;
    color: var(--note-color-text);
    padding: 16px;
  }
  .note .bar {
    display: none;
  }
  .note.simple .bar,
  .note.flat .bar {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 6px;
    background: var(--bar);
    border-radius: 6px 0 0 6px;
  }
  .note.simple {
    border: 1px solid #fff;
    border-left: none;
    background: transparent;
    color: var(--note-color-text);
  }
  .note.flat {
    background: var(--bg);
    color: var(--modern-text);
    border: none;
  }
  .note.modern {
    background: var(--bg);
    color: var(--modern-text);
    border: none;
  }
  .note.modern .bar,
  .note.disabled .bar {
    display: none;
  }
  .icon {
    margin: 0 1rem 0 0.5rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
  }
  .content {
    flex: 1;
    white-space: pre-line;
    padding-right: 1rem;
  }
  .note.flat .content :global(a) {
    color: var(--modern-text);
    padding: 0 2px;
    transition: text-shadow 0.2s;
    text-decoration: none;
  }
  .note.flat .content :global(a:hover) {
    text-shadow: 0 0 0.4px currentColor;
  }
</style>
