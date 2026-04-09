import { defineCollection } from "astro:content"

import { glob } from "astro/loaders"

const products = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "src/content/products" })
})

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "src/content/posts" })
})

const firmware = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "src/content/firmware" })
})

export const collections = {
  products,
  posts,
  firmware
}
