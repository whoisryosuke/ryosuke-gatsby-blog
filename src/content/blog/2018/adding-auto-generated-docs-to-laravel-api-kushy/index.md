---
title: 2 ways to auto-generate documentation for Laravel APIs 📄⚙️
date: "2018-08-06"
section: blog
cover_image: "./Adding-auto-generated-documentation-for-a-Laravel-API-1920px.jpg"
tags: [ 'laravel', 'api', 'documentation', 'workflow', 'guide', 'tips' ]
---

Recently the Kushy API finally reached a beta release of v1, and I redesigned the Kushy API documentation to use GatsbyJS. The documentation itself was hand-written in Markdown, with a structure inspired by most API docs (endpoints with descriptions, code snippets, and response examples). 

This got pretty tedious pretty quick, and immediately becomes an issue when any small updates occur to the API and require manual modification of a separate doc repo. It became time to auto-generate our docs from our codebase, and discovering the best way to accomplish that within the Laravel framework.

The options were fairly slim after some research: 

1. Use **Swagger**, an API specification, to document our code and output a Swagger JSON file.
2. Document our code using **docblocks**, and find a generator to scan the code and convert those to Markdown. 

## Say No to Swagger

I'm not a fan of the Swagger implementation in PHP. Writing documentation looks *atrocious*, makes it more difficult to read, and adds excessive code to my production codebase. I'd rather write standard docblocks for PHP and use those as the basis for the API documentation.

### "Screw You, I Prefer Swagger"

It's cool, I understand the ease of the Swagger specification. It was awesome being able to run a script and generating a JSON file I could import into other libraries/frameworks/generators. If you prefer using Swagger, I recommend using the [InfyOm Laravel Generator](https://github.com/InfyOmLabs/laravel-generator). 

You can generate your entire API with a fairly simple CLI. In a single `artisan` command, and a few answered questions, you have yourself a controller, model, migration, resource, validation, and testing for your API. It also can generate Swagger-approved documentation for the API controllers it creates with a simple change of the config.

## Easy to write docs

Luckily there's a package that kind of accomplishes what we need - [Laravel API Documentation Generator](https://github.com/mpociot/laravel-apidoc-generator). It scans your API endpoints and actually runs them to generate the documentation (automatically creating JSON response objects for your docs). It combines the PHP docblocks your write above the controller's classes/methods with request validation, JSON responses, and a table of contents.

If you're running Laravel 5.5+, just run this line to install the package:

```bash
composer require mpociot/laravel-apidoc-generator
```

And start generating docs using the Artisan CLI command:

```bash
php artisan api:generate --routePrefix="api/*"
```

There are plenty of benefits of using this package:

### Custom written content

You're not limited to auto-generated docs, this package is also capable of appending other Markdown file's content. Great for writing additional docs for authentication.

### Authenticating API requests

It even handles dirty processes, like authenticating API calls:

```bash
php artisan api:generate --routePrefix="api/*" --actAsUserId=1
```

### Postman

