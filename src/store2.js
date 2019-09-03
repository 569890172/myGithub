import createLogger from 'redux-logger'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
  createNavigationReducer
} from 'react-navigation-redux-helpers'

import NavigationStack from './navigationStack'

const navReducer = createNavigationReducer(NavigationStack)

const reducers = combineReducers({nav: navReducer})

const middleware = createReactNavigationReduxMiddleware(
  
  state => state.nav,
  'root'
)

const configureStore = preloadedState => {
  return createStore(
    reducers,
    preloadedState,
    compose(
      applyMiddleware(middleware, createLogger)
    )
  )
}

export const store2 = configureStore()
