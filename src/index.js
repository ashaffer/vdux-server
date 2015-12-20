/**
 * Imports
 */

import virtex from 'virtex'

/**
 * vdux-server
 */

function server (store, app, ready = () => true) {
  return new Promise((resolve, reject) => {
    const {create} = virtex(store.dispatch)

    render()
    const unsub = store.subscribe(render)

    function render () {
      const state = store.getState()
      const html = create(app(state))

      if (ready(state)) {
        resolve(html)
        unsub()
      }
    }
  })
}

/**
 * Exports
 */

export default server
