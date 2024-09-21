# VsC Prefences

![chalk](https://img.shields.io/badge/chalk-5.3.0-brightgreen) ![commander](https://img.shields.io/badge/commander-12.1.0-blue) ![inquirer](https://img.shields.io/badge/inquirer-11.0.2-orange) ![node-fetch](https://img.shields.io/badge/node--fetch-3.3.2-yellowgreen)
  
## Description 
  
The `VsC Prefences CLI Tool` is a command-line interface designed to streamline the management of Visual Studio Code (VSCode) extensions and settings. With this tool, you can easily install multiple extensions at once and apply your personalized VSCode settings from a remote JSON file.

Whether you are setting up a new development environment or sharing your preferred configurations with your team, this CLI tool simplifies the process and saves you time.

I'm lazy enough to think of something like this, but motivated at the right amount to build this up, go figure...

### Features:
- Install Extensions: Quickly install one or more `VSCode` extensions by specifying their IDs. Ideal for automating your development setup.
- Apply VSCode Settings: Import and apply a settings configuration from a remote JSON file, allowing for consistent setups across different machines or users.
- Cross-Platform Support: Designed to work seamlessly on both `Windows` and `MacOS` environments, making it accessible to a wider range of users.

## Table of Contents
* [Usage](#usage)
* [Example JSON](#example)
* [License](#license)

## Usage 
`vsc-pref -i, --installExtensions <url>`
`vsc-pref -v, --applyVsCodeSettings <url>`

## Example

#### Install Extensions

To install extensions using the CLI tool, you can specify one or more extension IDs in the command. Below is an example of how the input might look in JSON format for installing extensions.

[Example](./examples/extensions.json)

`
    {
        "extensions": [
            "formulahendry.auto-rename-tag",
            "alefragnani.Bookmarks"
        ]
    }
`
#### Apply VSCode Settings

When applying VSCode settings, you will need a JSON file hosted at a remote URL. This JSON file should contain your VSCode settings.

[Example](./examples/settings.json)

`
    {
        "editor.fontSize": 14,
        "editor.lineHeight": 1.5,
        "workbench.colorTheme": "One Dark Pro",
        "files.autoSave": "afterDelay",
        "extensions.ignoreRecommendations": true,
        "editor.tabSize": 4,
        "editor.wordWrap": "on",
        "window.zoomLevel": 0
    }
`
  
## License

GNU LGPLv3

---

## Questions?

<img src="https://avatars.githubusercontent.com/u/55599921?v=4" alt="jonaslocke" width="40%" />

For any questions, please contact me with the information below:

GitHub: [@jonaslocke](https://api.github.com/users/jonaslocke)
  