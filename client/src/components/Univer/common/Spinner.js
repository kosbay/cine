import React from 'react';
import { fileserver } from '../../../constants';

export default () => {
  return (
    <div>
      <img
        src={`http://${fileserver}:9999/uploads/image/spinner.gif`}
        style={{ width: '100px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
    </div>
  );
};
