# react-transition-noscroll

> Curtain lift like animation for internal page transition.

> While navigating through different sub pages in a single page application, browser remembers the scroll position and we need to scroll to desired position programatically. While rendering massive components, the scroll is completely visible. Hide that scroll with the help of React Modal.

[![NPM](https://img.shields.io/npm/v/react-transition-noscroll.svg)](https://www.npmjs.com/package/react-transition-noscroll) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-transition-noscroll
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'react-transition-noscroll'
import 'react-transition-noscroll/dist/index.css'

class Example extends Component {
  render() {
    return <MyComponent />
  }
}
```

```jsx

<ExampleComponent 
  hideScroll={true}         // Hide the scroll
  redirections= {[
    {count: 3,viewport:2},  // Count: No. of component in 1st Sub page
    {count: 3,viewport:2},  // Viewport: No. of component in viewport
    {count: 3,viewport:2}]}
  styles={{                 // set style for transition div
    right: "48%",
    borderRadius: "30%",
    backgroundColor: "white",
  }}
  svg={                     // set svg in transition div
    <svg
      stroke="red"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>}
>

```

## Demo

shashank.ml/demo

## License

MIT © [shivam](https://github.com/ricku44)
