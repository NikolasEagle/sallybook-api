import axios from "axios";

interface Response {
  data: Body;
}

interface Body {
  items: Object[] | [];
}

interface Books {
  currentPage: number;

  data: Data;

  nextPage: number | null;
}

type Data = Object[];

const maxResults: number = 30;

export default async function getAllBooks(
  host: string | undefined,
  key: string | undefined,
  pageId: number
): Promise<Books> {
  const currentPage: number = pageId;

  const startIndex: number = (currentPage - 1) * maxResults;

  const response: Response = await axios.get(
    `${host}?key=${key}&q=intitle:&startIndex=${startIndex}&projection=lite&maxResults=${maxResults}&language=ru-RU`
  );

  const body: Body = response.data;

  const data = body.items;

  const nextPageResponse: Response = await axios.get(
    `${host}?key=${key}&q=intitle:&startIndex=${
      startIndex + maxResults
    }&projection=lite&maxResults=${maxResults}&language=ru-RU`
  );

  const nextPageBody: Body = nextPageResponse.data;

  const nextPage = nextPageBody.items ? currentPage + 1 : null;

  return { currentPage: pageId, data: data, nextPage: nextPage };
}
