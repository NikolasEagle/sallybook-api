import { JSDOM } from "jsdom";

export type Contents = {
  _: string;

  $: {
    type: string;
  };
}[];

export default function getDescription(contents: Contents): string {
  const htmlString = contents[0]["_"];

  const dom: JSDOM = new JSDOM(htmlString);

  const description: string = dom.window.document.body.textContent!;

  return description;
}
