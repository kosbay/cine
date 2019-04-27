import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';

const { SubMenu } = Menu;

const menuItemStyle = {
  margin: 0,
  backgroundColor: '#fff',
};

const subMenuStyle = { color: 'black' };

const SubMenuTitle = ({ title }) => (
  <span>{title}</span>
);

const SchoolSiderMenu = ({ faculties }) => faculties.map(faculty => (faculty.courses.length ? (
  <SubMenu
    key={faculty._id}
    style={subMenuStyle}
    title={<SubMenuTitle title={faculty.name} />}
  >
    {faculty.courses.map(course => (
      <Menu.Item
        style={menuItemStyle}
        key={`${course._id}-${course.name}`}
      >
        {course.name}
      </Menu.Item>
    ))}
  </SubMenu>
) : null));

SubMenuTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

SchoolSiderMenu.propTypes = {
  faculties: PropTypes.shape({}).isRequired,
};

export default SchoolSiderMenu;
