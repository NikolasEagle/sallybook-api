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

export default async function searchBooks(
  host: string | undefined,
  key: string | undefined,
  query: string,
  pageId: number
): Promise<Books> {
  const currentPage: number = pageId;

  const startIndex: number = (currentPage - 1) * 30;

  if (startIndex > 1000) {
    return {
      currentPage: currentPage,
      totalItems: null,
      data: [],
      nextPage: null,
    };
  }

  const response: Response = await axios.get(
    `${host}?key=${key}&q=intitle:${query}&startIndex=${startIndex}&projection=lite&maxResults=30&language=ru-RU`
  );

  const body: Body = response.data;

  const totalItems = body.totalItems;

  const data = body.items;

  return {
    currentPage: currentPage,
    totalItems: data ? totalItems : null,
    data: data ? data : [],
    nextPage: totalItems >= startIndex + 30 ? currentPage + 1 : null,
  };
}
