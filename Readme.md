
# vdux-server

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Server-side rendering for vdux

*Note: The examples in the examples folder are still a work in progress - they may or may not be working to varying degrees at the moment.*

## Installation

    $ npm install vdux-server

## Usage

vdux-server takes three arguments and returns a promise that resolves to the rendered html of the page.

  `vdux(store, app, ready)`
  * `store` - The redux store that processes your actions. Should probably include [virtex-string](https://github.com/ashaffer/virtex-string).
  * `app` - Your app. Accepts state, returns a vdom tree.
  * `ready` - Optional. Accepts state and returns a bool indicating whether or not the app is loaded. When this returns true, the promise returned by vdux-server will be resolved with the rendered html of the app.

## Example - Sync

If you don't want to do any asynchronous rendering:

```javascript
import koa from 'koa'
import app from './app'
import views from 'co-views'
import vdux from 'vdux-server'
import reducer from './reducer'
import configStore from './store'

const app = koa()
const render = views('views')

app.use(function *(next) {
  const initialState = {url: this.url}
  const store = configStore(reducer, initialState)

  const html = yield vdux(store, app)
  const state = store.getState()
  this.body = render('page.ejs', {html, state})
})
```

## Example - Async

You might want to use this if you are loading pages for authenticated users, and want to pre-fetch and render as much data as you can before handing it off to the client's browser:

```javascript
import koa from 'koa'
import app from './app'
import views from 'co-views'
import vdux from 'vdux-server'
import reducer from './reducer'
import configStore from './store'

const app = koa()
const render = views('views')

app.use(function *(next) {
  const initialState = {
    url: this.url,
    authToken: this.cookies.get('authToken')
  }
  const store = configStore(reducer, initialState)

  const html = yield vdux(store, app, state => state.loaded)
  const state = store.getState()
  this.body = render('page.ejs', {html, state})
})
```

## License

MIT
