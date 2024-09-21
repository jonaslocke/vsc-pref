#!/usr/bin/env node
const BACKGROUND_COLOR = "#BB9AF7";
const FONT_COLOR = "#7AA2F7";

import chalk from "chalk";
import { Command } from "commander";
import applyVSCodeSettings, {
  optionCommand as avcsc,
  prompts,
} from "./src/applyVSCodeSettings.js";
import installExtensions, {
  optionCommand as iec,
} from "./src/installExtensions.js";

const program = new Command();

program
  .version("1.0.0")
  .description("A CLI tool to apply my VsCode preferences")
  .option("-n, --name <type>", "Say hello to a name")
  .option(...iec)
  .option(...avcsc)
  .parse(process.argv);

const options = program.opts();

(async () => {
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
      installExtensions(options.installExtensions);
      break;
    case Boolean(options.applyVsCodeSettings):
      const osType = await prompts.os();
      const override = await prompts.override();
      const isConfirmed = await prompts.continue();

      if (!isConfirmed) {
        console.log(chalk.bgRedBright("\n ⭕ Operation cancelled. "));
        break;
      }

      const currentOS = process.platform === "win32" ? "windows" : "mac";
      if (
        (osType === "windows" && currentOS === "mac") ||
        (osType === "mac" && currentOS === "windows")
      ) {
        console.log(
          chalk.bgRedBright(
            "\n ❌ Error: The selected OS type does not match your current environment. "
          )
        );
        break;
      }

      await applyVSCodeSettings(
        options.applyVsCodeSettings,
        override === "override",
        osType
      );
      break;
    default:
      console.log(chalk.yellow("Hello, world!"));
      break;
  }
})();
