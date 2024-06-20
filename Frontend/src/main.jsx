import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {Provider} from 'react-redux'
import {store} from './Store/store.js'
import { Bounce, ToastContainer } from 'react-toastify'
import './index.scss'
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />

  </Provider>,
)
