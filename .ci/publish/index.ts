import { readdir } from "fs-extra";
import { join } from "path";
import { exec } from "child_process";
import { DIR } from "../_constants";

async function main() {
  // Capture additional arguments passed to the script
  const args = process.argv.slice(2).join(" ");

  // Read categories in the /build directory
  const categories = await readdir(DIR.BUILD);

  // Publish each category with additional arguments
  for (const category of categories) {
    await publishCategory(category, args);
    console.info(` ✔️🚀 Published ${category}`);
  }
}

/**
 * Publish a category to the package registry.
 * 
 * @param category The category name.
 * @param args Additional arguments for the publish command.
 * @returns A promise that resolves when the publish command completes.
 */
async function publishCategory(category: string, args: string) {
  // Execute the publish command for the given category with additional arguments
  return new Promise<void>((resolve, reject) => {
    exec(`bun publish ${args}`, { cwd: join(DIR.BUILD, category) }, (error, stdout, stderr) => {
      if (error) {
        // Log an error if the publish command fails
        console.error(`❌ Error publishing ${category}:`, stderr);
        reject(error);
      } else {
        // Log the output of the publish command
        console.log(stdout);
        resolve();
      }
    });
  });
}

// Entry point of the script
main().catch(error => {
  // Log an error and exit if the script fails
  console.error("❌ Publish failed:", error);
  process.exit(1);
});
