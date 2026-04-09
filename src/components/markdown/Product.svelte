<script lang="ts">
  import Swiper from "@/components/common/Swiper.svelte";
  type Image = {
    src: string;
    alt: string;
  };
  export let images: Image[] = [];
  export let buyLink: string;
  export let manualLink: string;
  export let disableBuyButton: boolean = false;
  export let hideBuyButton: boolean = false;
  export let hideManualButton: boolean = false;
  export let buyButtonText: string = "立即购买";
</script>

<div class="product-container">
  <div class="product-swiper">
    <Swiper {images} />
  </div>
  <div class="product-details">
    <slot name="title" />
    <slot name="description" />
    <div class="product-content">
      <slot></slot>
    </div>
    <div class="product-buttons">
      {#if !hideBuyButton}
        <a
          href={disableBuyButton ? undefined : buyLink}
          class="product-button {disableBuyButton ? 'disabled' : ''}"
          target="_blank">{buyButtonText}</a
        >
      {/if}
      {#if !hideManualButton}
        <a href={manualLink} class="product-button">使用说明</a>
      {/if}
    </div>
  </div>
</div>

<style>
  .product-swiper {
    width: min(30vw, 1000px);
    aspect-ratio: 16/9;
    /* max-height: 300px; */
    overflow: hidden;
  }
  .product-container {
    display: flex;
    gap: clamp(2rem, 4vw, 6rem);
    margin: 1rem 0 3rem 0;
    align-items: stretch;
  }
  .product-details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    flex: 1;
    min-width: 0; /* 防止内容溢出 */
  }
  .product-details > :global(.product-icons) {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .product-details :global(h1):not(:where(.__scope__ *)) {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 600;
    color: var(--color-text);
    line-height: 1.2;
  }
  .product-details :global(p):not(:where(.__scope__ *)) {
    font-size: clamp(1rem, 1.2vw, 1.2rem);
    color: var(--color-text-secondary);
    line-height: 1.5;
  }
  .product-details :global(span):not(:where(.__scope__ *)) {
    font-size: clamp(0.875rem, 1vw, 1rem);
    color: var(--color-text-secondary);
  }
  .product-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .product-buttons {
    display: flex;
    gap: clamp(1rem, 2.5vw, 2.5rem);
  }
  .product-buttons > .product-button {
    padding: clamp(0.5rem, 0.6vw, 0.6rem) clamp(2rem, 3vw, 3rem);
    font-size: clamp(1rem, 1.1vw, 1.1rem);
    background-color: var(--color-button-secondary);
    color: var(--color-text);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-align: center;
    white-space: nowrap;
    text-decoration: none;
  }
  .product-buttons > .product-button:hover {
    background-color: var(--color-button-secondary-hover);
    transform: translateY(-1px);
  }
  .product-buttons > .product-button.disabled {
    background-color: var(--color-button-secondary-disabled);
    color: var(--color-text-secondary);
    cursor: not-allowed;
    transform: none;
  }
  :global(.product-icon-labels) {
    display: flex;
    width: min(45vw, 600px);
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  /* 响应式设计 */
  @media (max-width: 1200px) {
    .product-container {
      gap: 3rem;
    }
    .product-swiper {
      width: min(40vw, 500px);
    }
  }

  @media (max-width: 1000px) {
    :global(.product-icon-labels) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 900px) {
    .product-container {
      flex-direction: column;
      gap: 2rem;
    }
    .product-swiper {
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
    }
    .product-details {
      gap: 1rem;
    }
    .product-buttons {
      gap: 1.5rem;
    }
    :global(.product-icon-labels) {
      width: 100%;
    }
    .product-buttons {
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    .product-buttons > .product-button {
      width: clamp(200px, 100%, 400px);
    }
  }

  @media (max-width: 600px) {
    .product-container {
      margin: 0.5rem 0 2rem 0;
    }
    .product-buttons {
      flex-direction: column;
      width: 100%;
    }
    .product-buttons > .product-button {
      width: 100%;
    }
  }
</style>
