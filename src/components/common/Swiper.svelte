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
  <!-- 因为这里使用 image.src 作为唯一 key，故产品图片名称不要使用同样的名字，不然会渲染错误 -->
  {#each images as image (image.src)}
    <swiper-slide class="swiper-slide">
      <img src={image.src} alt={image.alt} class="swiper-slide-img" />
    </swiper-slide>
  {/each}
</swiper-container>

<style>
  swiper-container {
    display: block;
    --swiper-navigation-color: #fff;
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
