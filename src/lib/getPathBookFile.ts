import axios from "axios";

import jsdom from "jsdom";

interface Response {
  data: string;
}

type Body = string;

type Doc = jsdom.JSDOM;

interface ResponseJSON {
  data: JSON;
}

interface JSON {
  files: Object;
}

async function getIdBookEdition(
  host: string | undefined,
  bookTitle: string,
  bookPublisher: string
) {
  const response: Response = await axios.get(
    `${host}/index.php?req=${bookTitle}+${bookPublisher}&curtab=e`
  );

  const body: Body = response.data;

  const doc: Doc = new jsdom.JSDOM(body);

  const navLinks: NodeListOf<HTMLAnchorElement> =
    doc.window.document.querySelectorAll("a.nav-link");

  const jsonLink: HTMLAnchorElement | undefined = [...navLinks].find((link) =>
    /^\/json.php/.test(link.href)
  );

  if (jsonLink) {
    const href: string = jsonLink.href;

    const ids: Array<string> = href.slice(href.indexOf("ids=") + 4).split(",");

    const necessaryId: string = ids[0];

    return necessaryId;
  }

  return null;
}

async function getMD5BookFile(host: string | undefined, editionId: string) {
  const response: ResponseJSON = await axios.get(
    `${host}/json.php?object=e&ids=${editionId}`
  );

  const json: JSON = response.data;

  const files: Object = Object.values(json)[0].files;

  console.log(files);

  if (files) {
    const necessaryMD5 = Object.values(files)[0]["md5"];

    console.log(necessaryMD5);

    return necessaryMD5;
  }

  return null;
}

export default async function getPathBookFile(
  host: string | undefined,
  bookTitle: string,
  bookPublisher: string
) {
  const editionId: string | null = await getIdBookEdition(
    host,
    bookTitle,
    bookPublisher
  );

  if (editionId) {
    const md5File = await getMD5BookFile(host, editionId);

    if (md5File) {
      const response: Response = await axios.get(
        `${host}/ads.php?md5=${md5File}`
      );

      const body: Body = response.data;

      const doc: Doc = new jsdom.JSDOM(body);

      const h2s: NodeListOf<HTMLHeadingElement> =
        doc.window.document.querySelectorAll("h2");

      const downloadH2: HTMLHeadingElement | undefined = [...h2s].find((h2) =>
        /^GET/g.test(h2.innerHTML)
      );

      const downloadAnchorElement: any = downloadH2?.parentElement;

      const downloadHref: string = downloadAnchorElement.href;

      console.log(downloadHref);

      return downloadHref;
    }
    return null;
  }

  return null;
}
