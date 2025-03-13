import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 8080;

const hostApi = process.env.HOST_API_FLIBUSTA;

const app = express();

import getAllBooks from "./lib/getAllBooks.ts";
import searchBooks from "./lib/searchBooks.ts";

app.get("/api/books/:pageId", async (req: Request, res: Response) => {
  try {
    const pageId: number = +req.params.pageId;

    const result: Object | null = await getAllBooks(hostApi, pageId);

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

      const result: Object | null = await searchBooks(hostApi, query, pageId);

      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
);

app.listen(port, () => {
  console.log(`Service is running on http://localhost:${port}`);
});
