import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import 'primeicons/primeicons.css'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import './App.scss'
import Notification from './components/Notification'
import configureStore from './configureStore'
import Home from './pages/Home/Home'
import rootReducer from './reducers/rootReducer'
import rootSaga from './saga/saga'

const history = createBrowserHistory()

// create the store
const store = configureStore(rootReducer, rootSaga, history)

history.listen(() => {
  // top position after route switch
  window.scrollTo(0, 0)
})

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Notification />
        <Route
          render={({ location }) => {
            return (
              <>
               <Route exact path="/" component={Home} />
              </>
            )
          }}
        />
      </ConnectedRouter>
    </Provider>
  )
}

export default App
