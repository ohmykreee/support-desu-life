<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  interface SearchItem {
    id: string;
    title: string;
    type: "post" | "firmware";
    slug?: string;
    content?: string;
    description?: string;
    device?: string;
    version?: string;
  }

  let props = $props<{ data: SearchItem[] }>();
  let data = props.data || [];

  let searchValue = $state("");
  let results = $state<SearchItem[]>([]);

  let searchDone = $state(false);

  function handleSearch(e: Event | null = null) {
    e?.preventDefault();
    if (!searchValue.trim()) {
      results = [];
      return;
    }
    results = data.filter((item: SearchItem) => {
      if (item.type === "post") {
        return [item.title, item.content, item.description].some((value) =>
          value?.toLowerCase().includes(searchValue.toLowerCase().trim())
        );
      } else {
        return [item.title, item.device?.replace(/_/g, " ")].some((value) =>
          value?.toLowerCase().includes(searchValue.toLowerCase().trim())
        );
      }
    });
    searchDone = true;
  }

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    searchValue = params.get("q") ?? "";
    if (searchValue) {
      handleSearch();
    }
  });
</script>

<div class="search-box">
  <form onsubmit={handleSearch}>
    <input
      type="text"
      placeholder="搜索文章标题、内容或固件..."
      bind:value={searchValue}
      class="search__input"
      spellcheck="false"
    />
    <button type="submit" class="search__button">
      <Icon icon="solar:magnifer-linear" class="icon" />
    </button>
  </form>
</div>

{#if searchDone}
  {#if results.length > 0}
    <p class="search-box__result-count">
      搜索到 {results.length} 条结果
    </p>
  {:else}
    <p class="search-box__result-count">没有找到任何结果</p>
  {/if}
{/if}

{#if results.length > 0}
  <div class="search-box__result">
    <div class="result-card">
      <ul class="result-list">
        {#each results as result}
          <li class="result-item">
            <a href={result.type === "post" ? `/posts/${result.slug}` : `/download/${result.id}`}>
              <div class="result-content">
                <h3 class="result-title">{result.title}</h3>
                <p class="result-info">
                  {#if result.type === "post"}
                    {#if result.description}
                      {result.description}
                    {:else}
                      {result.content?.substring(0, 150)}...
                    {/if}
                  {:else}
                    设备: {result.device} | 版本: {result.version}
                  {/if}
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
  .search-box form {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .search-box input {
    flex: 1;
    height: 100%;
    border: none;
    background: transparent;
    font-size: 1.1rem;
  }
  .search-box input:focus {
    outline: none;
  }
  .search-box:has(input:focus) {
    box-shadow: 0 0 0 1px var(--color-button-primary);
  }
  .search__button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: var(--color-text-secondary);
    transition: color 0.2s ease;
  }
  .search__button:hover {
    color: var(--color-primary);
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
