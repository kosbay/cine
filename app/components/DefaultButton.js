import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'antd';
import Router from 'next/router';

const DefaultType = styled(Button)`
  height: 40px;
  width: auto;
  display: flex;
  justify-content: center;
  border-radius: 4px;
  font-size: 16px;
  color: #7a89ff;
  align-items: center;

  :focus {
    border-color: #d9d9d9;
    color: #7a89ff;
  }

  :hover {
    border-color: #7a89ff;
    color: #7a89ff;
  }
`;


const PrimaryType = styled(Button)`
  width: 144px;
  height: 40px;
`;


const DefaultButton = ({
  type, children, extraStyle, loading, onClick, to, size, ...otherProps
}) => {
  switch (type) {
    case 'primary': {
      return (
        <PrimaryType style={extraStyle} type="primary" size={size} loading={loading} onClick={to ? () => Router.push(to) : onClick} {...otherProps}>
          {children}
        </PrimaryType>
      );
    }
    case 'dashed': {
      return (<DefaultType style={extraStyle} type="dashed" size={size} loading={loading} onClick={to ? () => Router.push(to) : onClick} {...otherProps}>{children}</DefaultType>);
    }
    default: {
      return (<DefaultType loading={loading} style={extraStyle} type="default" size={size} onClick={to ? () => Router.push(to) : onClick} {...otherProps}>{children}</DefaultType>);
    }
  }
};


DefaultButton.propTypes = {
  type: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  extraStyle: PropTypes.shape({}),
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.string,
};

DefaultButton.defaultProps = {
  type: 'default',
  children: 'Button',
  extraStyle: {},
  loading: false,
  size: 'default',
  onClick: () => {},
};


export default DefaultButton;
