import chalk from "chalk";
import { exec as execCallback } from "child_process";
import fetch from "node-fetch"; // Use this if you're not on Node.js 18+
import { promisify } from "util";

const exec = promisify(execCallback);

/**
 * Installs a list of Visual Studio Code extensions by fetching a JSON file
 * from a URL that contains an array of extension IDs, and executing the
 * `code --install-extension` command sequentially.
 *
 * @async
 * @function installExtensions
 * @param {string} url - The URL pointing to the JSON file with extension IDs.
 * @returns {Promise<void>} A promise that resolves when all extensions are installed.
 * @throws Will throw an error if the URL fetch or installation command fails.
 *
 * @example
 * const url = 'https://example.com/extensions.json';
 * The json should look like this:
 * {
 *  "extensionIds": [
 *    "formulahendry.auto-rename-tag", 
 *    "alefragnani.Bookmarks"
 *  ]
 * }
 * installExtensions(url)
 *   .then(() => console.log('All extensions installed'))
 *   .catch((err) => console.error('Error installing extensions:', err));
 * 
 */
const installExtensions = async (url) => {
  let errorCount = 0;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch JSON from ${url}: ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!Array.isArray(data.extensionIds)) {
      throw new Error(
        "Invalid JSON structure: 'extensionIds' should be an array."
      );
    }

    const extensions = data.extensionIds;

    for (let index = 0; index < extensions.length; index++) {
      const extension = extensions[index];
      const command = `code --install-extension ${extension}`;

      try {
        console.log(
          chalk.bgGreenBright.bold("\n ✨ Installing Extensions (%s/%s) "),
          index + 1,
          extensions.length
        );

        const { stderr } = await exec(command);

        if (stderr) {
          errorCount++;
          console.error(chalk.bgRedBright.bold("\n ❌ Error: %s"), stderr);
          continue;
        }

        console.log(
          chalk.bgBlueBright.bold(
            `\n ${
              index % 2 === 1 ? "👓 " : "🕶 "
            } ${extension} installed successfully! `
          )
        );
      } catch (error) {
        console.error(
          chalk.bgRedBright.bold("\n ❌ Error installing %s: %s"),
          extension,
          error.message
        );
      }
    }

    const hasErrors = errorCount > 0;
    const endMessage = hasErrors
      ? chalk.bgRedBright.bold(
          `\n ❌ ${Number(extensions.length) - errorCount}/${
            extensions.length
          } extensions installed successfully! `
        )
      : chalk.bgMagentaBright.bold(
          `\n ✔ ${extensions.length} extensions installed successfully! `
        );

    console.log(endMessage);
  } catch (error) {
    console.error(chalk.bgRedBright.bold("\n ❌ Error: %s"), error.message);
  }
};

export default installExtensions;
