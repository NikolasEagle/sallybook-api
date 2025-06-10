import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

import request from "request";

const hostApi = process.env.HOST_API_FLIBUSTA;

const app = express();

import getAllBooks from "./lib/getAllBooks.ts";
import searchBooks from "./lib/searchBooks.ts";

app.get("/api/books/:pageId", async (req: Request, res: Response) => {
  try {
    const pageId: number = +req.params.pageId;

    const result: Object = await getAllBooks(hostApi, pageId);

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

      const result: Object = await searchBooks(hostApi, query, pageId);

      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
);

app.get("/api/book/:fileId", async (req: Request, res: Response) => {
  const { fileId } = req.params;
  request.get(`${hostApi}/b/${fileId}/epub`).pipe(res);
});

app.listen(process.env.SERVER_API_PORT, () => {
  console.log(`Service is running on ${process.env.SERVER_API_PORT}`);
});
