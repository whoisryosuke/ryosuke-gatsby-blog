---
title: shortcode - Protect NextJS pages with a authorization HOC 🔐
date: "2018-06-26"
section: blog
cover_image: "../../../../assets/img/categories/shortcode-code-snippets.jpg"
tags: [ 'nextjs', 'api', 'js', 'shortcode', 'code snippet', 'tips' ]
---

Need to protect your NextJS pages behind a login? Use a HOC (higher-order component) to wrap your page components, check the #API token, and redirect users if it fails 🙅‍♂️ 

Bonus: You can grab things from SSR like cookies or session data using the child's getInitialProps in the HOC 🙌 

```js
import React, {Component} from 'react'
import Router from 'next/router'
import AuthService from './AuthService'

export default function withAuth(AuthComponent) {
    const Auth = new AuthService('http://localhost')
    return class Authenticated extends Component {

      static async getInitialProps(ctx) {
        // Check if Page has a `getInitialProps`; if so, call it.
        const pageProps = AuthComponent.getInitialProps && await AuthComponent.getInitialProps(ctx);
        // Return props.
        return { ...pageProps }
      }

      constructor(props) {
        super(props)
        this.state = {
          isLoading: true
        };
      }

      componentDidMount () {
        if (!Auth.loggedIn()) {
          Router.push('/')
        }
        this.setState({ isLoading: false })
      }

      render() {
        return (
          <div>
          {this.state.isLoading ? (
              <div>LOADING....</div>
            ) : (
              <AuthComponent {...this.props}  auth={Auth} />
            )}
          </div>
        )
      }
    }
}
```

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">🔐 Need to protect your <a href="https://twitter.com/hashtag/NextJS?src=hash&amp;ref_src=twsrc%5Etfw">#NextJS</a> pages behind a login? Use a <a href="https://twitter.com/hashtag/HOC?src=hash&amp;ref_src=twsrc%5Etfw">#HOC</a> to wrap your page components, check the <a href="https://twitter.com/hashtag/API?src=hash&amp;ref_src=twsrc%5Etfw">#API</a> token, and redirect users if it fails 🙅‍♂️ Bonus: <a href="https://twitter.com/hashtag/SSR?src=hash&amp;ref_src=twsrc%5Etfw">#SSR</a> data fetching using the child&#39;s getInitialProps in the HOC 🙌 <a href="https://t.co/EEaNPRXTIx">https://t.co/EEaNPRXTIx</a> <a href="https://twitter.com/hashtag/ReactJS?src=hash&amp;ref_src=twsrc%5Etfw">#ReactJS</a> <a href="https://twitter.com/hashtag/javascript?src=hash&amp;ref_src=twsrc%5Etfw">#javascript</a> <a href="https://t.co/naJR9mNBo4">pic.twitter.com/naJR9mNBo4</a></p>&mdash; Ryosuke (@whoisryosuke) <a href="https://twitter.com/whoisryosuke/status/1011738754355089408?ref_src=twsrc%5Etfw">June 26, 2018</a></blockquote>

Hope that helps,
Ryo

***

**References**

* [Original tweet](https://twitter.com/whoisryosuke/status/1011738754355089408)
* [See the code gist](https://gist.github.com/whoisryosuke/d034d3eaa0556e86349fb2634788a7a1)