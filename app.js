import express from "express";

const port = process.env.PORT;

const app = express();

app.listen(port, () => {
  console.log(`Service is running on http://localhost:${port}`);
});
