/**
 * Imports
 */

import element from 'virtex-element'
import browserify from 'browserify'
import string from 'virtex-string'
import configStore from './store'
import reducer from './reducer'
import route from 'koa-route'
import views from 'co-views'
import vdux from '../../src'
import App from './app'
import koa from 'koa'

/**
 * Constants
 */

const app = koa()
const render = views('views')

/**
 * App
 */

app.use(route.get('/index.js', function * () {
  this.body = browserify('./index.js')
    .transform('babelify')
    .bundle()
}))

app.use(route.get('/:counter?', function *(counter = 0) {
  counter = Number(counter)

  const store = configStore(string)({counter})
  const html = yield vdux(store, state => <App counter={state.counter} />)
  const state = store.getState()

  this.body = yield render('page.ejs', {
    html,
    state
  })
}))

/**
 * Listen
 */

app.listen(3000)
console.log('listening', 3000)
