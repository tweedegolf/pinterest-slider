import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/app'
import {Provider} from 'react-redux'
import getStore from './reducers'


document.addEventListener('DOMContentLoaded', function(){

  let store = getStore()

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  )
})
