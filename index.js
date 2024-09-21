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
import showHelp from "./src/showHelp.js";

const program = new Command();

program
  .version("1.0.0")
  .description("A CLI tool to apply your VsCode Preferences and Extensions")
  .option(...iec)
  .option(...avcsc)
  .option("-h, --help", "Display help information")
  .parse(process.argv);

const options = program.opts();

(async () => {
  switch (true) {
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
    case Boolean(options.help):
      showHelp();
      break;
  }
})();
