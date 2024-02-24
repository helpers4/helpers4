import { readdirSync } from "fs";

export const LIBS: Array<string> = readdirSync("./libs", {
  withFileTypes: true,
})
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);
