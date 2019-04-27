import { shallow } from 'enzyme'
import React from 'react'

import Header from './Header'

it('expect header component', () => {
  expect(shallow(<Header />)).toMatchSnapshot()
})
