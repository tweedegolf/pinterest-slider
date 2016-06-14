import 'babel-polyfill'
import React from 'react'
import Relay, {RootContainer} from 'react-relay'
import ReactDOM from 'react-dom'
import App from './containers/app'
import AppRoute from './relay/app_route'
import networkLayer from './relay/network_layer'

document.addEventListener('DOMContentLoaded', function(){

  Relay.injectNetworkLayer(networkLayer)

  ReactDOM.render(
    <RootContainer
      Component={App}
      route={new AppRoute()}
      renderLoading={() => (<div className={'message'}>{'checking session'}</div>)}
    />,
    document.getElementById('app')
  )
})
