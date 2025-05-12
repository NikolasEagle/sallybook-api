export type Categories = { $: { term: string; label: string } }[];

export default function getCategories(categories: Categories): string[] | [] {
  return categories ? categories.map((category) => category.$.term) : [];
}
