import React from 'react';

import Info from './Info';
import Contact from './Contact';

const EditProfile = props =>

<div className="home">
    {
      props.univer.univer ?
      <div className="u-i-cont">
        <Info {...props} />
        <Contact {...props} />
      </div> :
      null
    }
</div>

export default EditProfile;
