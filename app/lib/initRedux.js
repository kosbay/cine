import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
};

// Get the Redux DevTools extension and fallback to a no-op function
let devtools = f => f;
if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

const persistedReducer = persistCombineReducers(persistConfig, rootReducer);

const enhancedCreateStore = (...storeArgs) => {
  const store = createStore(...storeArgs);
  const persistor = persistStore(store);
  return { store, persistor };
};

let configuredStore = null;

// Create store with reducers and initial state
const initStore = (initialState = {}) => {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return enhancedCreateStore(
      persistedReducer,
      initialState,
      compose(
        applyMiddleware(thunk),
        devtools
      )
    );
  }

  // Reuse store on the client-side
  if (!configuredStore) {
    configuredStore = enhancedCreateStore(
      persistedReducer,
      initialState,
      compose(
        applyMiddleware(thunk),
        devtools
      )
    );
  }

  return configuredStore;
};

export default initStore;
