import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import store from './store'
import injectTapEventPlugin from 'react-tap-event-plugin'


import * as actionsCreators from './actions/actionCreators'
import { addActionCreators } from 'react-redux-connectme'
 
addActionCreators(actionsCreators)

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)