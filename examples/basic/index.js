/**
 * Imports
 */

import element from 'virtex-element'
import configStore from './store'
import dom from 'virtex-dom'
import App from './app'
import vdux from 'vdux'

/**
 * Store
 */

const store = configStore(dom(document))(window.__initialState__ || {counter: 0})

/**
 * Initialize app
 */

document.addEventListener('DOMContentLoaded', () => {
  vdux(
    store,
    state => <App counter={state.counter} />,
    document.body,
    __initialTree__
  )
})
