<script lang="ts">
  import Icon from "@iconify/svelte";
  export let icon: string;
  export let label: string;
  export let size: "small" | "medium" | "large" = "medium";
  export let m_size: "small" | "medium" | "large" = size;
</script>

<div class="icon-label icon-label__{size} __scope__ icon-label-mobile__{m_size}">
  <Icon {icon} />
  <span>{label}</span>
</div>

<style>
  .icon-label {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    color: var(--color-text-secondary);
  }
  .icon-label__small > :global(svg) {
    font-size: 1.2rem;
  }
  .icon-label__small > span {
    font-size: 0.7rem;
  }
  .icon-label__medium > :global(svg) {
    font-size: 1.6rem;
  }
  .icon-label__medium > span {
    font-size: 0.85rem;
  }
  .icon-label__large > :global(svg) {
    font-size: 2.4rem;
  }
  .icon-label__large > span {
    font-size: 0.9rem;
  }

  /* 移动端响应式样式 */
  @media (max-width: 768px) {
    .icon-label-mobile__small > :global(svg) {
      font-size: 1rem;
    }
    .icon-label-mobile__small > span {
      font-size: 0.65rem;
    }
    .icon-label-mobile__medium > :global(svg) {
      font-size: 1.4rem;
    }
    .icon-label-mobile__medium > span {
      font-size: 0.75rem;
    }
    .icon-label-mobile__large > :global(svg) {
      font-size: 2rem;
    }
    .icon-label-mobile__large > span {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 480px) {
    .icon-label {
      gap: 0.3rem;
    }
    .icon-label-mobile__small > :global(svg) {
      font-size: 0.9rem;
    }
    .icon-label-mobile__small > span {
      font-size: 0.6rem;
    }
    .icon-label-mobile__medium > :global(svg) {
      font-size: 1.2rem;
    }
    .icon-label-mobile__medium > span {
      font-size: 0.7rem;
    }
    .icon-label-mobile__large > :global(svg) {
      font-size: 1.8rem;
    }
    .icon-label-mobile__large > span {
      font-size: 0.75rem;
    }
  }
</style>
