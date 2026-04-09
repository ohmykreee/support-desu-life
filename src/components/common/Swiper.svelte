<script lang="ts">
  import { onMount } from "svelte"
  import { register } from "swiper/element/bundle"

  onMount(() => {
    register()
  })

  type Image = {
    src: string
    alt: string
  }
  export let images: Image[] = []
</script>

<swiper-container navigation="true" scrollbar="true" autoplay="true" loop="true">
  <!-- TODO: Ugly fix: 尽量不要用自增 i 作为 each 的 key -->
  {#each images as image, i (i)}
    <swiper-slide class="swiper-slide">
      <img src={image.src} alt={image.alt} class="swiper-slide-img" />
    </swiper-slide>
  {/each}
</swiper-container>

<style>
  swiper-container {
    display: block;
    --swiper-navigation-color: var(--color-text);
  }
  .swiper-slide {
    width: 100%;
    height: 100%;
    background-color: #202020;
  }
  .swiper-slide-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
