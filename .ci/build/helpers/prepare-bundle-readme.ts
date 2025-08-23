import { join } from "node:path";
import { DIR } from "../../_constants";

/**
 * Copy and prepare the README.md file for the bundle directory.
 * @param buildBundleDir - The build bundle directory.
 * @param categories - The list of available categories.
 */
export async function prepareBundleReadme(
  buildBundleDir: string,
  categories: string[]
) {
  // Read the template README
  const templateReadme = await Bun.file(join(DIR.TEMPLATE_BUNDLE, "README.md")).text();

  // Generate the categories list
  const categoriesList = categories
    .map(category => `- **@helpers4/${category}**: ${category} utilities`)
    .join('\n');

  // Generate the individual packages list
  const individualPackagesList = categories
    .map(category => `- \`npm install @helpers4/${category}\``)
    .join('\n');

  // Replace placeholders
  const readme = templateReadme
    .replace('{{categories}}', categoriesList)
    .replace('{{individual_packages}}', individualPackagesList);

  // Use Bun's native file writing
  await Bun.write(join(buildBundleDir, "README.md"), readme);
}
