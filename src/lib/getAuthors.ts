export type Authors =
  | {
      name: string[];

      uri: string[];
    }[]
  | undefined;

export default function getAuthors(authors: Authors): string[] | [] {
  return authors ? authors.map((author) => author.name.join("")) : [];
}
