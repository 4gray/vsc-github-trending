# VSC Github Trending

[![Version](https://vsmarketplacebadge.apphb.com/version/4gray.vsc-github-trending.svg)](https://marketplace.visualstudio.com/items?itemName=4gray.vsc-github-trending)
[![Installs](https://vsmarketplacebadge.apphb.com/installs-short/4gray.vsc-github-trending.svg)](https://marketplace.visualstudio.com/items?itemName=4gray.vsc-github-trending)
[![Downloads](https://vsmarketplacebadge.apphb.com/downloads-short/4gray.vsc-github-trending.svg)](https://marketplace.visualstudio.com/items?itemName=4gray.vsc-github-trending)

Explore Github Trending repositories directly from Visual Studio Code. Extension is based on React, [Material-UI](https://material-ui.com/), [Trending API](https://github.com/huchenme/github-trending-api) and VSCode Webview API.

<img src="https://raw.githubusercontent.com/4gray/vsc-github-trending/master/screenshot.png" title="VSC Github Trending" />

## Usage

Just press `Ctrl+P` or `Cmd+P` and type:

`> GT: Open Github Trending`

## Install

Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.

`ext install 4gray.vsc-github-trending`

Extension is available on [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=4gray.vsc-github-trending#overview)

## Usage and configuration

Use `vsc-github-trending.languages` option to set list of preferred languages which should be displayed in the extension, e.g.:

```
"vsc-github-trending.languages": [
    "c++"
    "css"
    "java",
    "javascript",
    "go",
    "python",
    "ruby",
    "rust",
    "typescript"
  ],
...
```

_Note: See [list](https://github-trending-api.now.sh/languages) of all supported languages (use `urlParam` for configuration)_

Selected language and time interval could also be configured, e.g.:

```
"vsc-github-trending.selectedInterval": "daily",
"vsc-github-trending.selectedLanguage": "javascript",
...
```

## Source Code

Source code of this extension is available on <a href="https://github.com/4gray/vsc-github-trending">Github</a>.

## Credits

-   [Github Trending API](https://github.com/huchenme/github-trending-api)
-   [VSCode React Starter](https://github.com/rebornix/vscode-webview-react)
-   Hot Icon by [Vaibhav Radhakrishnan](https://thenounproject.com/search/?q=hot&i=551479)
