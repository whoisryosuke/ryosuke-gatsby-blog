---
title: "My Visual Studio Code Setup 🎨"
date: "2018-07-27"
section: blog
cover_image: "./vs-code-setup-1920px.jpg"
tags: [ 'vscode', 'tips', 'resource' ]
---

I had to do some development on another computer recently, and after settling down in front of a desk with the default VSCode config, I quickly realized how much of my local environment and workflow needed to be configured and installed. 

## Backing up your VSCode setup ⬇️

Luckily, VSCode makes it a fairly easy process to backup your settings and extensions. Your configuration is a JSON file, making it a effortless copy and paste scenario. And as for the extensions, you just install a bash script to back everything up. This generates a list of Bash commands that install each individual extension:

 ```bash
 code --list-extensions | xargs -L 1 echo code --install-extension
 ``` 

> To install the code Bash alias on Mac, go to Command Palette and type "install command" to find the shell script. Make sure to install it on both your backup, and new computer.

## My setup 🎨

### JSON Configuration 🔧

Not too much special here. Only a couple customizations of hotkeys (I used to use Sublime, so I prefer those shortcuts). I modified the Palenight Italic theme because I didn't like the contrast of some sections (like the sidebar color).

```json
{
    "workbench.colorTheme": "Palenight Italic",
    "editor.fontFamily": "Fira Code",
    "editor.fontSize": 13,
    "workbench.iconTheme": "material-icon-theme",
    "sublimeTextKeymap.promptV3Features": true,
    "editor.multiCursorModifier": "ctrlCmd",
    "editor.snippetSuggestions": "top",
    "editor.formatOnPaste": true,
    "window.zoomLevel": 0,
    "workbench.colorCustomizations": {
        "[Palenight Italic]": {
            "sideBar.background": "#222635",
            "sideBarSectionHeader.background": "#222635",
            "tab.activeBackground": "#222635",
            "editor.background": "#222635",
            "editorHoverWidget.background": "#222635",
            "debugExceptionWidget.background": "#222635",
            "peekViewTitle.background": "#222635",
            "panel.background": "#222635",
            "statusBar.noFolderBackground": "#222635",
            "notifications.background": "#222635",
            "debugToolBar.background": "#222635",
            "tab.inactiveBackground": "#2d3244",
            "tab.inactiveForeground": "#929ac9",
            "sideBar.foreground": "#7179a1",
        }
    },
    "javascript.updateImportsOnFileMove.enabled": "never",
    "files.associations": {
        "*.js": "javascriptreact"
    }
}
```

### Extensions ⚙️

Just a few of the must-haves. 

* **Project Manager** is great for keeping track of projects across your computer/drives. 
* **ES7 / ReactJS** snippets are a must.Start typing `r`...to get premade React component structures (like functional or Redux containers)
* **PHP Intellisense** - This is a must for PHP developers working with complex application. Hover over any method/function to see it's documentation, and click the tooltip to navigate directly to the function's source file.
* **PHP Docblocker** - Makes documenting PHP code easy. Type `/**` to generate a docblock based on your function. It'll automatically pick up things like the return value and toss it in your docs (complete with type checking).
* **Todo Tree** - If you ever find yourself leaving `// @todo` comments in your code, this extension will scan your code and find all them to place in a todo list.
* **Polacode** - Great way to quickly take screenshots of your code, all styled with your editors theme.
* **Multi-line find and replace** - Ever need to copy more than one line of code without adding regex manually? Select text, open up the command palette, and choose this plugin to copy a valid regex search. This is essential for VSCode since it doesn't support this by default.

```js
code --install-extension alefragnani.project-manager
code --install-extension axlan.multiline-find-and-replace
code --install-extension cjhowe7.laravel-blade
code --install-extension dbaeumer.vscode-eslint
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension felixfbecker.php-intellisense
code --install-extension Gruntfuggly.todo-tree
code --install-extension HookyQR.beautify
code --install-extension joelday.docthis
code --install-extension juanmnl.vscode-theme-hydra
code --install-extension kumar-harsh.graphql-for-vscode
code --install-extension leighlondon.eml
code --install-extension mikestead.dotenv
code --install-extension ms-vscode.sublime-keybindings
code --install-extension neilbrayfield.php-docblocker
code --install-extension neilding.language-liquid
code --install-extension octref.vetur
code --install-extension PKief.material-icon-theme
code --install-extension pnp.polacode
code --install-extension sdras.night-owl
code --install-extension whizkydee.material-palenight-theme
code --install-extension zhuangtongfa.Material-theme
```

## What's your setup like? 💻

I'm always interested in learning from other's workflows and maybe some lesser known extensions that are must-haves. Let me know what your VSCode setup looks like in the comments! 👍

Cheers 🍻
Ryo