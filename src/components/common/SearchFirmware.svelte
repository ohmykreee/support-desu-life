<script lang="ts">
  import { fade } from "svelte/transition"
  let props = $props()
  let data: any[] = props.data || []

  let searchValue = $state("")
  let showResultCount = $derived(searchValue.length > 0)
  let result = $derived(
    searchValue
      ? data.filter((item: any) =>
          [item.label, item.device?.replace(/_/g, " "), item.version].some((value) =>
            value?.toLowerCase().includes(searchValue.toLowerCase().trim())
          )
        )
      : []
  )
  let resultCount = $derived(result.length)
</script>

<div class="search-box" role="search">
  <input
    type="text"
    placeholder="支持搜索固件名称、设备名称、固件版本"
    bind:value={searchValue}
    class="search__input"
    spellcheck="false"
    aria-label="搜索固件"
    role="searchbox"
  />
</div>
{#if showResultCount}
  <p class="search-box__result-count">
    搜索到 {resultCount} 条结果
  </p>
{/if}
{#if result.length > 0}
  <div class="search-box__result" transition:fade={{ duration: 200 }}>
    <div class="result-card">
      <ul class="result-list">
        {#each result as item (item.id)}
          <li class="result-item" transition:fade={{ duration: 200 }}>
            <a href={`/download/${item.id}`}>
              <div class="result-content">
                <h3 class="result-title">{item.label}</h3>
                <p class="result-info">
                  设备: {item.device}
                  {#if item.version}
                    | 版本: {item.version}{/if}
                </p>
              </div>
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
{/if}

<style>
  .search-box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-background-secondary);
    padding: 1rem 2rem;
    border-radius: 1rem;
    transition: box-shadow 0.2s ease;
  }
  .search-box input {
    width: 100%;
    height: 100%;
    border: none;
  }
  .search-box input:focus {
    outline: none;
  }
  .search-box:has(input:focus) {
    box-shadow: 0 0 0 1px var(--color-button-primary);
  }
  .search-box__result-count {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    color: var(--color-text-secondary);
  }
  .search-box__result {
    padding: 1rem;
    width: 100%;
  }
  .result-card {
    background-color: var(--color-background-secondary);
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  .result-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .result-item {
    border-bottom: 1px solid var(--color-border);
  }
  .result-item:last-child {
    border-bottom: none;
  }
  .result-item a {
    display: block;
    padding: 1rem;
    text-decoration: none;
    color: var(--color-text-primary);
    transition: all 0.2s ease;
    position: relative;
    margin-left: 0;
  }
  .result-item a:hover {
    background-color: var(--color-background-hover);
    transform: translateX(4px);
  }
  .result-item a:hover .result-title {
    color: var(--color-primary);
  }
  .result-item a:hover .result-info {
    color: var(--color-text-primary);
  }
  .result-item a::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background-color: var(--color-primary);
    transform: scaleY(0);
    transition: transform 0.2s ease;
    transform-origin: top;
  }
  .result-item a:hover::after {
    transform: scaleY(1);
  }
  .result-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    transition: transform 0.2s ease;
  }
  .result-title {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
    transition: color 0.2s ease;
  }
  .result-info {
    margin: 0;
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    transition: color 0.2s ease;
  }
</style>
