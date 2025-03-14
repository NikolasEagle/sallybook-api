import checkNextPage, { Links } from "./checkNextPage.ts";
import convertEntryData, { Entries, Data } from "./convertEntryData.ts";

import axios from "axios";

import { parseStringPromise } from "xml2js";

interface Response {
  data: XMLDocument;
}

interface Body {
  feed: {
    link: Links;
    entry: Entries;
  };
}

interface Books {
  currentPage: number;

  data: Data;

  nextPage: number | null;
}

export default async function getAllBooks(
  host: string | undefined,
  pageId: number
): Promise<Books> {
  const currentPage = pageId;

  const response: Response = await axios.get(
    `${host}/opds/new/${pageId !== 0 ? pageId - 1 : 0}/new`
  );

  const xml: XMLDocument = response.data;

  const body: Body = await parseStringPromise(xml);

  const nextPage = checkNextPage(body.feed.link) ? currentPage + 1 : null;

  const data: Data = convertEntryData(host, body.feed.entry);

  return { currentPage: currentPage, data: data, nextPage: nextPage };
}
