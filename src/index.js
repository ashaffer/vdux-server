/**
 * Imports
 */

import virtex from 'virtex'

/**
 * vdux-server
 */

function server (store, app, ready) {
  return new Promise((resolve, reject) => {
    const {create} = virtex(store.dispatch)

    store.subscribe(() => {
      const state = store.getState()
      const html = create(app(state))

      if (ready(state)) {
        resolve(html)
      }
    })
  })
}

/**
 * Exports
 */

export default server
