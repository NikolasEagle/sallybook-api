export type Files = {
  $: {
    href: string;

    rel: string;

    type: string;
  };
}[];

export default function getFile(
  host: string | undefined,
  files: Files,
  type: string
) {
  const regExpType = new RegExp(type);

  const foundLink = files.find((file) => regExpType.test(file.$.type));

  if (type === "epub") {
    return foundLink
      ? `/api/book/${foundLink.$.href.replace("/b/", "").replace("/epub", "")}`
      : null;
  }

  return foundLink ? `${host}${foundLink.$.href}` : null;
}
