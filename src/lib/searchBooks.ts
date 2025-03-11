import axios from "axios";

interface Response {
  data: Body;
}

interface Body {
  kind: string;

  totalItems: number;

  items: Object[] | [];
}

interface Books {
  currentPage: number;

  totalItems: number | null;

  data: Object[] | [];

  nextPage: number | null;
}

const maxResults: number = 30;

export default async function searchBooks(
  host: string | undefined,
  key: string | undefined,
  query: string,
  pageId: number
): Promise<Books> {
  const currentPage: number = pageId;

  const startIndex: number = (currentPage - 1) * maxResults;

  const response: Response = await axios.get(
    `${host}?key=${key}&q=intitle:${query}&startIndex=${startIndex}&projection=lite&maxResults=${maxResults}&language=ru-RU`
  );

  const body: Body = response.data;

  const totalItems = body.totalItems;

  const data = body.items;

  const nextPageResponse: Response = await axios.get(
    `${host}?key=${key}&q=intitle:${query}&startIndex=${
      startIndex + maxResults
    }&projection=lite&maxResults=${maxResults}&language=ru-RU`
  );

  const nextPageBody: Body = nextPageResponse.data;

  const nextPage = nextPageBody.items ? currentPage + 1 : null;

  return {
    currentPage: pageId,
    totalItems: totalItems,
    data: data,
    nextPage: nextPage,
  };
}
