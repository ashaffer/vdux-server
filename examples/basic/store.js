/**
 * Imports
 */

import {createStore, applyMiddleware} from 'redux'
import component from 'virtex-component'
import reducer from './reducer'

/**
 * Store
 */

function configStore (...middleware) {
  return initialState => applyMiddleware(component, ...middleware)(createStore)(reducer, initialState)
}

/**
 * Exports
 */

export default configStore
