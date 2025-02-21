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

  data: Object[] | [];

  nextPage: number | null;
}

export default async function getAllBooks(
  host: string | undefined,
  key: string | undefined,
  pageId: number
): Promise<Books> {
  const currentPage: number = pageId;

  const startIndex: number = (currentPage - 1) * 30;

  if (startIndex > 1000) {
    return { currentPage: currentPage, data: [], nextPage: null };
  }

  const response: Response = await axios.get(
    `${host}?key=${key}&q=intitle:&startIndex=${startIndex}&projection=lite&maxResults=30&language=ru-RU`
  );

  const body: Body = response.data;

  if (body.items) {
    const data = body.items;

    return {
      currentPage: currentPage,
      data: data,
      nextPage: currentPage < 17 ? currentPage + 1 : null,
    };
  }

  return { currentPage: currentPage, data: [], nextPage: null };
}
