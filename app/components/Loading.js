import React from 'react';
import { Icon } from 'antd';

import Images from '../theme/Images';

const logoSVG = Images.logotype;

const Loading = () => (
  <div style={{
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#606dc9',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  }
  }
  >
    <img
      alt="logo"
      src={logoSVG}
      style={{
        height: '68px',
        width: 'auto',
        marginBottom: '200px',
      }}
    />
    <Icon
      type="loading"
      style={{
        position: 'relative',
        fontSize: '80px',
        color: '#ffd263',
        left: 0,
        right: 0,
        bottom: '150px',
      }}
    />
  </div>
);

export default Loading;
