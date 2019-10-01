---
title: Lorem Ipsum Generator plugin for Sketch
date: "2018-07-09"
section: blog
cover_image: "./Lorem-Ipsum-Generator-Sketch-Plugin.jpg"
tags: [ 'sketch', 'resources', 'free', 'download' ]
---

I was recently working on a quick project in [Sketch](http://sketchapp.com) and I needed to insert some Lorem Ipsum text into a few fields. I did a quick search for a plugin on Google and came across [this one by @RichardGong on Github](https://github.com/richgong/sketch-lorem-ipsum-2017). It worked great, but only added a single line of Lorem to each text field, and the same Lorem text. This solution only goes so far if you work on any project with more than a single text field.

So I forked his project and added **more** Lipsum, cause *you know*, the more Lipsum the better. 

## How it works

I generated 10 paragraphs on [Lipsum.com](http://lipsum.com) and added them to an array. The plugin grabs the current selection, loops through each layer, and if it's a text field -- adds a paragraph of Lorem Ipsum. I use a variable to keep count of each loop, and once it reaches 10, I reset the count to grab from the top of the list (so you can select 30 fields and it'll still fill them all, just repeated 3x).

## But it over-fills my text fields!

Yeah that's a thing. I was looking into a way to calculate the length of characters the current text field allows, but the Sketch API doesn't make it that simple, making it more than 20-30 lines of code to accomplish. It looks like the [sketch-highlighter](https://github.com/matt-curtis/Sketch-Highlighter/blob/master/Sketch-Highlighter.sketchplugin/Contents/Sketch/script.js) plugin has a snippet that I can break down and use as a base. That feature will have to come later when I have the time to add it. 

## Download the plugin

[Head over to Github and click the "Clone or download" button](https://github.com/whoisryosuke/sketch-lorem-ipsum-2017).

Let me know if you have any questions!
Ryo

***

**References**

* [Lorem Ipsum Generator Sketch Plugin](https://github.com/whoisryosuke/sketch-lorem-ipsum-2017)
* [Sketch Plugin docs](https://developer.sketchapp.com/guides/plugin-scripts/)
* [Original plugin by @RichardGong on Github](https://github.com/richgong/sketch-lorem-ipsum-2017)