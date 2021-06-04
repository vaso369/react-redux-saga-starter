// @flow
import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'

// chrome extension helper or use just the regular compose if not installed
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = function (
  rootReducer: Function,
  rootSaga: Function,
  history: any,
) {
  // init saga
  const sagaMiddleware = createSagaMiddleware()

  // init store
  let store
  if (process.env.MODE === 'dev') {
    store = createStore(
      rootReducer(history),
      composeEnhancers(
        applyMiddleware(routerMiddleware(history), sagaMiddleware),
      ),
    )
  } else {
    store = createStore(
      rootReducer(history),
      composeEnhancers(
        applyMiddleware(routerMiddleware(history), sagaMiddleware),
      ),
    )
  }

  // run watchers
  sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore
