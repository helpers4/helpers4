import { join } from "node:path";

/**
 * Directories used in the project.
 */
export const DIR = {
  ROOT: "./",
  BUILD: join("./", "build"),
  HELPERS: join("./", "helpers"),
  TEMPLATE: join("./", ".template"),
  TEMPLATE_CATEGORY: join("./", ".template", "category")
};
