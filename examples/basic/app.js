/**
 * Imports
 */

import element from 'virtex-element'

/**
 * Render
 */

function render ({props}) {
  return <div onClick={increment}>Counter: {props.counter}</div>
}

function increment () {
  return {
    type: 'INCREMENT'
  }
}

/**
 * Exports
 */

export default render
