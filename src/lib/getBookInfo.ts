import axios from "axios";

interface Response {
  data: Body;
}

interface Body {
  kind: string;

  id: string;

  volumeInfo: Object;
}

interface BookInfo {
  id: string;
}

export default async function getBookInfo(
  host: string | undefined,
  key: string | undefined,
  bookId: string
): Promise<BookInfo> {
  const response: Response = await axios.get(`${host}/${bookId}?key=${key}`);

  const body: Body = response.data;

  return { id: body.id, ...body.volumeInfo };
}
