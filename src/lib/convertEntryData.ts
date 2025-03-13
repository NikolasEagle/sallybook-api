import getAuthors, { Authors } from "./getAuthors.ts";
import getCategories, { Categories } from "./getCategories.ts";
import getFile, { Files } from "./getFile.ts";
import getDescription, { Contents } from "./getDescription.ts";

export type Entries = {
  id: string[];
  updated: string[];
  author: Authors;
  title: string[];
  category: Categories;
  content: Contents;
  link: Files;
}[];

export type Data = {
  id: string;

  addedDate: string;

  title: string;

  authors: string[] | [];

  categories: string[] | [];

  description: string;

  cover: string | null;

  bookFile: string | null;
}[];

export default function convertEntryData(
  host: string | undefined,
  entries: Entries
): Data {
  const data = entries.map((entry) => {
    const id = entry.id.join("");

    const addedDate = entry.updated.join("");

    const title = entry.title.join("");

    const authors = getAuthors(entry.author);

    const categories = getCategories(entry.category);

    const description = getDescription(entry.content);

    const cover = getFile(host, entry.link, "jpeg");

    const bookFile = getFile(host, entry.link, "epub");

    return {
      id: id,

      addedDate: addedDate,

      title: title,

      authors: authors,

      categories: categories,

      description: description,

      cover: cover,

      bookFile: bookFile,
    };
  });

  return data;
}
