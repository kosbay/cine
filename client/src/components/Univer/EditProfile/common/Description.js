import React, { Fragment } from 'react';

import EditDesc from './EditDesc';

const Description = props =>

  <Fragment>
    {
      props.desc && props.edit ?
        <EditDesc {...props} /> :
        <p className="stat-v-text">
          { props.univer.univer.description }
        </p>
    }
  </Fragment>

export default Description;
