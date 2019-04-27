import React, { Fragment } from 'react'

import UnHeader from '../../Layout/UnHeader'
import Steps from './Steps'
import Page1 from './Page1'
import Page2 from './Page2'

const AddUniverProfile = props =>

  <Fragment>
    <UnHeader />
    <div className="home flex">
      <div className="padding20">
        <Page1
          {...props}
        />
        <Page2
          {...props}
        />
      </div>
      <Steps
        {...props}
      />
    </div>
  </Fragment>

export default AddUniverProfile