This package also generates a JSON 'collection' file for [Postman](https://www.getpostman.com/), an app for querying APIs. Handy if you're like me and you test your API with it. [You can import the collection](https://www.getpostman.com/docs/v6/postman/collections/creating_collections) and have a folder full of all your endpoints.

### Don't comment code? Don't worry!

Since this package analyzed your entire route file and queries each route for data, it'll generate API docs for every single route -- even if it doesn't have documentation/docblocks/comments! The generator creates a  "general" section which contains all the endpoints you didn't group inside *"resources"*.

## Issues with Auto-generation

From the beginning, I was trepidatious about integrating a documentation generator. There are several pitfalls with automation that lend to more work being done by devs, or worse, code getting refactored immensely for it.

### One giant markdown file

Despite being able to separate things into "Resources" with the API generator, the generator creates one massive Markdown file. Each "resource" or API controller is separated into sections, but without separate files, it makes parsing with frameworks like GatsbyJS more difficult.

### No comment blocks? Inaccurate docs.

The initial issue I encountered with docblock, and *even Swagger documentation*, was the need for a physical file with comments for each endpoint. 

What if I use a base class to extend my API controllers? All my major endpoints (index, store, etc) are all stored in the base controller, and I only add a couple extra endpoints to the actual endpoint controller. 

The base controller:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

abstract class ApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Does API stuff
    }
}
```

The generator combines comments from the extended classes, using docblocks from the base class. The issue? We get generic comments for any endpoint extended off the base class unless we re-instate the method in the endpoint controller.

This leads to the repeated code, excess code, and limitations on innovation.

## Hand-written > Docblocks > Swagger

Unless you API is setup for it, or you're working with an immense API that's constantly changing -- it's better to just write docs by hand. 

**It's great to use a generator as a start,** since it'll generate all the endpoints/request objects/etc. But for *long-term* maintenance, it seems like even the generators aren't completely automated - and require so much maintenance that it overrides it's usefulness.

However, if you are looking for a generator that **isn't Swagger based**, the [laravel-apidoc-generator by mpociot](https://github.com/mpociot/laravel-apidoc-generator) does a solid enough job of generating docs. And **if you're cool with Swagger**, the Laravel Generator by InfyOmLabs does a great job of creating everything you need for an API (controller, validation, models, migrations, tests, everything!).

## Making it work (for me)

The primary issue I had was the generated format of the Markdown. It was a single massive file that was compatible with doc generators like Slate, but not my GatsbyJS setup. For my Gatsby docs, they're generated from a `docs` folder with sub-folder for each resource group (`docs/endpoint/`). Then we create a file for each route (`docs/posts/get-all-posts.md`).

### Using Javascript

My first instinct was to write a NodeJS script to parse through the massive Markdown file and split it up into the chunks I needed. I used NodeJS to read the file contents, markdown-js to parse the MD into a walkable tree - then into HTML, and turndown to convert the HTML back to MD.

```js
var fs = require('fs');
var markdown = require("markdown").markdown;
var TurndownService = require("turndown");
var turndownService = new TurndownService();

// Grab API markdown master file and dump file into variable
let docs = fs.readFileSync('public/docs/source/index.md', 'utf8');

// Parse the markdown into a JSONML tree 
// (giant array with objects that contain MD data)
// [
//     {
//         'header',
//         {
//             level: 1
//         },
//         'The actual header content'
//     },
// ]
var tree = markdown.parse(docs);
var i = 0;
var separateDocs = [];

// Loop through tree to find headers
// Whenever header is found, insert last collection, 
// and make new collection variable to insert ongoing data into
// Each collection should contain name (used for filename) and data
var collection = [];
tree.forEach(function(element) {
    if(element[0] === 'header')
    {
        if(element[1].level === 1)
        {
            // Put collection the main doc array
            // Then wipe it out and start fresh
            separateDocs.push(collection);

            collection = [
                'markdown'
            ]
        }
    }

    collection.push(element);

    i++
});

// console.log(separateDocs);

