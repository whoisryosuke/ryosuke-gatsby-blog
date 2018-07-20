---
title: How to create a PHP package for Composer
date: "2018-07-20"
section: blog
cover_image: "./how-to-create-a-php-package-for-composer-1920px.png"
tags: [ 'composer', 'php', 'open source', 'github', 'tips', 'tutorial' ]
---

Recently, I've recently been trying my best to upload as much code to open source repositories like [**Github**](http://github.com/whoisryosuke) and [**Codepen**](http://codepen.io/whoisryosuke). It makes bootstrapping new projects much simpler when I can `git clone` a boilerplate from my Github, or *copypasta* a CSS/JS snippet from CodePen. But what happens when I need to include a library or module into several projects? Cloning and copy paste just don't cut it at that point.

Cut to [**NPM**](http://npmjs.com) and [**Composer**](http://getcomposer.com) ( or really [Packagist](http://packagist.com). NPM is a package manager for Javascript using Node, and Composer does the same for PHP. 

Today we'll be looking into submitting a PHP "package" to Composer through the Packagist, so we can use `composer require` to install our package into any project!

## The simple steps

It's as easy as 4 steps (*minus the part where you code a reusable package in PHP*) -- I was surprised too. Make sure before starting you've created a git repository in your project and committed your code. It's also required to have an account on [Github](http://github.com) and [Packagist](http://packagist).

1. Create a `composer.json` in your project:

```json
{
    "name": "your-brand-name/your-project",
    "type": "library",
    "description": "Your package description goes here",
    "keywords": ["relevant","tags","go","here"],
    "homepage": "https://yourcompany.com",
    "license": "MIT",
    "authors": [
        {
            "name": "Jordi Boggiano",
            "email": "j.boggiano@seld.be",
            "homepage": "http://seld.be",
            "role": "Developer"
        }
    ],
}
```

2. [Create a new repository on your Github](https://github.com/new) and push your local git (init if you haven't) to the remote Github repo.

3. [Submit your package to the Packagist](https://packagist.org/packages/submit)

4. Done! Your package should be online and Packagist should provide a sample Composer require with your project name (e.g. `composer require username/package-name`)

> You should be able to view your package live at: `https://packagist.org/packages/your-username/package-name`

## So easy, there's no excuse

One of the biggest principles of programming I try to apply is **DRY**, *don't repeat yourself*. When your code is probably already hosted on Github, it's only a two step process to get your code in a place where it's version controlled. 

Rather than relying on `git clone` or submodules, it's much more efficient for your codebase to use a composer dependency. 

## Take my code for a test run

The package I released on the Packagist is for developers working with the Metrc API to send and receive cannabis regulatory data. It's basically a wrapper for their API that uses a Guzzle client to interface with it (using your authoriation credentials).

If you're a Metrc developer, or just interested in using the code, you can add it to your projects using:

`composer require kushy/metrc-php-sdk`

Hope that helps,
Ryo