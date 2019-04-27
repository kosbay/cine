import React from 'react';
import { hoistStatics } from 'recompact';

import { Notifications } from 'components';

const withNotification = hoistStatics((ComposedComponent) => {
  const WithNotification = props => (
    <>
      <Notifications />
      <ComposedComponent {...props} />
    </>
  );

  return WithNotification;
});

export default withNotification;
