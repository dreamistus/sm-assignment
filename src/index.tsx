import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from 'store';
import { PersistGate } from 'redux-persist/integration/react';
// import reportWebVitals from 'reportWebVitals';

import App from './App';

import './index.scss';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Provider store={ store }>
        <PersistGate loading={ null } persistor={ persistor }>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );

  // reportWebVitals(console.info);
}
