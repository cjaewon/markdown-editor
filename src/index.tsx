import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './typography.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import rootReducer from './modules';

const store = createStore(
  rootReducer,
  (window as any).__REDUX_STATE__,
  // composeWithDevTools(),
);

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workersㅊ: https://bit.ly/CRA-PWA
serviceWorker.unregister();
