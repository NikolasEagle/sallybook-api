import express, { Request, Response } from "express";

const port = process.env.PORT || 8080;

const app = express();

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello Cabtr");
});

app.listen(port, () => {
  console.log(`Service is running on http://localhost:${port}`);
});
