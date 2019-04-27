import { hoistStatics } from 'recompact';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import initRedux from '../lib/initRedux';
import { Loading } from '../components';

const { store, persistor } = initRedux();

const withData = hoistStatics((ComposedComponent) => {
  const WithData = props => (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loading />}>
        <ComposedComponent {...props} />
      </PersistGate>
    </Provider>
  );

  return WithData;
});

export default withData;
