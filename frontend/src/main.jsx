import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import store from './store';
import { Provider } from 'react-redux';
import MainRouter from './components/navigation/MainRouter.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <MainRouter />
    </Provider>
  </React.StrictMode>,
)
