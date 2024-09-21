import chalk from "chalk";
import { exec as execCallback } from "child_process";
import { promisify } from "util";

const exec = promisify(execCallback);

/**
 * Installs a list of Visual Studio Code extensions by executing
 * the `code --install-extension` command sequentially.
 *
 * @async
 * @function installExtensions
 * @param {string[]} extensions - An array of VSCode extension identifiers (e.g., 'ms-python.python').
 * @returns {Promise<void>} A promise that resolves when all extensions are installed.
 * @throws Will throw an error if the installation command fails for a given extension.
 *
 * @example
 * const extensions = ['ms-python.python', 'esbenp.prettier-vscode'];
 * installExtensions(extensions)
 *   .then(() => console.log('All extensions installed'))
 *   .catch((err) => console.error('Error installing extensions:', err));
 */
const installExtensions = async (extensions) => {
  let errorCount = 0;

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
};

export default installExtensions;
