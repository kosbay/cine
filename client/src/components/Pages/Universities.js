import React, { Fragment } from 'react'

import Card from './common/Card'
import Layout from '../Layout/InfoLayout'

const Universities = props =>

    <Layout count={props.univer.count}>
      <div className="u-page home">
        {
          props.univer.univers ?
            props.univer.univers.map(univer =>
              <Card key={univer._id} {...univer} />
            ) :
          null
        }
      </div>
    </Layout>

export default Universities
