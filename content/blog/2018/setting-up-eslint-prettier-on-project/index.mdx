---
title: "Setting up ESLint + Prettier on project 🔏"
date: "2018-09-03"
section: blog
cover_image: "./Setting-up-eslint-prettier-for-projects-1920px.jpg"
tags: [ 'testing', 'eslint', 'prettier', 'react', 'javascript' ]
---

As I've been creating more React projects, I've been finding that there's a lot of setup to make concocting code as smooth as possible. One of those prerequisites that often peeks around the corner in your project roadmap is the lack of a linting setup. It's a small, often stylistic thing, but you'll often find yourself removing an empty line here or there, or tabbing code into place -- **when it should be automated on robots.** 

So here's my foolproof way to setup ESLint and Prettier on projects (assuming you use VSCode):

```bash
# Install ESLint and Babel ESLint
# Make sure to install at least v5.1.0 of ESLint
npm install --save-dev eslint babel-eslint

# Install the Airbnb config
npx install-peerdeps --dev eslint-config-airbnb

# Install Prettier + ESLint config
npm install --save-dev --save-exact prettier eslint-config-prettier
```

Add this to a `.eslintrc.js` in your project root:

```js
module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb", "prettier"],
  plugins: ["react", "jsx-a11y", "import"]
};
```

In VSCode, `CTRL + ,` to open User Settings and add this to enable auto-prettify on save:

```js
{
    // Format a file on save. A formatter must be available, the file must not be auto-saved, and editor must not be shutting down.
    "editor.formatOnSave": true,
    // Enable/disable default JavaScript formatter (For Prettier)
    "javascript.format.enable": false,
    // Use 'prettier-eslint' instead of 'prettier'. Other settings will only be fallbacks in case they could not be inferred from eslint rules.
    "prettier.eslintIntegration": true
}
```

> You can also create a new file called `.vscode/settings.json` for per-project settings, to enforce it across all devs using VSCode.

And if you haven't already, install ESLint in VSCode and restart your window:

```bash
code --install-extension dbaeumer.vscode-eslint
```

> If you have Prettier installed on your project (in the NPM modules), you don't have to install the VSCode extension.

That's it! 

Your code will be reformatted automatically when you save. And more importantly, your code will be run against a linter, and check for any issues (formatting, lack of prop types, etc). You can see this in your ESLint debugger in VSCode, `CTRL + T` on Mac to open the Terminal, and go to Problems tab.

Hope that helps,
Ryo

**References**

* [Workflow - Adding ESLint + Prettier to projects](https://gist.github.com/whoisryosuke/1bf81f43a79d2f93f5ba45cb4fe3a0a6)
* [Configure ESLint, Prettier, and Flow in VSCode for React Development](https://medium.com/@sgroff04/configure-eslint-prettier-and-flow-in-vs-code-for-react-development-c9d95db07213)
* [Airbnb ESLint config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb#eslint-config-airbnb-1)