import React from 'react';
import PropTypes from "prop-types";

const DefaultStyledContainer = ({children}) => 
  (
    <div style={{ minHeight: "calc(100vh - 48px)", backgroundColor: 'transparent'}} >
      { children.children > 1 ? children.map(child => child): children } 
    </div>
    )


    DefaultStyledContainer.propTypes = {
      children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
      ]).isRequired,
    }

    export default DefaultStyledContainer;