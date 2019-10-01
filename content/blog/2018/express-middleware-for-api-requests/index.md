---
title: "Express Middleware for API Requests"
date: "2018-07-23"
section: blog
cover_image: "./Express-Middleware-for-API-Requests-1920px.jpg"
tags: [ 'nextjs', 'express', 'js', 'api', 'es6', 'tips' ]
---

Recently I needed to create a NextJS app that made authenticated API calls, and couldn't reveal it's credentials to the client. The solution was simple, I had to integrate Express into the app. But how do you fetch data from the API and pass it down to a page?

> This process assumes you have an environment setup with NextJS, Express, an isomorphic fetch solution, and dotenv (for ENV variables). If you follow the NextJS guide for dynamic routing you be mostly there. But it should be pretty easy to adapt to other server frameworks.

## Async or bust

I tried to first fetch the data in a separate function and call it before the page was rendered in the route:

```js
const credentials = {
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa(process.env.API_USER + ":" + process.env.API_VENDOR)
  }

function fetchApi (endpoint) {
  return fetch(process.env.API_URL + endpoint, credentials)
    .then(r => r.json())
}

    server.get('/facilities', (req, res) => {
      const data = fetchApi('/facilities/v1/')
            .then(data => return data)

      return app.render(req, res, '/facilities', { data })
    })
```

This resulted in the page rendering and loading, and the data loading afterwards. Simple mistake, especially if you come from a background that isn't asynchronous. 

But how do you create an async Express route? Shockingly easily apparently:

```js
    server.get('/facilities', async (req, res) => {
      const data = await fetchApi('/facilities/v1/')
            .then(data => return data)

      return app.render(req, res, '/facilities', { data })
    })
```

Add an async before the function that renders your route -- *because don't stress it, it's easy to forget that you're working **inside** a function*. Now you just slap an await on Promise you want to fetch before page load.

## But can we make it reusable?

I needed to fetch data across many routes, with many different requests to different endpoints. Rather than repeating code in every route to make the API request, we make a **middleware** that does it and dumps the data in the `res.locals` (which is accessible in our route).

```js
// Credentials for authenticated fetch calls to API
const credentials = {
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa(process.env.API_USER + ":" + process.env.API_VENDOR)
  }
}

/**
 * Facade for fetch preloaded with authentication credentials
 * to easily use in any other function
 */
async function fetchApi (endpoint) {
  return await fetch(process.env.API_URL + endpoint, credentials)
    .then(r => r.json())
}

/**
 * A function that returns the middleware function
 * We nest the middleware in a function so we can 
 * pass an endpoint, making the middleware more reusable
 */
function getData(endpoint) {
  return (req, res, next) => {
    
    /**
     * Here we create an async function so
     * we can load the data before the page renders
     */
    const fetchData = async () => {
      await fetchApi(endpoint)
        .then(data => {
          // We place the data in res.locals to access in the route later
          res.locals.data = data
          next()        
        });
    }
    fetchData();
  }
}

app.prepare()
  .then(() => {
    const server = express()

    server.get('/facilities', getData('/facilities/v1/'), (req, res) => {
      return app.render(req, res, '/facilities', { data: res.locals.data })
    })
  })
```

The code explains it a bit, but I had to nest the middleware function inside another function in order to pass the endpoint parameter. It's the way that JS works, similar to when you use `.map()` or `.filter()` on an array and you want to pass a parameter but can't. It's an encapsulation issue caused by the way Express interprets it's middleware, forcing you to wrap it what the React community calls a "HOC", or a function that returns another function (so you can pass additional "props" to the child function - or component in React's case).

Now in any route we simply add the middleware `getData(endpoint)`.

> You could also just do a fetch in the middleware **without the async** and rely on `next()` function in the promise chain. It'll hold the progress until the loading is complete and then provide the "next" function (usually the render function). I just left everything async just in case I refactor it out of the middleware.

### Super middleware

You could take this middleware and apply it to the entire application (rather than a single route), and use the `req.params` object to grab dynamic route variables (like a blog post ID, or in this case, a string that describes an endpoint). 

```js
function getData() {
  const endpoint = req.params.endpoint
  return (req, res, next) => {
    
    /**
     * Here we create an async function so
     * we can load the data before the page renders
     */
    const fetchData = async () => {
      await fetchApi(endpoint)
        .then(data => {
          // We place the data in res.locals to access in the route later
          res.locals.data = data
          next()        
        });
    }
    fetchData();
  }
}

   // later in the app...
    server.get('/:endpoint', (req, res) => {
      return app.render(req, res, req.params.endpoint, { data: res.locals.data })
    })
```

This allows for a completely dynamic connection to whichever API you're using, so depending on how large (and preferably simple) it is to access, you can use **one middleware to rule them all.**

## I ❤️ middleware

Middleware makes life so much easier, and makes application code so much slimmer. If you can find a way to simplify this code (without getting too deep into ES6 land), I challenge you to post it up in the comments! I'm always interested in discovering and sharing the most efficient solutions to common problems.

Hope that helps! ✌️
Ryo 

***

**References**:

* [ExpressJS Middleware](https://expressjs.com/en/guide/using-middleware.html)
* [MDN: async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
* [Middleware: THE core of node.js backend apps](https://hackernoon.com/middleware-the-core-of-node-js-apps-ab01fee39200)
* [Async Express routes](https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016)