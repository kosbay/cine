import React from 'react';
import PropTypes from 'prop-types';
import {
  Menu, Dropdown, Button,
} from 'antd';
import styled from 'styled-components';
import { withNamespaces } from 'react-i18next';

const StyledButton = styled(Button)`
  border-radius: 4px;
  min-width: 78.63px;
`;

const LocaleDropdown = ({ onClick, t }) => {
  const handleMenuClick = (e) => {
    onClick(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="ru">
        Русский
      </Menu.Item>
      <Menu.Item key="en">
        English
      </Menu.Item>
      <Menu.Item key="kz">
        Qazaq
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      placement="topCenter"
      overlayStyle={{ width: t('pages.locale') === 'Language' ? 95.88 : 78.63 }}
    >
      <StyledButton type="primary">
        {t('pages.locale')}
      </StyledButton>
    </Dropdown>
  );
};

LocaleDropdown.propTypes = {
  onClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withNamespaces()(LocaleDropdown);
