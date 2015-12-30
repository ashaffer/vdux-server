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
      const tree = app(state)
      const html = create(tree)

      if (ready(state)) {
        resolve({
          tree: removeThunks(tree),
          html
        })
        unsub()
      }
    }
  })
}

function removeThunks (vnode) {
  if (typeof vnode.type !== 'string') {
    return removeThunks(vnode.vnode)
  }

  vnode.children = vnode.children.map(removeThunks)
  return vnode
}

/**
 * Exports
 */

export default server