// Convert from JSONML to HTML then to MD
// Then save the file
var convertedDocs = []
separateDocs.forEach(function(doc) {
    console.log(doc[1][0])
    var header
    if(doc[1][0] == 'header') {
        header = doc[1][2];
    } else {
        header = 'index';
    }
    var html = markdown.renderJsonML(markdown.toHTMLTree(doc));
    var convertedMarkdown = turndownService.turndown(html);
    convertedDocs.push(convertedMarkdown);


    fs.writeFile(`tmp/${header}.md`, convertedMarkdown, function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    }); 

});
```

You can run this script using the CLI: `node generate-api-docs.js`

After a bit of tinkering, I discovered that I could accomplish what I needed, but the source material became degraded. The conversion from MD -> JSON -> HTML -> MD was causing formatting issues.

### Back to the source

I realized that altering the final product wasn't the way to go, and it'd be easier just to edit the generator's output code. After snooping around the source code, I found the method I needed: `writeMarkdown()`. With a bit of altering, here's what I ended up with:

```php

    /**
     * @param  Collection $parsedRoutes
     *
     * @return void
     */
    private function writeMarkdown($parsedRoutes)
    {
        $outputPath = $this->option('output');

        $infoText = view('apidoc::partials.info')
            ->with('outputPath', ltrim($outputPath, 'public/'))
            ->with('showPostmanCollectionButton', ! $this->option('noPostmanCollection'));

        $parsedRouteOutput = $parsedRoutes->map(function ($routeGroup) {
            return $routeGroup->map(function ($route) {
                $route['output'] = (string) view('apidoc::partials.route')->with('parsedRoute', $route);

                return $route;
            });
        });

        $documentarian = new Documentarian();

        $parsedRouteOutput->each(function ($routeGroup) use ($infoText, $outputPath) {
            $routeGroup->each(function ($route) use ($infoText, $outputPath) {
                // dd($route);

                // $cleanResource = preg_replace('/\s+/', '', $route['resource']);
                $routeUrl = str_replace('api/v1/', '', $route['uri']);
                $safeUrl = str_replace('/', '-', $routeUrl);
                $safeUrl = str_replace('{', '', $safeUrl);
                $safeUrl = str_replace('}', '', $safeUrl);
                $cleanResource = explode('\n', $route['resource']);
                $cleanResource = $cleanResource[0];
                // $cleanResource = trim(preg_replace('/\s+/', ' ', $route['resource']));
                $title = strtolower($route['methods'][0] . '-' . $safeUrl);

                $folder = $outputPath.DIRECTORY_SEPARATOR.'dist'.DIRECTORY_SEPARATOR.strtolower($cleanResource);
                $this->createFolder($folder);
                $targetFile = $folder.DIRECTORY_SEPARATOR.$title.'.md';

                $frontmatter = view('apidoc::partials.frontmatter')
                    ->with('method', $route['methods'][0])
                    ->with('route', $routeUrl)
                    ->with('title', $route['title'])
                    ->with('date', date('Y-m-d'));

                $markdown = view('apidoc::singledoc')
                    ->with('writeCompareFile', false)
                    ->with('frontmatter', $frontmatter)
                    ->with('infoText', $infoText)
                    ->with('outputPath', $this->option('output'))
                    ->with('showPostmanCollectionButton', ! $this->option('noPostmanCollection'))
                    ->with('route', $route)
                    ->with('group', $cleanResource);

                // Write output file
                file_put_contents($targetFile, $markdown);

                $this->info('Wrote '. $title .' to: '.$outputPath);
            });
        });

        if ($this->option('noPostmanCollection') !== true) {
            $this->info('Generating Postman collection');

            file_put_contents($outputPath.DIRECTORY_SEPARATOR.'collection.json', $this->generatePostmanCollection($parsedRoutes));
        }
    }
```

Make sure to add this helper method to the `GenerateDocumentation` class (I threw it on the bottom):

```php
    /**
     * Create folder if none exists
     *
     * @param string $folder
     * @return void
     */
    private function createFolder($folder)
    {
        if (!file_exists($folder)) {
            mkdir($folder, 0777, true);
        }
    }
```

And here's the view file `singledoc.blade.php`:

```blade
---
{!! $frontmatter !!}
---

@if($group)
# {{$group}}
@endif
@if($writeCompareFile === true)
{!! $route['output']!!}
@else
{!! isset($route['modified_output']) ? $route['modified_output'] : $route['output']!!}
@endif
```

1. We loop through the `$routeGroupsOutput`, which is a collection of routes sorted by group name. 
1. Then we loop through each group to get the routes for each resource (each section labeled `@Resource` in your docblocks). 
1. We fill a view file with our route data, and then save the view to a Markdown file (using `file_put_contents()`).

> I removed the compare functionality temporarily. Usually this package creates two Markdown files and compares for differences on generation, but I haven't tried getting it to work with the new setup.

### Results

After editing the package a bit, I was able to accomplish what I needed, and create - at the very least - a basis for my API docs. Ideally, if I work out the kinks, this could work as an automated solution to generate docs on the fly.But hey, we'll see how well that works in practice. Things always work different when pushed past thought and into motion.

**The kinks so far**:

* Local development URL shows in queried JSON results
* Can't authenticate requests using User ID. Not sure if it's because I use UUIDs or my middleware setup.
* Getting rid of HTML comparison comments
* Delete `public/docs/` folder and make sure it doesn't generate
* Installing the forked package (or creating a new package to `composer install`)

You can find [my fork of the Laravel API Doc Generator here](https://github.com/whoisryosuke/laravel-apidoc-generator).

Hope this helped with your API automation search! 🍻
Ryo

***

**References**:

* [laravel-apidoc-generator](https://github.com/mpociot/laravel-apidoc-generator)
* [InfyOmLabs Laravel Generator](https://github.com/InfyOmLabs/laravel-generator)