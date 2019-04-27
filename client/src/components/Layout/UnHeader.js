import React from 'react'
import { Link } from 'react-router-dom'

const UnHeader = props =>

  <header className='header'>
    <div className="logo">
      <Link to='/'><img className="logo-img" src="/images/all_logo.png" /></Link>
    </div>
  </header>

export default UnHeader
