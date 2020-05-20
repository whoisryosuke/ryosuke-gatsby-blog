---
title: Easy APIs using Strapi - a NodeJS Headless CMS
date: '2020-05-20'
section: blog
tags: ['api', 'backend', 'cms', 'nodejs', 'js']
---

Recently while watching [Jason Lengstorf's Twitch](https://www.youtube.com/watch?v=8Mkh8S66SZY), he featured [Chris Sevilleja](https://twitter.com/chrisoncode?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor) (aka Scotch.io) who presented a headless NodeJS CMS and API called [StrapiJS](https://strapi.io/). I've had experience with headless CMS in the past in PHP world ([Wordpress](https://www.smashingmagazine.com/2018/10/headless-wordpress-decoupled/), [Directus](https://directus.io/), etc), and I was pumped by the prospect of having a JavaScript based solution that would blend better in a React stack.

Looking into it, they recently released a 3.0 beta, so I thought it'd be a great time to try out the new API and docs. I tested it out and took some notes on the process, as well as some tips that weren't particularly clear (or present) in the docs. We'll create an API and connect a NextJS app to it.

# Setting up a Strapi project

I installed Strapi per [the CLI documentation](https://strapi.io/documentation/3.0.0-beta.x/installation/cli.html). It was really simple, and only a few steps. I appreciate when a team takes the time to put together a CLI to walk you through the setup and handle common tasks (like installing deps).

You can create a new Strapi project and install the dependencies by running one command:

```bash
yarn create strapi-app my-project --quickstart
```

This creates a new Strapi project connected to a SQLite database. If you prefer to use a different database connection, remove the `—quickstart` from the command above to be prompted for a database connection in the CLI walkthrough.

Then you can run the development server from inside the project directory using this command:

```bash
yarn develop
```

After running spinning up the development server, you should see a bit of output in the console, like the URL for your API ([http://localhost:1337/](http://localhost:1337/)) - as well as an Admin page ([http://localhost:1337/admin](http://localhost:1337/admin)).

![Screen_Shot_2020-05-19_at_12.36.09_PM.jpg](Screen_Shot_2020-05-19_at_12.36.09_PM.jpg)

Head over to [the Admin page](http://localhost:1337/admin), login, and [start creating "collections"](http://localhost:1337/admin/plugins/content-type-builder) (aka DB tables and columns). Or you can create "Single" types, which are basically APIs for pages and their data (ala Wordpress pages with custom fields). There's even a handy Getting Started video guide that helps you understand the workflow and UI.

![Screen_Shot_2020-05-19_at_12.36.15_PM.jpg](Screen_Shot_2020-05-19_at_12.36.15_PM.jpg)

# What you get 📦

- Rest API
- "Admin" CMS
- User authentication using JWT
- User roles and permissions

By default your database will come preloaded with `users`, `permission`, and `role` tables.

# Creating a basic API

I spent time creating a small API for a freelance time tracking app (more on that soon 👀). I needed 3 tables: `projects`, `clients`, and `hours`. They were very simple with a few text fields each, and a couple had simple one-to-one relationships with eachother.

![./Screen_Shot_2020-05-19_at_12.49.11_PM.jpg](./Screen_Shot_2020-05-19_at_12.49.11_PM.jpg)

I created the tables and columns using the CMS, and added one test item in each table. Then to access the API, I visited [http://localhost:1337/clients](http://localhost:1337/clients). In less than 10 minutes or so I had a working API with modeled content.

## Private user content

I wanted to make sure that the content was protected from the public, and that anyone accessing the API would require authorization. Strapi made this fairly simple with "Roles and Permissions".

![./Screen_Shot_2020-05-19_at_12.49.24_PM.jpg](./Screen_Shot_2020-05-19_at_12.49.24_PM.jpg)

My first thought was to create a new user, add them to the `Authenticated` role, and try querying the API with that user. It didn't work at first 🙅🏻‍♂️. This was because the `Authenticated` role doesn't automatically gain permissions for "collections" you create. If you [edit the Authenticated role](http://localhost:1337/admin/plugins/users-permissions/roles/edit/1) and enable the collections you want to access, it should work 👍

I opted to create a new user role (`App User`) to encompass this new level of permission (as a kind of "admin" role), and that way `Authenticated` users could have more restricted privileges (in my case, maybe accounting oversight).

![./Screen_Shot_2020-05-19_at_12.49.38_PM.jpg](./Screen_Shot_2020-05-19_at_12.49.38_PM.jpg)

## Generating JWT tokens

Once you've created a user, assigned them a role that has permission to view content - you can finally generate a JWT (aka API token) to access private API endpoints.

Send POST request to [http://localhost:1337/auth/local](http://localhost:1337/auth/local) with `application/json` and the body as:

```json
{
  "identifier": "username-or-email",
  "password": "strongPassword"
}
```

API will return something like:

```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg5MjM1Mjc2LCJleHAiOjE1OTE4MjcyNzZ9.KtpTQgI7MNHvWUkQ0hPeops4ZwzP2grRFFR3OH3hB9Q",
  "user": {
    "id": 1,
    "username": "whoisryosuke",
    "email": "ryosuke.san.hana@gmail.com",
    "provider": "local",
    "confirmed": true,
    "blocked": false,
    "role": {
      "id": 1,
      "name": "Authenticated",
      "description": "Default role given to authenticated user.",
      "type": "authenticated"
    },
    "created_at": "2020-05-11T21:31:17.526Z",
    "updated_at": "2020-05-11T21:31:17.529Z"
  }
}
```

Authorizing users with JWT requires that the user's role has `callback` enabled. By default, users are in the `Authenticated` role which has `callback` enabled by default as well.

To enable for a new role: Go to the Strapi admin > User Roles & Permissions > Click the user role > Click the User Permissions accordion to expand it > Check the `callback` checkbox if it isn't already.

## Using the JWT

Once you have generated the JWT using the `/auth/local/` endpoint, you can use the JWT in the "headers" of your API request as a "Bearer token".

Here's an example of a GET request using `fetch()` with the JWT (or "token") attached to the headers:

```jsx
const token = Cookies.get('your-cookie-key')

fetch('http://localhost:1337/clients', {
  method: 'get',
  headers: new Headers({
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/json',
  }),
})
```

This works great, but I feel like with every API you end up writing a wrapper around fetch to handle these repetitive operations (like regular vs authenticated requests, hitting common endpoints, etc). In my search I found that [Strapi has a SDK for JavaScript](https://github.com/strapi/strapi-sdk-javascript) that offers this kind of functionality with an easy to use API.

If you already have a JWT token, you get use the `setToken` method on the `Strapi` class to authorize further requests:

```jsx
// Grab token from cookies
const token = Cookies.get(TOKEN_COOKIES_KEY)

// Create a new instance of Strapi with the API URL
const strapi = new Strapi('http://localhost:1337/')

// Set the JWT token for headers
strapi.setToken(token)

// Fetch any content that requires auth
const posts = strapi.getEntries('table-name')
```

## Creating Authorization Component

We need a component that can wrap any private pages, check if the user is logged in, and redirect any unauthorized users away (or show content if authorized). Ideally you should validate the token, but for sake of simplicity, we let the user in if they have a token at all (if they don't, the private API requests will still fail):

```jsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { TOKEN_COOKIES_KEY } from '../constants'

export default function AuthGuard({ children }) {
  const [loggedIn, setLoggedIn] = useState(false)
  const router = useRouter()
  const token = Cookies.get(TOKEN_COOKIES_KEY)

  // Grab JWT from cookies
  // If no cookie, redirect to login page
  useEffect(() => {
    if (token && !loggedIn) {
      // Validate token here
      return setLoggedIn(true)
    }

    if (!loggedIn) router.push('/login')
  }, [loggedIn])

  if (loggedIn) return children
  return <div>Not authorized, redirecting to login</div>
}
```

In order for this to work, we need a way for the user to login and store the token in cookies. I made a basic login form using Chakra UI. It submits the user data to authorization endpoint in the Strapi API:

```jsx
import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Strapi from 'strapi-sdk-javascript'
import { motion } from 'framer-motion'
import { Box, Button, Input, Stack } from '@chakra-ui/core'
import { TOKEN_COOKIES_KEY } from '../constants'
import { useUser } from '../context/UserContext'
import BaseLayout from '../layouts/BaseLayout'

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  })
  const router = useRouter()
  const { updateUser } = useUser()

  const onChange = ({ currentTarget: { name, value } }) => {
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const submitForm = async e => {
    e.preventDefault()

    const strapi = new Strapi('http://localhost:1337/')

    let response
    try {
      response = await strapi.login(formData.identifier, formData.password)
    } catch (e) {
      // Login failed
    }

    // Login succeeded
    if (response) {
      // Save JWT in cookies
      Cookies.set(TOKEN_COOKIES_KEY, response.jwt)

      // Save user info to context
      updateUser(response.user)

      // Redirect user to dashboard
      router.push('/')
    }
  }

  return (
    <BaseLayout>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box textAlign="center">
        <form method="POST" onSubmit={submitForm}>
          <Stack spacing={3}>
            <Input
              name="identifier"
              placeholder="Username"
              value={formData.identifier}
              onChange={onChange}
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={onChange}
            />
            <Button type="submit" onClick={submitForm}>
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </BaseLayout>
  )
}

export default Login
```

Ideally you should use a library like Yup to validate the form beyond relying on the HTML5 validation attributes.

And then to get the user data across the app, we create a context provider that queries the user API and pass it to the context. Ideally here if the user check fails, we could invalidate the user logged in status (if it was in context, or we combined the AuthGuard and this provider):

```jsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import Strapi from 'strapi-sdk-javascript'
import Cookies from 'js-cookie'
import { TOKEN_COOKIES_KEY } from '../constants'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, updateUser] = useState({})
  const token = Cookies.get(TOKEN_COOKIES_KEY)

  useEffect(() => {
    const fetchUser = async () => {
      const strapi = new Strapi('http://localhost:1337/')
      strapi.setToken(token)

      const profile = await strapi.getEntries('users/me')
      if (profile) updateUser(profile)
    }
    if (Object.keys(user).length === 0) {
      fetchUser()
    }
  }, [user, token])

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}
```

# Working with Dates

A great example of "it just works" out of the box was working with dates. I had a collection called `hours` that had two columns for "start" and "end" date times. It was supposed to represent a time range that could later be parsed into the number of hours spent working.

You can filter dates by using the "greater than" `gte` and "less than" `lte` filter parameters (if you have your column set to date or datetime).

- If you need posts after a certain date/time, you can query using `gte` filter: [`http://localhost:1337/hours?start_gte=2020-05-10T19:00:00.000Z`](http://localhost:1337/hours?start_gte=2020-05-10T19:00:00.000Z)
- If you need posts between certain dates, use `gte` and `lte` together to create a date range: [`http://localhost:1337/hours?start_gte=2020-05-10T19:00:00.000Z&end_lte=2020-05-17T19:00:00.000Z`](http://localhost:1337/hours?start_gte=2020-05-10T19:00:00.000Z&end_lte=2020-05-17T19:00:00.000Z)

When filtering collections with the SDK, you can use the `getEntries()` method, but the SDK docs don't specify what format the [query params](https://en.wikipedia.org/wiki/Query_string) need to be. Looking [at the underlying code](https://github.com/strapi/strapi-sdk-javascript/blob/master/src/lib/sdk.ts#L240), you can see it's just a wrapper around [axios](https://github.com/axios/axios) and passing a params object to that. Checking [the axios docs](https://github.com/axios/axios), it seems like you just create an object where the keys are column names and values are the filter value.

In this case, I grab `hours` between two dates:

```jsx
const latestHours = await strapi.getEntries('hours', {
  // Column name (and _filtertype): filter/search value
  start_gte: formatISO(dateRange.start),
  end_lte: formatISO(dateRange.end),
})
```

# What broke for me

As much as it was a fairly easy process, I hit big snags that left me clueless for a 5-10 minutes.

- Don't create a UID column for `id`. Strapi automatically creates auto-incrementing IDs for your collections. If you add one named `id` specifically, **it will break the API completely.** If you happen to create one accidentally, go into model file and remove the column from the schema.
- Titles of columns are 1:1, meaning the API will display the property/column in uppercase if set. Keep this in mind when consuming the API, accessing the parameter will be case sensitive (i.e. getting the `item.Description`).
- When you login users using the `/auth/local` endpoint, if the user details are incorrect the form will return error code **400 Bad Request.** Try real auth details and see if you get a valid response with JWT and user details.
- CORS are enabled by default. Make sure to add your frontend app URL to the allowed origin list or make it `*` to allow all URLs. Settings are located in different places for each app env (dev, production, etc) — `config/environments/development/security.json`.

Despite these hiccups, I was fairly happy with the experience. If you don't fuss with CORS once in your API, _you're_ doing something wrong 😂

# Adding GraphQL

One of the coolest parts of Strapi was the ability to basically turn GraphQL on with the flip of a switch. By running one install script you can enable a GraphQL endpoint (complete with CRUD mutations), as well as GraphQL Playground (a UI for creating queries).

Install the necessary plugins:

```bash
yarn strapi install graphql
# npm run strapi install graphql
```

Then start the dev server and navigate to [http://localhost:1337/graphql](http://localhost:1337/graphql). You'll see a GraphQL Playground.

Install the ModHeader browser extension to set the Authorization header in your request. Or use an app like Insomnia, Postwoman, etc to apply the appropriate headers and query the GraphQL endpoint.

![./Screen_Shot_2020-05-19_at_10.05.45_AM.jpg](./Screen_Shot_2020-05-19_at_10.05.45_AM.jpg)

Querying the Strapi GraphQL endpoint using Insomnia (and showing the autocomplete from schema)

## Setting up a NextJS App with Apollo Client

To test out the GraphQL API with a React app, I spun up a quick NextJS app with the `create-next-app` CLI. Then I installed the basic Apollo Client dependencies. The latest version of Apollo is big on React context and hooks, allowing you to query GraphQL inside functional components using a `useQuery` hook. As long as the app is wrapped in an `<ApolloProvider>`, it gives nested components access to the Apollo "client" using React's context.

Wrap `_app.js` in a `<ApolloProvider>` and pass it an instantiated Apollo client:

```jsx
import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

const token = 'JWT-token-here'

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  headers: {
    authorization: token ? `Bearer ${token}` : '',
  },
})

export default ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
)
```

Create a component that uses Apollo and queries GraphQL using a React hook:

```jsx
import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const GET_CLIENTS = gql`
  {
    clients {
      Name
      Description
      Color
    }
  }
`

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return <div>{JSON.stringify(data)}</div>
}
```

If you add this component to any NextJS page you should see a loading state, then the data from GraphQL. If you see an error, make sure you have permissions setup properly for the endpoint you're accessing.

# API in 1-2-3

I'm really impress with Strapi and how easy it was to use. Definitely faster than booting up an a custom Express server or an Adonis/Nest project. The only thing comparably faster would be generating an API from a Swagger/OpenAPI blueprint, and even then, that requires more startup knowledge.

I could definitely see this becoming a standard in my own workflow, and I hope it helps expedite your full stack or backend process as well. And with platforms like [DigitalOcean offering new droplets with Strapi as a one-click install](https://marketplace.digitalocean.com/apps/strapi), it makes the process of deploying a production API even more seamless.

Cheers,
Ryo

# References

- [https://strapi.io/](https://strapi.io/)
- [Build Jamstack Apps with Custom APIs (with Chris on Code) — Learn With Jason](youtube.com/watch?v=8Mkh8S66SZY)
- [Set up Strapi as a CMS for Gatsby (with David Kartuzinski) — Learn WIth Jason](https://www.youtube.com/watch?v=JkBxyurjeI8)
- [https://directus.io/](https://directus.io/)
- [https://www.smashingmagazine.com/2018/10/headless-wordpress-decoupled/](https://www.smashingmagazine.com/2018/10/headless-wordpress-decoupled/)
- [https://marketplace.digitalocean.com/apps/strapi](https://marketplace.digitalocean.com/apps/strapi)
