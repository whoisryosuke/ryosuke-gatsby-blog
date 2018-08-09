---
title: "Adding testing to a Laravel API 📝"
date: "2018-08-03"
section: blog
cover_image: "./Adding-testing-to-a-Laravel-API-1920px.jpg"
tags: [ 'laravel', 'tdd', 'testing', 'api', 'php', 'phpunit' ]
---

Lately I've been trying my best to get into TDD, test-driven development, which is a style of programming where you build tests alongside your code. I picked [Laravel](http://laravel.com) a while ago as my primary PHP framework for a lot of projects because of how easy it makes testing. Laravel makes it simple -- from making a test (`php artisan make:test YourTest`), to the easy to use API they provide for interfacing with PHPUnit (`$this->assertStatus(404)`).

Laravel does a great job of documenting their framework, and [the official docs](https://laravel.com/docs/master/testing) are usually more up to date than most code bases and tutorials I scoured the net to find. However, the testing docs are also incredibly simplified, and missing crucial steps (like how to run a test). It left me wondering if there was something I was missing.

After a bit of tinkering around, here's what I discovered.

## Testing JSON APIs

The most recent version of Laravel has [special testing methods for JSON APIs.](https://laravel.com/docs/5.6/http-tests#testing-json-apis) It allows us to query Laravel's internal API directly and easily make assertions on the response.

## Writing your first test

Let's make the test first. Use the following `artisan` command:

```bash
php artisan make: test ShopTest
```

Now you can open up your first test file located in `tests/Feature/ShopTest.php` and add a JSON API call:

```php
<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ShopTest extends TestCase
{
    /**
     * Tests shop index without params to see if it works
     *
     * @return void
     */
    public function testShopIndex()
    {
        $response = $this->json('GET', '/api/v1/shops');
        $response
            ->assertStatus(201);
    }
}
```

### How it works

We first query the API using the `json()` method which returns a response from the API. Then we check the response and **assert** certain things, like the status code (`assertStatus()`), or data itself (`assertJson`).

### Debugging tests

If at any point the test fails, and you're not sure why, just do a `dd($response)` to dump the response into the console. You can also use commands like `var_dump($variable)` to print out text in the console during tests. It helps verify when a method returns a boolean (like deleting a resource) or verifying properties exist on a resource (e.g. `$post->id`). Be wary of using `var_dump()` for larger variables (like the response object) - it tends to crash and freeze tests.

> Be careful when asserting data with duplicate property names, even if they're nested (e.g. `{ id: 1, comment { id: 129 } }`). assertJson will collapse the array and assume you mean both IDs. In this case, you have to use assertExactJson to check duplicate property names.

## Running the tests

Laravel doesn't actually write this anywhere in their docs, and you'd assume that you can run a test with something like `php artisan test` -- but you actually have to use the PHPUnit library in your composer dependencies:

```bash
./vendor/bin/phpunit
```

Run that command from the project root and PHPUnit will run all tests located in your `/tests/` folder. 

> Make sure all composer dependencies are installed or you won't be able to run this script. And if you're running Laravel inside of Docker, make sure to run PHPUnit inside the container `docker-compose exec workspace ./vendor/bin/phpunit`

### Running a single test

Sometimes you need to run a single test in isolation. I had to look this one up too:

`./vendor/bin/phpunit --filter TestControllerName`

This also works as well, albeit more verbose:

`./vendor/bin/phpunit  tests/Feature/TestControllerName.php`

## Keep it simple silly

I found that with basic Laravel APIs, you tend to repeat the same tests over and over again. Wouldn't it be nice if an API test looked like one of our Models, and was as simple as writing an extended class with protected variables?:

```php
<?php
namespace Tests\Feature\Controllers;
use Tests\CrudTest;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
class StrainsControllerTest extends CrudTest
{
    /**
     * The model to use when creating dummy data
     *
     * @var class
     */
    protected $model = \KushyApi\Posts::class;
    /**
     * The endpoint to query in the API
     * e.g = /api/v1/<endpoint>
     *
     * @var string
     */
    protected $endpoint = 'strains';
    /**
     * Any additional "states" to add to factory
     *
     * @var string
     */
    protected $states = 'strains';
    /**
     * Extra data to pass to POST endpoint 
     * aka the (store() method)
     * 
     * Must be array (ends up merged with another)
     *
     * @var array
     */
    protected $store = [
        'category' => '1'
    ];
}
```

With the power of abstract classes in OOP, we can create a kind of *base* class to *extend* the functionality of our specific endpoint's test class. Let's create a new test called `tests/CrudTest.php`:

```php
<?php
namespace Tests;

use Tests\TestCase;
use Tests\Traits\AttachJwtToken;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

abstract class CrudTest extends TestCase
{
    use AttachJwtToken;

    /**
     * Uses the model factory to generate a fake entry
     *
     * @return class
     */
    public function createPost()
    {
        if($this->states)
        {
            return factory($this->model)->states($this->states)->create();
        }
        
        return factory($this->model)->create();
    }

    /**
     * GET /endpoint/
     * Should return 201 with data array
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->json('GET', "api/v1/{$this->endpoint}");
        $response
            ->assertStatus(201)
            ->assertJson([
                'data' => true
            ]);
    }

    /**
     * GET /endpoint/<id>
     * Should return 201 with data array
     *
     * @return void
     */
    public function testShow()
    {
        // Create a test shop with filled out fields
        $activity = $this->createPost();
        // Check the API for the new entry
        $response = $this->json('GET', "api/v1/{$this->endpoint}/{$activity->id}");
        // Delete the test shop
        $activity->delete();
        $response
            ->assertStatus(201)
            ->assertJson([
                'data' => true
            ]);
    }

    /**
     * POST /endpoint/
     *
     * @return void
     */
    public function testStore()
    {
        $activity = $this->createPost();
        $activity = $activity->toArray();
        /**
         * Pass in any extra data
         */
        if($this->store)
        {
            $activity = array_merge($activity, $this->store);
        }
        $response = $this->json('POST', "api/v1/{$this->endpoint}/", $activity);
        ($this->model)::destroy($activity['id']);
        $response
            ->assertStatus(201)
            ->assertJson([
                'data' => true
            ]);
    }
    
    /**
     * DELETE /endpoint/<id>
     * Tests the destroy() method that deletes the shop
     *
     * @return void
     */
    public function testDestroy()
    {
        $activity = $this->createPost();
        $response = $this->json('DELETE', "api/v1/{$this->endpoint}/{$activity->id}");
        $response
            ->assertStatus(200);
    }
}
```

This class tests the index, show, store, and destroy methods that come in the basic API controllers that artisan generates for you. And it does it dynamically, using the variables you define in your endpoint's test class.

### Testing with Factories

This requires that you have a **Factory** for your class, so the `createPost()` method can generate fake data to test. Factories use the [Faker library](https://github.com/fzaninotto/Faker) to generate fake data for a specific model, whether you need it for tasks seeding or testing. Say you need to create 50 users - a factory will generate random (and even unique) names, passwords, and emails for all 50.

Creating factories are very simple, [check out the Laravel docs.](https://laravel.com/docs/5.6/database-testing#generating-factories) Here's an example of one with a few different types of fields (images, location data, etc):

```bash
php artisan make:factory YourModelNameFactory
```

```php
<?php

use Faker\Generator as Faker;

$factory->define(YourAppName\YourModelName::class, function (Faker $faker) {
    return [
        'id' => $faker->uuid,
        'name' => $faker->name,
        'slug' => $faker->slug,
        'featured_img' => $faker->imageUrl(640, 480),
        'avatar' => $faker->imageUrl(48, 48),
        'description' => $faker->paragraph,
        'latitude' => $faker->latitude(-90, 90),
        'longitude' => $faker->longitude(-180, 180),
        'address' => $faker->streetAddress,
        'city' => $faker->city,
        'state' => $faker->state,
        'postal_code' => $faker->postcode,
        'country' => $faker->country,
        'rating' => $faker->numberBetween(0, 5),
        'featured' => $faker->numberBetween(0, 1),
        'verified' => $faker->numberBetween(0, 1)
    ];
});

$factory->state(YourAppName\YourModelName::class, 'product', [
    'category' => 'Product',
]);
```

> Use *states* to add extra data or modify existing params in your fake Model entry. `factory(YourModelName::class)->state('product');`Works great if you need to have control over a model's specific parameter(s), like setting a user as an admin or customer. In this case, we set the post's category.

## Handling JWT

If you noticed, I have a trait on the abstract class called `AttachJwtToken`. I use Laravel's Passport package and connect to the API using OAuth2 authentication. Because of this, all JSON requests in tests require the proper authorization headers (with a JWT for the user).

The `AttachJwtToken` trait handles this process for us. I found this originally [on Github by @jgrossi](https://gist.github.com/jgrossi/4b1364e20418eca3ca937e70550c1823) and based my code off it. It checks for an existing user (which you can pass in using the `loginAs` method), and if no user is found, creates one, and returns a JWT for the user (using Laravel Passport's built in `createToken()` function)

[Check out my full source code on Gist](https://gist.github.com/whoisryosuke/2ee866ba6c32af5b4614ac6136a0012a)

## It's that simple!

It really is this **simple** to test your API *(if it's a simple CRUD API).* 

The hardest part of researching testing was feeling secure in the amount of information I'd accrued. At the end of the day, when you look at the source code, there are only so many testing methods Laravel/PHPUnit provides. You assert one thing or another, whether it's the status code or JSON itself, or mock users using the `actingAs($user)`.

What becomes **more complex** are tasks like replicating features that span across multiple controllers, jobs, services, etc -- or mocking functionality like image storage. Or just creating factories for all your models. 

Testing is easy, setting up the proper conditions becomes the true *test*.

Hope this helps your API TDD 🤘
Ryo

***

**References**:

* [Attach JWT Token to Test snippet](https://gist.github.com/whoisryosuke/2ee866ba6c32af5b4614ac6136a0012a)
* [Laravel Docs - Testing JSON APIs](https://laravel.com/docs/5.6/http-tests#testing-json-apis)
* [Faker docs](https://github.com/fzaninotto/Faker#fakerprovideruuid)
* [Test Driven Laravel course (paid with free samples via email)](https://course.testdrivenlaravel.com/)
* [Using PHPUnit for Laravel Testing](https://dev.to/lechatthecat/how-to-use-phpunit-for-laravel-3d3c)
* [Laravel Testing Woes: Token Mismatch](https://dev.to/fatboyxpc/laravel-testing-woes-token-mismatch-28pd)