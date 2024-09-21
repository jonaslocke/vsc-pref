#!/usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";
import applyVSCodeSettings, {
  prompts,
  optionCommand as vc,
} from "./src/applyVSCodeSettings.js";
import installExtensions, {
  optionCommand as ic,
} from "./src/installExtensions.js";
import showHelp, { optionCommand as hc } from "./src/showHelp.js";

const program = new Command();

program
  .version("1.0.1")
  .description("A CLI tool to apply your VsCode Preferences and Extensions")
  .option(...ic)
  .option(...vc)
  .option(...hc)
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
    default:
      showHelp();
  }
})();
