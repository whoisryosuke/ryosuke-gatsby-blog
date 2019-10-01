---
title: React Hooks, Suspense, and Memo
date: "2019-02-04"
section: blog
cover_image: "./react-hooks-suspense-memo@0.5x.jpg"
tags: [ 'react', 'js', 'guide' ]
---

Things are blowing up in the React community lately! Between the *suspense* we had for a few months, Create React App v2, Hooks, Memo -- React developers new and old have their plates full with new toys to play with. I finally got some time to dig into the new `React.memo()`, `React.lazy()` and `<Suspense />` APIs, as well as the proposed Hooks API.

## PureComponent for Functional Components

A new technique to memoize! `React.memo()` is a HOC that prevents a component from rendering on props change if the props are the same. It basically runs a shallow equal on the props in the `shouldComponentUpdate()` lifecycle, but for functional components that don’t have access to it (without switching to a class). 

```js
const MyComponent = React.memo(function MyComponent(props) {
  /* render using props */
});
```

And if the props contain complex objects, we can add a function inside the component to check:

```js
function MyComponent(props) {
  /* render using props */
}
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}
export default React.memo(MyComponent, areEqual);
```

This is a great performance gain for component and design systems that rely on functional components for rendering lower-level UI elements. 

### A callback “cache”

There’s also a new hook implemented that uses the same memoization logic on functions. It prevents the function from being called again unless it’s parameters (or variables you specify) change:  

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

## The suspense is over 🌟

The first thing I wanted to dig into was Suspense, since it's actually implemented (if not incomplete). After watching Dan's [incredible talk about Suspense at ReactFest 2018 in March](https://www.youtube.com/watch?v=6g3g0Q_XVb4), I was excited that React was making lazy loading a priority enough to incoporate it into their API. Rather than relying on a library like [react-loadable](https://github.com/jamiebuilds/react-loadable#readme) or configurations in Webpack, I can just simply:

```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

Not only do I get the benefit of deferring the loading of my components bundle (making the app load initially faster), but I can also plug in any loading component. It makes illusions like *skeleton screens* an effortless task.

You can see [a live example on CodeSandbox](https://codesandbox.io/s/y2453lj5xj?view=editor):

<iframe src="https://codesandbox.io/embed/y2453lj5xj?view=editor" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Hooks

Recently React has proposed a new, more functional way of handling state using "hooks", rather than relying on the lifecycle methods of a React component. You can find [the entire proposal in the React docs here](https://reactjs.org/docs/hooks-intro.html).

Using them is simple, and offers a lower LOC with functional components compared to the class alternative.

```js
function YourComponent({ text }) {
  const [ theText, updateText] = useState(text)
  const changeText = ({ target: { value } }) => {
    updateText(value)
  }
  return(
    <button onClick={() => changeText}>
      {theText}
    </button>
  )
}
```

To handle any side effects in the component, throw in a `useEffect()` inside the functional component to run code on each state change / re-render.

One of the best part of hooks is their functional nature (FP FTW). You can extract the hook and effect into a separate function, and re-use that hook across multiple components in the app.

### Hooks = Less Compiled Code

One of the best parts of the addition of hooks is the ability to abandon classes for stateful logic in favor of more efficient functions. If you've ever looked at most compiled JS code, because of the way classes work (being syntactic sugar over prototypes), using a class in your app bloats your code immensely with polyfills. 

This class:

```js
class Test extends React {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return <div>Test</div>
  }
}
```

compiles to:

```js
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Test = function (_React) {
  _inherits(Test, _React);

  function Test() {
    _classCallCheck(this, Test);

    var _this = _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this));

    _this.state = {};
    return _this;
  }

  _createClass(Test, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        "Test"
      );
    }
  }]);

  return Test;
}(React);
```

In contrast, if you use a function (unless it's a ES6 arrow function), it compiles just as it appears -- since functions are so broadly supported (being so primitive/early JS API). Even when you take array destructuring into account, [the code is still less than the class](https://babeljs.io/repl/#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=GYVwdgxgLglg9mABAFQKYGcoAoAOAnOHdASkQG8AoRRCBTRAbVvClTwBpEZI9UBbVGCgBdRAF5EIdKgDKUAIassABmIBuKol5QQeJAB4AFgEYAfAAlUAGytx9AehOmNAXyA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=6.26.0&envVersion=), while being able to use state:

```js
function Test(props) {
  const [counter, increment] = useState(0);
  return <h1>Hello</h1>;
}
```

```js
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function Test(props) {
  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      counter = _useState2[0],
      increment = _useState2[1];

  return React.createElement(
    "h1",
    null,
    "Hello"
  );
}
```

## A more composable future for React

It's been nice to see the improvements to the React API over the past year. The team does a fantastic job of maintaining legacy API and not breaking apps (Facebook still using `React.createElement`), and the addition of new features all address key issues developers have. I can't tell you how many times I've had to take a functional component and convert it into a class just for a single stateful boolean, where now I'll be able to just drop a hook in the top of the function (and memoize it to get the same perf as PureComponent!).

Cheers 🍻
Ryo

***

**References**:

* [awesome-react-hooks](https://github.com/rehooks/awesome-react-hooks)
* [Hooks Guide](https://www.hooks.guide/)
* [Dan Abramov - Making sense of hooks](https://dev.to/dan_abramov/making-sense-of-react-hooks-2eib)
* [React: CRA v2](https://reactjs.org/blog/2018/10/01/create-react-app-v2.html)
* [React: Intro to Hooks](https://reactjs.org/docs/hooks-intro.html)
* [React: Code Splitting](https://reactjs.org/docs/code-splitting.html)
* [React: Suspense](https://reactjs.org/docs/react-api.html#suspense)
* [React: memo](https://reactjs.org/docs/react-api.html#reactmemo)