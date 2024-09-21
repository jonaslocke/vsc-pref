#!/usr/bin/env node
import chalk from "chalk";
import { exec } from "child_process";
import { Command } from "commander";

const program = new Command();

const BACKGROUND_COLOR = "#BB9AF7";
const FONT_COLOR = "#7AA2F7";

program
  .version("1.0.0")
  .description("A CLI tool to apply my VsCode preferences")
  .option("-n, --name <type>", "Say hello to a name")
  .option("-ie, --installExtensions <type>", "Install VsCode Extensions")
  .parse(process.argv);

const options = program.opts();
console.log(options);

const installExtensions = (extensions) => {
  if (!Array.isArray(extensions) || extensions.length < 1) {
    console.error(chalk.bgRedBright.bold(" ❌ Error: bad payload "));
    return;
  }

  let errorCount = 0;

  for (const index in extensions) {
    const extension = extensions[index];
    const command = `code --install-extension ${extension}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(
          chalk.bgRedBright.bold(" ❌ Error installing %s: %s"),
          extension,
          error.message
        );
        return;
      }

      if (stderr) {
        errorCount++;
        console.error(chalk.bgRedBright.bold(" ❌ Error: %s"), stderr);
        return;
      }

      console.log(
        chalk.bgGreenBright.bold("\n ✨✨ Installing Extensions (%s/%s) "),
        Number(index) + 1,
        extensions.length
      );

      console.log(
        chalk.bgBlueBright.bold(
          `\n ${
            index % 2 === 1 ? "👓 " : "🕶 "
          } ${extension} installed successfully! `
        )
      );
    });
  }

  const hasErrors = errorCount > 0;
  const endMessage = hasErrors
    ? chalk.bgRedBright.bold(
        ` ❌ ${Number(extensions.length) - errorCount}/${
          extensions.length
        } extensions installed successfully! `
      )
    : chalk.bgBlueBright.bold(
        ` ✔ ${extensions.length} extensions installed successfully! `
      );
};

const extensions = ["formulahendry.auto-rename-tag", "alefragnani.Bookmarks"];

/*
	readonly black: this;
	readonly red: this;
	readonly green: this;
	readonly yellow: this;
	readonly blue: this;
	readonly magenta: this;
	readonly cyan: this;
	readonly white: this;
*/

switch (true) {
  case Boolean(options.name):
    console.log(chalk.yellow.bgGreen.bold(" Hello %s! "), options.name);

    console.error(chalk.bgRedBright.bold(" ❌ Error: bad payload "));
    console.error(chalk.bgRedBright.bold(" ❌ Error: %s "), 1);

    console.log(
      chalk.bgBlueBright.bold(` ${"👓🕶"} ${2} installed successfully! `)
    );
    console.log(chalk.bgMagenta.bold(` ✔ ${1} installed `));

    break;
  case Boolean(options.installExtensions):
    installExtensions(extensions);
    break;
  default:
    console.log(chalk.yellow("Hello, world!"));
    break;
}

/**
 * Install a list of VSCode extensions by executing the `code --install-extension` command.
 * @param {string[]} extensions - Array of VSCode extension names to install.
 */
