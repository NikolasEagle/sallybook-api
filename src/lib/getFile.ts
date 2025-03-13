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

  return foundLink ? `${host}${foundLink.$.href}` : null;
}
