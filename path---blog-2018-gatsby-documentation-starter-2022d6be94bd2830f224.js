webpackJsonp([24161790756626],{580:function(e,t){e.exports={data:{blog:{html:'<p>I recently was exploring different documentation solutions for design systems, and through my experimentation I <strong>created a template to create Gatsby documentation for any React project.</strong></p>\n<p>Write your documentation inline with your components as <a href="http://usejsdoc.org/">docblocks</a>, and add more in-depth descriptions + live examples using <a href="https://github.com/mdx-js/mdx">MDX</a>. Check out the <a href="https://gatsby-documentation-starter.netlify.com">demo here.</a></p>\n\n  <a class="gatsby-resp-image-link" href="/static/screenshot-e991536017bd42e7c1e36696cc0ff3cc-d6e32.png" style="display: block" target="_blank" rel="noopener">\n  \n  <span class="gatsby-resp-image-wrapper" style="position: relative; display: block; ; max-width: 1080px; margin-left: auto; margin-right: auto;">\n    <span class="gatsby-resp-image-background-image" style="padding-bottom: 75.03184713375795%; position: relative; bottom: 0; left: 0; background-image: url(&apos;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsSAAALEgHS3X78AAADXUlEQVQ4y2WSWWxUZRTHT+i8OBmCvvlkfHGF4MJQSY2EkLo9CMUwdlNrjaUopVSxGlcWTYwGNUqrCZAgQQyUCGkhICk0xKhERGijM5KZ6Uxnv3dm7mzFWIH255nbMtJwk3/Od7+b+zv/s8ibYtEtaV5TdUmKDZJgvURZJ2FellHaxM9LcpEXxUeL/EGTXKBZzuORX/Vc1hka5Sfq5bTeDSEbFdIlcTpdXtbPHWGda5iOeaqbz7N27lna552l5aafaa46TaNjCI/jpOoETzuOaTxGnWOAuqoBVsoJ1Q9Ih7p5xRGkd8MQ32wdYsdbg2zfeJSe14/yVfdxdr03yLb2ft737GdzwwE21R9g84zsc9N+3l7Rx1NVR6iVw0i7BNRdgL9+i1MsFbk8cRWf9yIXfh8mY2YxjQyZdBbLyt2gbMaiNJ4n+GeKFc5+lksf0qq9WePykUtOAFOUn0hkDK/XSyqVpFQqUSjkbeXzs5XL5bj0d5GgL8WTzj6WybdIkwzTqn0bz1yxYZOTUwpKEQgECYfDxGIxopGoJomSTCbJZi3yuWlY2eX4pQJBb5InnN+xVHYjz8k52lznKKYv28ApNZlOpwmFQowGRwkqOBAI2DGbzVacVYBlhzZwD4/IDqRBflGHZ/4HqsMybGRkhEQiYcPTZtqOZcg1YDleD3zUuZMa6UE8uj/Pu35U4L8zDqcIh8IVYLFYnNWz63UNGPAmWObsoVo+RVbJIE2uUxQqQOxeRaOxG4ZQKBRmwS3LmgHGWer8nAflI+QxGcDjOk7BnKgMJawllwdR/snQcg3TtMtOJlO6KlkMw5wuO1fQKZfwe2PUOD/mPtmCLJfvqXP1U8xMVEpOKCBlGCTUqTEWxozHMLWHht6ZpoHf79epR+ykVj5jA5c4P2SBvIM8LgdZ5TpEzvjHBl69MomhC5tRpc0Mlq6Qpe7K71Z2+i4eTRCLxomMRTVJEt9wiMXOTdwjbyC1so/aOXtZ6z5CW81h1iw5RFv1QV5YvI+W6r08W72HZvduGhftpEm1etEXrHR/wjPu7TS4e6mv/pK6hduYP6ebu+VV5GHZxUPyNW7pZaF8xv2qB3RaC7TB98oHmnUL82Urd8q73KW6TTq4RVZzq7Ryu3SpOlUd+r2TOzT+B4+XfGIpxFYRAAAAAElFTkSuQmCC&apos;); background-size: cover; display: block;">\n      <img class="gatsby-resp-image-image" style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;" alt="Screenshot of demo documentation site" title="" src="/static/screenshot-e991536017bd42e7c1e36696cc0ff3cc-e2462.png" srcset="/static/screenshot-e991536017bd42e7c1e36696cc0ff3cc-f6591.png 270w,\n/static/screenshot-e991536017bd42e7c1e36696cc0ff3cc-cce5f.png 540w,\n/static/screenshot-e991536017bd42e7c1e36696cc0ff3cc-e2462.png 1080w,\n/static/screenshot-e991536017bd42e7c1e36696cc0ff3cc-d6e32.png 1570w" sizes="(max-width: 1080px) 100vw, 1080px">\n    </span>\n  </span>\n  \n  </a>\n    \n<p>If you\'re code is <em>already</em> documented, and your components are located in <code class="language-text">src/components</code> -- then <strong>you\'re good to go!</strong> Clone this project into your codebase and <em>let it rip!</em> 🚀</p>\n<p>Don\'t have that setup? <em>Don\'t worry!</em> I cover everything below 👇</p>\n<h2>Getting started</h2>\n<p><strong>Install with Netlify</strong></p>\n<ol>\n<li><a href="https://app.netlify.com/start/deploy?repository=https://github.com/whoisryosuke/gatsby-documentation-starter/tree/example"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a></li>\n</ol>\n<p><strong>Install with Gatsby CLI</strong></p>\n<ol>\n<li><code class="language-text">gatsby new docs https://github.com/whoisryosuke/gatsby-documentation-starter/</code></li>\n</ol>\n<p><strong>Install from Github</strong></p>\n<ol>\n<li><code class="language-text">git clone https://github.com/whoisryosuke/gatsby-documentation-starter.git</code></li>\n<li>Update <code class="language-text">gatsby-config.js</code> with the location of your components + MDX <em>(see: "Changing source folder")</em></li>\n<li><code class="language-text">npm install</code> inside project</li>\n<li><code class="language-text">npm run develop</code></li>\n<li>View your documentation: <a href="http://localhost:8000">http://localhost:8000</a></li>\n</ol>\n<h3>Creating documentation</h3>\n<p>Documentation is sourced from two places: component source code and MDX files.</p>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">src\n└── components\n    └── Button\n        ├── Button.js\n        └── Button.mdx</code></pre>\n      </div>\n<p><a href="https://github.com/reactjs/react-docgen"><strong>React-docgen</strong></a> grabs any JS Docblocks you write for your React classes/functions (<code class="language-text">Button.js</code>), as well as the Prop Types. These are displayed on your documentation page, with the props organized in a table.</p>\n<p>Inside your <strong>MDX</strong> file you can write additional documentation with JSX examples (like React components!). You can also specify the page slug here (a <strong>page name</strong> and <strong>category</strong>). Your pages will be generated as <code class="language-text">http://yoursite.com/&lt;category&gt;/&lt;pageName&gt;</code>.</p>\n<p>In order for your component data to show up, you need an MDX file for the component - and the page name and component name in the docblock need to match. </p>\n<blockquote>\n<p>If you don\'t want to create MDX files and generate pages directly from components/JS files -- see the Github docs section: "Creating pages from react-docgen". The reason I chose MDX foremost is the flexibility of the frontmatter, allowing you to create different "sections" for components (if you have elements vs typography for example).</p>\n</blockquote>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">/**\n * ComponentTitle\n**/</span>\n<span class="token keyword">class</span> <span class="token class-name">ComponentName</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-md"><code class="language-md">---\nname: ComponentTitle\nmenu: CategoryName\n---</code></pre>\n      </div>\n<blockquote>\n<p>Creates a page for the component located at <a href="http://localhost:8000/categoryname/componentname">http://localhost:8000/categoryname/componentname</a></p>\n</blockquote>\n<h2>How does it work?</h2>\n<p>Gatsby can get pretty complicated if you\'ve never sat down and actually spun up a "Hello World" - and it can get even more complex when building a blog. </p>\n<p>Here\'s how it works on a high-level: </p>\n<ol>\n<li>Gatsby pulls data from your project (JS and MDX files)</li>\n<li>The data gets transformed into a GraphQL data layer</li>\n<li>During the build process, Gatsby generates pages for each component using the MDX files. The pages are React components that query GraphQL for our component\'s documentation + parsed MDX</li>\n</ol>\n<blockquote>\n<p>If you\'re not familiar with how Gatsby works, <a href="http://gatsby.org">check out their website</a> for more info. It\'s basically a static-site generator that uses GraphQL during development to generate static pages from dynamic data sources (APIs, local files, etc). </p>\n</blockquote>\n<h2>A little slower please</h2>\n<p>Gatsby pulls data into GraphQL, transforms the data (like parsing Markdown), then builds pages based off React components.</p>\n<p>Let\'s break each of those parts down.</p>\n<h3>♻️ The Data Part</h3>\n<p>Gatsby works by using "source" plugins to aggregate data into GraphQL. This project is setup with <code class="language-text">gatsby-source-filesystem</code>, which allows you to use the project\'s local filesystem (grabbing any file, from TXT to JS to MDX). This creates a GraphQL endpoint with all imported files. Each queried file, or GraphQL "node", contains auto-generated ID and a stringified version document body. </p>\n<h3>✨ The Transforming Part</h3>\n<p>Then Gatsby uses <strong>"transformer"</strong> plugins to create different GraphQL endpoints structured for specific datasets. If you query GraphQL for the data that the "source" plugin imported, you\'d notice that it\'s pretty barebones. The transformer plugins do just that, <em>transform</em> the data into usable formats. For example, <code class="language-text">gatsby-transformer-json</code> goes through each file, checks if it\'s JSON, then parses the body string back into an object/array.</p>\n<p>This template uses <a href="https://github.com/ChristopherBiscardi/gatsby-mdx/">gatsby-mdx</a> by <a href="https://github.com/ChristopherBiscardi/">@ChristopherBiscardi</a> and <a href="https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-react-docgen">gatsby-transformer-react-docgen</a> by the Gatsby team. <strong>gatsby-mdx</strong> parses any MDX files and creates cached HTML+JS files that are imported into pages. <strong>gatsby-transformer-react-docgen</strong> uses <a href="https://github.com/reactjs/react-docgen">react-docgen</a>, a CLI tool created by the Facebook team to pull documentation from React components. It runs the CLI on any JS files you import and creates GraphQL endpoints for it.</p>\n<h3>⚙️ The Build Part</h3>\n<p>When Gatsby runs it\'s build process, it creates pages from any JS files we include inside the <code class="language-text">src/pages/</code> directory. </p>\n<p>During the build process, it also executes additional modules we add to <code class="language-text">gatsby-node.js</code>. This allows us to do things like add new nodes to GraphQL endpoints, or create pages from GraphQL queries.</p>\n<p>For this template, I query GraphQL for all MDX files, and create pages from those. The pages are generated from a "template", which is a React component capable of running GraphQL queries. As Gatsby is a framework, it offers an API/methods for all these actions (querying GraphQL, creating pages from React components, passing data to the React components, etc).</p>\n<h2>🎨 The Design Process</h2>\n<p>I wanted to keep the design and actual code pretty lightweight to make it easier to repurpose. The layout of the documentation is 2-column with a header, where the sidebar column disappears on mobile (and a "toggle sidebar" button appears in the header). The snazzy animated mobile button was pulled from Codepen by <a href="https://codepen.io/ainalem/">@ ainalem</a>.</p>\n<h2>🚀 Deploy to Netlify</h2>\n<p>This project is perfect for deploying on Netlify, since it\'s optimized for static-site generators like Gatsby. </p>\n<p>Once your fork your project, just import the Git repo into Netlify and it should handle the rest!</p>\n<h2>What if I don\'t like Gatsby/JS/React/etc?</h2>\n<p>There are plenty of documentation options out there if you\'re looking for a different solution:</p>\n<ul>\n<li><a href="https://github.com/pedronauck/docz/">Docz</a></li>\n<li><a href="https://github.com/styleguidist/react-styleguidist">react-styleguidist</a></li>\n<li><a href="https://docusaurus.io/">Docusaurus</a></li>\n<li><a href="https://vuepress.vuejs.org/">Vuepress</a></li>\n<li><a href="https://www.gitbook.com/">Gitbook</a></li>\n<li><a href="https://github.com/docsifyjs/docsify">docsify</a></li>\n</ul>\n<p>And <a href="https://github.com/topics/documentation">there are plenty more!</a> Don\'t feel limited to one particular stack or setup. Find one that gels with your flow.</p>\n<h2>Document everything!</h2>\n<p>I appreciate great tools that take your hard work slaving over <em>docblocks</em> and <em>proptypes</em>, and in a click of a button -- transform your codebase into a fully functioning and well-designed documentation site. </p>\n<p>I designed this for <strong>design systems</strong> in mind, but it can really work with <strong>any project</strong> that uses React components 🙌</p>\n<p>I\'m always looking to empower my fellow devs and designers with tools that can improve their workflow. If this helped you with your docs, let me know in the comments, or send me a tweet 👍</p>\n<p><a href="https://github.com/whoisryosuke/gatsby-documentation-starter">Clone project on Github</a> | <a href="https://gatsby-documentation-starter.netlify.com">View demo site</a></p>\n<p>Cheers 🍻\nRyo</p>\n<hr>\n<p><strong>References:</strong></p>\n<ul>\n<li><a href="https://github.com/whoisryosuke/gatsby-documentation-starter">gatsby-documentation-starter</a></li>\n<li><a href="https://gatsby-documentation-starter.netlify.com">Demo site</a></li>\n<li><a href="http://gatsby.org">GatsbyJS</a></li>\n<li><a href="https://github.com/ChristopherBiscardi/gatsby-mdx/">gatsby-mdx</a></li>\n<li><a href="https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-react-docgen">gatsby-transformer-react-docgen</a></li>\n<li><a href="https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark">gatsby-transformer-remark</a></li>\n<li><a href="http://bradfrost.github.io/style-guide-guide/">Style Guide Guide</a></li>\n<li><a href="https://codepen.io/ainalem/pen/LJYRxz">Mobile Button CSS</a></li>\n</ul>',frontmatter:{title:"Generate documentation for any React project using GatsbyJS",cover_image:{publicURL:"/static/gatsby-documentation-starter-1980px-4ff7e70c088e6077ddbe694f3ac79570.jpg",childImageSharp:{sizes:{tracedSVG:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='267' viewBox='0 0 400 267' version='1'%3E%3Cpath d='M0 134v133h401V0H0v134m85-41a40 40 0 0 0-10 72c28 19 66-3 62-37-1-14-10-27-23-33-7-3-22-4-29-2m133 8l1 9 4 1c6 0 8-2 8-6 0-7-4-11-8-8-1 1-1 1-1-2 0-2 0-3-2-3s-2 1-2 9m-54-6c-6 7-1 16 8 16h5v-10h-4c-3 0-4 0-4 2l2 1c2 0 3 3 0 4l-3-2c-4-3-1-11 5-10 3 1 3 1 3-1 0-3-8-3-12 0m92 0c-2 3 0 7 3 8 5 2 5 6-1 4-3 0-3 0-3 2l4 2c7 1 10-6 4-10-5-3-4-5 0-4 3 0 3 0 3-2-1-3-9-3-10 0M89 95c-21 5-33 27-28 47 4 14 16 25 28 27l7 1c4 0 13-2 19-5 5-2 13-9 13-11l2-3c6-7 7-25 2-35-8-16-27-25-43-21m93 3c-2 1-1 2 3 2l3 1-2 1c-4 0-6 2-6 6 0 2 1 3 6 3h6v-5c0-7-1-9-6-9l-4 1m50 0l1 3 2 7c2 4 2 4-1 5-2 1-3 3 0 4s6-3 9-11l2-9c-2-1-4 1-4 4-1 4-3 4-4 0s-5-6-5-3m-143 5c-9 3-19 12-20 21-1 2 33 37 36 37l7-3c8-4 14-12 16-22v-4h-19v3c0 2 0 3 5 3h7c1 2-7 13-12 16l-3 1-15-16-16-16 1-3c7-13 28-16 38-6l4 4 2-2 3-2-5-4c-7-7-20-10-29-7m74 31v9h5c7-1 9-3 9-9s-2-8-9-9h-5v9m2 0v7h4c8-2 8-14-1-14h-3v7m17-3c-4 4-2 12 4 12 8 0 9-10 1-13-2-2-3-2-5 1m41 0c-1 8-1 12 1 12l1-5c0-6 1-8 5-6l1 6c0 6 2 7 2 0 1-9 6-10 6-1 1 7 3 7 2 0 0-6-2-9-5-7h-12c-1-1-1 0-1 1m63-1c-3 0-2 2 1 2l4 1c0 2-1 2-3 2-3 0-6 2-6 4 0 3 2 4 6 4h5v-6c0-6 0-6-3-7l-2-1-2 1m28 0c-5 3-3 13 3 13 4 0 6-2 6-7 0-6-4-8-9-6m-247 6c3 10 10 20 18 23 5 2 11 4 11 2l-28-28-1 3' fill='lightgray' fill-rule='evenodd'/%3E%3C/svg%3E",src:"/static/gatsby-documentation-starter-1980px-4ff7e70c088e6077ddbe694f3ac79570-4e8db.jpg",srcSet:"/static/gatsby-documentation-starter-1980px-4ff7e70c088e6077ddbe694f3ac79570-7cc04.jpg 310w,\n/static/gatsby-documentation-starter-1980px-4ff7e70c088e6077ddbe694f3ac79570-69042.jpg 620w,\n/static/gatsby-documentation-starter-1980px-4ff7e70c088e6077ddbe694f3ac79570-4e8db.jpg 1240w,\n/static/gatsby-documentation-starter-1980px-4ff7e70c088e6077ddbe694f3ac79570-50ab1.jpg 1860w,\n/static/gatsby-documentation-starter-1980px-4ff7e70c088e6077ddbe694f3ac79570-5d231.jpg 1980w"}}},date:"21 September, 2018",tags:["documentation","boilerplate","react","mdx","javascript","jsx","guide"],section:"blog"},fields:{slug:"/blog/2018/gatsby-documentation-starter/"}},relatedPosts:null},pathContext:{tag:"boilerplate",slug:"/blog/2018/gatsby-documentation-starter/"}}}});
//# sourceMappingURL=path---blog-2018-gatsby-documentation-starter-2022d6be94bd2830f224.js.map