import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 8080;

const hostGoogleBooks = process.env.HOST_API_GOOGLE_BOOKS;
const apiKeyGoogleBooks = process.env.API_KEY_GOOGLE_BOOKS;

const app = express();

import getAllBooks from "./lib/getAllBooks.ts";
import searchBooks from "./lib/searchBooks.ts";
import getBookInfo from "./lib/getBookInfo.ts";

app.get("/api/books/:pageId", async (req: Request, res: Response) => {
  try {
    const pageId: number = +req.params.pageId;

    const result: Object = await getAllBooks(
      hostGoogleBooks,
      apiKeyGoogleBooks,
      pageId
    );

    res.json(result);
  } catch (error) {
    console.error(error);
  }
});

app.get(
  "/api/books/search/:query/:pageId",
  async (req: Request, res: Response) => {
    try {
      const pageId: number = +req.params.pageId;

      const query: string = req.params.query;

      const result: Object = await searchBooks(
        hostGoogleBooks,
        apiKeyGoogleBooks,
        query,
        pageId
      );

      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
);

app.get("/api/book/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId: string = req.params.bookId;

    const result: Object = await getBookInfo(
      hostGoogleBooks,
      apiKeyGoogleBooks,
      bookId
    );

    res.json(result);
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Service is running on http://localhost:${port}`);
});
