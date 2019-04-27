import React from 'react'

import Line from '../Charts/Line'
import Card from './common/Card'
import Table from './common/Table'

const Home = props =>

  <div className='home'>
    {/*<div className="card-container">
      <Line />
      <Line />
      <Line />
    </div>*/}
    <div className="h-head-text">
      <div className="h-text-b">
        <span>ПОПУЛЯРНЫЕ</span><br />
        <span>УНИВЕРСИТЕТЫ</span>
      </div>
    </div>
    <div className="card-container">
      {
        props.univer.top_univers ?
          props.univer.top_univers.map(univer =>
            <Card key={univer._id} {...univer} />
          ) :
        null
      }
    </div>
    <div className="h-head-text">
      <div className="h-text-b">
        <span>ПОПУЛЯРНЫЕ</span><br />
        <span>СПЕЦИАЛЬНОСТИ</span>
      </div>
    </div>
    <Table {...props.spec} />
  </div>

export default Home
