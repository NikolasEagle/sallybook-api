export type Links = { $: { href: string; rel: string; type: string } }[];

export default function checkNextPage(links: Links): boolean {
  const foundLink = links.find((link) => link.$.rel === "next");

  const isNextPage = foundLink ? true : false;

  return isNextPage;
}
