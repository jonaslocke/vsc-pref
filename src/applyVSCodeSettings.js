import chalk from "chalk";
import fs from "fs/promises";
import inquirer from "inquirer";
import fetch from "node-fetch";
import os from "os";
import path from "path";

export const optionCommand = [
  "-v, --applyVsCodeSettings <type>",
  "Apply VsCode Settings from a remote URL",
];

const askForOsType = async () => {
  const { osType } = await inquirer.prompt([
    {
      type: "list",
      name: "osType",
      message: chalk.bgBlueBright(" Which OS are you using? "),
      choices: ["windows", "mac"],
      default: "windows",
    },
  ]);
  return osType;
};
const confirmOverride = async () => {
  const { override } = await inquirer.prompt([
    {
      type: "list",
      name: "override",
      message: chalk.bgBlueBright(
        " How to handle your current settings, override or merge? "
      ),
      choices: ["override", "merge"],
      default: "override",
    },
  ]);
  return override;
};
const confirmContinue = async () => {
  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: chalk.blueBright(
        " Bad formatted 'settings.json' can prevent VsCode from open.\n   Are you sure you want to continue? "
      ),
      default: true,
    },
  ]);
  return confirm;
};

export const prompts = {
  os: askForOsType,
  override: confirmOverride,
  continue: confirmContinue,
};

/**
 * Fetches a remote `settings.json` file from a given URL and applies it to the
 * local Visual Studio Code `settings.json`, either by merging or overriding the local settings.
 * The settings can be applied to either Windows or macOS/Linux, based on the `osType` parameter.
 *
 * @async
 * @function applyVSCodeSettings
 * @param {string} url - The URL pointing to the remote `settings.json`.
 * @param {boolean} [override=false] - If true, overrides the local settings; if false, merges the remote settings with the local ones.
 * @param {string} [osType='windows'] - The operating system where the `settings.json` will be applied. Possible values are 'windows' or 'mac'.
 * @returns {Promise<void>} A promise that resolves when the settings have been applied.
 * @throws Will throw an error if the URL fetch or file operations fail.
 *
 * @example
 * const url = 'https://example.com/settings.json';
 * applyVSCodeSettings(url, true, 'mac')
 *   .then(() => console.log('VSCode settings applied successfully'))
 *   .catch((err) => console.error('Error applying settings:', err));
 */
const applyVSCodeSettings = async (
  url,
  override = false,
  osType = "windows"
) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch settings.json from ${url}: ${response.statusText}`
      );
    }

    const remoteSettings = await response.json();

    let vscodeSettingsPath;

    switch (osType.toLowerCase()) {
      case "mac":
        vscodeSettingsPath = path.join(
          os.homedir(),
          ".config",
          "Code",
          "User",
          "settings.json"
        );
        break;
      case "windows":
        vscodeSettingsPath = path.join(
          os.homedir(),
          "AppData",
          "Roaming",
          "Code",
          "User",
          "settings.json"
        );
        break;
    }

    let localSettings = {};

    if (!override) {
      try {
        const localSettingsData = await fs.readFile(
          vscodeSettingsPath,
          "utf-8"
        );

        if (localSettingsData.trim()) {
          localSettings = JSON.parse(localSettingsData);
        } else {
          console.log(
            chalk.bgYellowBright(
              "\n 💿 Local settings.json is empty. Initializing as an empty object. "
            )
          );
          localSettings = {};
        }
      } catch (error) {
        if (error.code !== "ENOENT") {
          throw error;
        }
        console.log(
          chalk.bgYellowBright(
            "\n 🎈 No existing settings.json found. Creating a new one. "
          )
        );
      }
    }

    const finalSettings = override
      ? remoteSettings
      : { ...localSettings, ...remoteSettings };

    await fs.writeFile(
      vscodeSettingsPath,
      JSON.stringify(finalSettings, null, 2)
    );

    console.log(
      chalk.bgGreenBright(
        `\n ✔ VSCode settings ${
          override ? "overridden" : "merged"
        } successfully on ${
          osType === "mac" ? "🍎" : "🎞"
        } ${osType.toUpperCase()}! `
      )
    );
  } catch (error) {
    console.error(chalk.bgRedBright(`\n ❌ Error: ${error.message} `));
  }
};

export default applyVSCodeSettings;
