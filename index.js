#!/usr/bin/env node
import chalk from "chalk";
import { exec } from "child_process";
import { Command } from "commander";

const program = new Command();

const BACKGROUND_COLOR = "#BB9AF7";
const FONT_COLOR = "#7AA2F7";


/*
    Take advantage of console.log string substitution:
    const name = 'Sindre';
    console.log(chalk.green('Hello %s'), name);
    //=> 'Hello Sindre'
*/


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
    console.error("Error: bad payload");
    return;
  }

  extensions.forEach((extension) => {
    const command = `code --install-extension ${extension}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error installing ${extension}: ${error.message}`);
        return;
      }

      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }

      console.log(`stdout: ${stdout}`);
      console.log(`${extension} installed successfully!`);
    });
  });
};

const extensions = ["formulahendry.auto-rename-tag", "alefragnani.Bookmarks"];

switch (true) {
  case Boolean(options.name):
    console.log(chalk.white.bgHex(BACKGROUND_COLOR).bold(' Hello %s! '), options.name)
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
