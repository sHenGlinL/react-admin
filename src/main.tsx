import React from 'react'
import ReactDOM from 'react-dom/client'
import 'reset-css'
import '@/styles/global.scss'
// import BaseRouter from './router'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@/store' 

// @todo React.StrictMode严格模式的作用？
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter basename={import.meta.env.VITE_BASE_NAME}>
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
)
