---
title: shortcode - Change fields in a Laravel API Resource via transform
date: "2018-05-30"
section: blog
cover_image: "../../../../assets/img/categories/shortcode-code-snippets.jpg"
tags: [ 'laravel', 'php', 'api', 'shortcode', 'code snippet', 'tips' ]
---

Laravel makes forming data for an API response easier using API Resources, which take data (usually queried from Models), and return specific fields and structure you define. Resource Collections are what they sound like, they're collections of resources. Collections would be used for pages like an archive, where you have more than one item to display from your model.

The only issue you may encounter with Resource Collections is that they'll display all the item data, and won't allow you to exclude fields manually. Usually you don't need *every* field when you query an archive, just the vital info (title, slug, maybe tags) -- and let the user query the individual item for the rest of the fields.

This code snippet leverages the `transform()` method from Laravel's [Collection wrapper](https://laravel.com/docs/5.6/collections) (different from Resource Collections) to limit the response to set fields:

```php
<?php
class PageResourceCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return [
            'data' => $this->collection->transform(function($page){
                return [
                    'id' => $page->id,
                    'title' => $page->title,
                    'slug' => $page->slug,
                ];
            }),
        ];
    }
}
```

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">🔥 Change the fields in a <a href="https://twitter.com/hashtag/Laravel?src=hash&amp;ref_src=twsrc%5Etfw">#Laravel</a> Collection <a href="https://twitter.com/hashtag/API?src=hash&amp;ref_src=twsrc%5Etfw">#API</a> Resource using the transform method, since the collection may contain more fields than you want on an archive loop 👌 <a href="https://twitter.com/hashtag/PHP?src=hash&amp;ref_src=twsrc%5Etfw">#PHP</a> <a href="https://twitter.com/laravelphp?ref_src=twsrc%5Etfw">@laravelphp</a> <a href="https://t.co/3UH5vpsc58">https://t.co/3UH5vpsc58</a> <a href="https://t.co/u2mr48lqUy">pic.twitter.com/u2mr48lqUy</a></p>&mdash; Ryosuke (@whoisryosuke) <a href="https://twitter.com/whoisryosuke/status/1002002173906038784?ref_src=twsrc%5Etfw">May 31, 2018</a></blockquote>

Hope that helps,
Ryo

***

**References**

* [Original tweet](https://twitter.com/whoisryosuke/status/1002002173906038784)
* [See the code gist](https://gist.github.com/whoisryosuke/97d6bb9e4f22c2ab02bd867b56a4f6c7)
* [Laravel docs - Resource Collections](https://laravel.com/docs/5.6/eloquent-resources#concept-overview)