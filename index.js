#!/usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";
import installExtensions from "./src/installExtensions.js";

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
