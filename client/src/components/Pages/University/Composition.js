import React, { Component, Fragment } from 'react';

import MiniTable from '../common/MiniTable';
import Reviews from './Reviews'

class Composition extends Component {

  state = {
    desc: true,
    fac: false,
    rev: false
  }

  renderSection = props => {
    if(this.state.desc) {
      return(
        <p className="stat-v-text">
          { props.univer.univer.description }
        </p>
      )
    }
    if(this.state.fac) {
      return(
        <MiniTable
          {...props}
        />
      )
    }
    if(this.state.rev) {
      return(
        <Reviews
          {...props}
        />
      )
    }
  }

  render() {
    return(
      <Fragment>
        <ul className="desc-u-block-h">
          <li onClick={() => this.setState({ desc: true, fac: true, rev: false })} className={`header-w-text`}>
            <span className={`${this.state.desc ? "clicked" : null}`}>Описание</span>
          </li>
          <li onClick={() => this.setState({ desc: false, fac: true, rev: false })} className={`header-w-text`}>
            <span className={`${this.state.fac ? "clicked" : null}`}>Факультеты и специальности</span>
          </li>
          <li onClick={() => this.setState({ desc: false, fac: false, rev: true })} className={`header-w-text`}>
            <span className={`${this.state.rev ? "clicked" : null}`}>Отзывы</span>
          </li>
        </ul>
        <div className="desc-u-text">
          { this.renderSection(this.props) }
        </div>
      </Fragment>
    )
  }
}

export default Composition;
