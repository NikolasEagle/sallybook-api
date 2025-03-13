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

export default async function searchBooks(
  host: string | undefined,
  query: string,
  pageId: number
): Promise<Books | null> {
  try {
    const response: Response = await axios.get(
      pageId === 1
        ? `${host}/opds/search?searchType=books&searchTerm=${query}`
        : `${host}/opds/search?searchType=books&searchTerm=${query}&pageNumber=${
            pageId - 1
          }`
    );

    const xml: XMLDocument = response.data;

    const body: Body = await parseStringPromise(xml);

    const currentPage = pageId;

    const nextPage = checkNextPage(body.feed.link) ? currentPage + 1 : null;

    const data: Data = convertEntryData(host, body.feed.entry);

    return { currentPage: currentPage, data: data, nextPage: nextPage };
  } catch (error) {
    console.error(error);
    return null;
  }
}
