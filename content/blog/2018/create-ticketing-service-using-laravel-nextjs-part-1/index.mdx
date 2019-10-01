---
title: Creating an event ticketing service (Laravel API + ReactJS + NextJS + Material UI)
date: "2018-06-02"
section: blog
cover_image: "./Laravel-API-ReactJS-NextJS-Material-UI-1920px.jpg"
tags: [ 'api', 'laravel', 'react', 'nextjs', 'material ui', 'ssr', 'full stack', 'backend', 'frontend' ]
---

Laravel makes it incredibly easy to quickly create powerful backend application and APIs. Today we'll be creating an API for an event directory and ticketing platform (like Eventbrite). This API could be used by any frontend or backend application, and in the next part of the tutorial, we'll be creating a ReactJS based admin dashboard that uses this API to browse, create, edit, and delete posts.

This project will be based off a brand I work, [SeshSource](http://seshsource.com), which is an event ticketing platform for specifically cannabis-centric events. We'll be creating essentially a mirror of the current architecture of SeshSource, just in Laravel, instead of Wordpress + plugins.

## Necessary Features (MVP)

I started by outlining features we'd want for the MVP - or minimum viable product, like browsing events to purchasing tickets:

### Directory

* Events searchable by date
* Events shown by location or category
* User profiles for event organizers
* Calendar view with events
* List/card view
* List of all cities, states, etc + archive pages

### E-Commerce

* Buy free or paid tickets
* Generate PDF of ticket
* Email PDF to user
* Email business about new purchase
* Mobile-friendly web-app to scan tickets at event

### Organizer Tools

* Dashboard for managing events
* Create events
* Edit event
* Delete event
* Create ticket types for specific events (free, VIP, etc)
* See (+ print) list of event attendeees
* See (+ print) list of orders

Now that we know what we want out of our API, let's start coding it!

## Setup a Laravel project with Docker

Here's how I spin up a new Laravel project and use Docker for local development -- *without pulling all my hair out*:

1. `composer create-project --prefer-dist laravel/laravel seshsource-api`
2. `git clone https://github.com/Laradock/laradock.git`
3. `cd laradock`
4. Copy the example environment file into a real one: `cp env-example .env`
5. Change the Laravel root ENV to use Laradock as host (*Laravel uses localhost, but Laradock accesses each service inside the Docker container using the service name*):
```
DB_HOST=mysql
DB_DATABASE=default
DB_USERNAME=default
REDIS_HOST=redis
QUEUE_HOST=beanstalkd
```
6. `docker-compose up -d nginx mysql phpmyadmin redis workspace`

You should have your Laravel project deployed locally on a Docker development server! *Pretty simple right? 😁*

## OAuth2.0 Server in 4 steps or less

Let's setup Laravel with authentication and add OAuth2.0 support using the Passport package:

1. `composer require laravel/passport` inside the project root
2. `docker-compose exec workspace php artisan migrate` inside the laradock folder (`cd laradock`)
3. `docker-compose exec workspace php artisan passport:install`
4. Follow [the guide in Laravel docs for adding traits to User class](https://laravel.com/docs/5.6/passport)
5. `docker-compose exec workspace php artisan make:auth`
6. `docker-compose exec workspace php artisan app:name SeshSource` - Here is where you'd set your application's name. It'll be used across the entire app's 'namespace', so referencing models will look like: `use SeshSource\Events`.


## UUIDs

I like using UUIDs as opposed to direct IDs. If you're using anything before Laravel 5.6, install this library. Otherwise, Laravel 5.6 and beyond come pre-installed with a `uuid()` [helper method](https://laravel.com/docs/5.6/helpers#method-str-uuid). You'll still need to create a trait, but you won't need the dependency.

1. `composer require webpatser/laravel-uuid`
2. Add this to config/app.php file where the aliases array resides: `'Uuid' => Webpatser\Uuid\Uuid::class,`

Now we just use `$table->uuid('id'); $table->primary('id');` in the migrations instead of `$table->increments('id');`.

Make sure to remove auto-increment from any model using UUIDs:

```php
/**
 * Indicates if the IDs are auto-incrementing.
 *
 * @var bool
 */
public $incrementing = false;
```

Create a new Trait to handle generating the UUID when we need to create new posts (app/Traits/Uuid.php):

### Dependency version

```php
<?php

namespace SeshSource;

use Webpatser\Uuid\Uuid;
trait Uuids
{

    /**
     * Boot function from laravel.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->{$model->getKeyName()} = Uuid::generate()->string;
        });
    }
}
?>
```

### Laravel 5.6 UUID

```php
<?php

namespace SeshSource\Traits;

use Illuminate\Support\Str;

trait Uuids
{

    /**
     * Boot function from laravel.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->{$model->getKeyName()} = (string) Str::uuid();
        });
    }
}
?>
```

Inside all UUID models add the trait:

```php
use SeshSource\Traits\Uuids;

...

class User extends Authenticatable
{
use Uuids;
```


## Migrations and Models

Laravel makes it simple in a single command to create **models**, which help us interact with data, as well as the **migrations** - PHP statements that create the database tables for us (no SQL required!). We'll create 10 models and DB tables that will store all our website's data.

I won't go into too much detail about the decision making of the structure, but it's essentially based off the Wordpress DB structure -- combined with the WooCommerce and Tickera plugin's DB structure. Events are stored in a table, and any extra "meta" data is stored in a pivot table. It's similar with the shopping cart "orders". We have a table dedicated to Orders, and a pivot table for each individual line item (with price and quantities). We use the a pivot table instead of storing an entire shopping cart in a single column (serialized in JSON, comma separated IDs, etc) - this allows us to leverage Laravel's relationships to efficiently eager load any related data.

Run these commands in your project root to create the models and migrations:

```
php artisan make:model Events -m
php artisan make:model EventMeta -m
php artisan make:model TicketTypes -m
php artisan make:model TicketTemplates -m
php artisan make:model Tickets -m
php artisan make:model UserMeta -m
php artisan make:model Orders -m
php artisan make:model OrderItems -m
php artisan make:model CheckIns -m
php artisan make:model Reviews -m
```

Add the UUIDs to all the models and migrations. You can opt out for the meta tables, but things like Orders and Events should have UUIDs for security purposes.

**Example model:**

```php
<?php

namespace SeshSource;

use SeshSource\Traits\Uuids;
use Illuminate\Database\Eloquent\Model;

class EventMeta extends Model
{
    use Uuids;

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;
}
```

**Example migration:**

```php
class CreateEventMetaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event_meta', function (Blueprint $table) {
            $table->uuid('id'); 
            $table->primary('id');
            $table->timestamps();
        });
    }
}
```

Reset the database and migrate the new structure:

`docker-compose exec workspace php artisan migrate:fresh`

> If you have any issues with "foreign IDs", it probably means a migration with relationships was run before the related table was created. Rename your migrations to make sure any tables that are related are created before any pivot tables.

## Authentication using the User Model

If you noticed in the migrations we added a 'type' to the user table (`database/migrations/2014_10_12_000000_create_users_table.php`). That's where we can tell if a logged in user is a customer, event organizer, or admin. To make it easier to determine if the user has access to admin or organizer-level features, we add a check to the User model for each:

```php
   /**
     * Determines if user is admin or not (true or false)
     *
     * @return boolean
     */
    public function isAdmin() 
    {
        if($this->type == 'admin')
        {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Determines if user is organizer or not (true or false)
     *
     * @return boolean
     */
    public function isOrganizer() 
    {
        if($this->type == 'organizer')
        {
            return true;
        } else {
            return false;
        }
    }
```

## Creating API controllers

Now that we have our models in place, we can handle the controller part of our application. For now we'll need 5 controllers, and we'll use Laravel's artisan CLI to make [API resource controllers](https://laravel.com/docs/5.6/controllers#resource-controllers). This bootstraps a controller for us with all the necessary methods we need for an standard API (index, store, update, delete).

```
php artisan make:controller 'Api/EventsController' --api
php artisan make:controller 'Api/UsersController' --api
php artisan make:controller 'Api/ReviewsController' --api
php artisan make:controller 'Api/OrdersController' --api
php artisan make:controller 'Api/CheckInsController' --api
```

For the index methods, we just use the appropriate model and use the paginate method (`Events::paginate(10)`). Later we'll add filtering using query params (changing order, specifying categories, etc).

For the show methods, we use the appropriate model again, and use the `findOrFail()` method to grab the `$id`: `$event = Events::findOrFail($id);`.

> To [return a JSON response using Laravel](https://laravel.com/docs/5.6/responses#json-responses), just use the `json()` method on the `response()` object: `return response()->json($events);`

For the `store()` methods, we create a validator for each one (`php artisan make:request StoreEvents`). The validator checks the POST request, and also authenticates the user in the `authorize()` method using the `isAdmin()` method on the User model.

```php
<?php

namespace SeshSource\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEvents extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|unique:events|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'street_address' => 'required',
            'city' => 'required',
            'state' => 'required',
            'email' => 'email',
            'event_logo' => 'image',
            'featured_img' => 'image'
        ];
    }
}
```

## Passport doesn't support UUID user IDs

Here's a quick fix if you have any issues with creating Client IDs for OAuth2.0 authenticated apps using Passport. 

Since we swapped the user ID for a UUID instead of incrementing integer, Passport creates a table called `oauth_access_tokens` that references an incrementing ID, instead of UUID. To get it working, we have to create a new migration that drops the column and creates a new column.

> Normally we'd just update the column, but the `doctrine\dbal` library used by Laravel doesn't support UUIDs. 

1. Drop the user id column (since Laravel's dbal dependency doesn't support changing columns to uuid) `php artisan make:migration drop_user_id_on_oauth_access_tokens`:

```php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropUserIdOnOauthAccessTokens extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('oauth_access_tokens', function (Blueprint $table) {
            $table->dropColumn('user_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('oauth_access_tokens', function (Blueprint $table) {
            $table->dropColumn('user_id');
        });
    }
}

```

3. Add migration to insert the user ID column as UUID `php artisan make:migration update_oauth_access_tokens_with_uuids`:

```php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateOauthAccessTokensWithUuids extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('oauth_access_tokens', function (Blueprint $table) {
            $table->uuid('user_id')->change();
            $table->primary('user_id')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('oauth_access_tokens', function (Blueprint $table) {
            $table->integer('user_id')->change();
        });
    }
}
```

Reset the database (again) and migrate the new structure:

`docker-compose exec workspace php artisan migrate:fresh`

## [Enable CORS](https://github.com/barryvdh/laravel-cors)

Install CORS dependency and add to Kernel.php. This will allow you to create an app on the same server and enable communication to the API. When we run this API, it'll deploy to `http://localhost/`. And when we create a React app for the frontend (to display data), it'll deploy to `http://localhost:3000`. Since it's on the same server, but different ports, you'll receive a cross-domain reference error. 

> Enabling CORS on the API endpoints allows us anyone to access the API on any server. So if you're going to deploy to production, make sure to limit the hosts to servers you trust (unless your API is public).

## API in a day

And that's about it, your API is ready for consumption by another application! 

In the next part of this series we'll explore how to create a server-side rendered ReactJS admin dashboard using NextJS, styled with Material UI, and authenticated using our OAuth2 API. That's a lot of words and tech in one sentence, and the article itself be more than a mouthful to swallow, but I'll try my best to make it as simple as possible! 👍

Stay tuned! 🙈
Ryo

***

**References**:

* [Laravel installation](https://laravel.com/docs/5.6/installation)
* http://laradock.io/documentation/
* https://medium.com/@steveazz/setting-up-uuids-in-laravel-5-552412db2088
* https://github.com/webpatser/laravel-uuid
* [Naming your Laravel application](https://laravel.com/docs/5.0/configuration#after-installation)
* [Quickly creating JWT tokens using Laravel Passport](https://stackoverflow.com/questions/41376928/laravel-5-3-passport-jwt-authentication)
* [Doctrine doesn't support changing MySQL columns to UUID](https://laracasts.com/discuss/channels/eloquent/uuid-type-change-to-nullable-through-migrations-not-working)
* [Enable CORS](https://github.com/barryvdh/laravel-cors)
* [NextJS login with protected routes example](https://github.com/zeit/next.js/issues/153#issuecomment-257924301)
