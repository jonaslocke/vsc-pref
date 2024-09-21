import chalk from "chalk";

const APPNAME = "vsc-pref";

export const optionCommand = ["-h, --help", "Display help information"];

const showHelp = () => {
  console.log(chalk.bgBlueBright(`\n Usage: %s [options] \n`), APPNAME);
  console.log(chalk.bgGreen(" Options: "));
  console.log(
    chalk.yellow(
      "\n  -i, --installExtensions <url>\t\tInstall specified VSCode extensions from a remote JSON."
    )
  );
  console.log(
    chalk.yellow(
      "  -v, --applyVsCodeSettings <url>\tApply VSCode settings from a remote JSON."
    )
  );
  console.log(chalk.yellow("  -h, --help\t\t\t\tDisplay this help message."));
  console.log(chalk.bgBlueBright("\n Examples: "));
  console.log(
    chalk.white(
      "\n npx %s --installExtensions https://example.com/extensions.json"
    ),
    APPNAME
  );
  console.log(
    chalk.white(
      " npx %s --applyVsCodeSettings https://example.com/settings.json"
    ),
    APPNAME
  );
  console.log(chalk.bgBlueBright("\nThank you for using %s tool!"), APPNAME);
};

export default showHelp;
