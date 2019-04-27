import React, { Component, Fragment } from 'react';

import MiniTable from './common/MiniTable';
import Description from './common/Description';
import Reviews from './common/Reviews';

class Composition extends Component {

  state = {
    edit_id: '',
    desc: true,
    facs: false,
    rev: false,
    edit: false
  }

  componentWillReceiveProps(nextProps) {
    // if(nextProps.success.success) {
    //   this.setState({
    //     edit_id: '',
    //     edit: false
    //   })
    // }
  }

  renderSection = props => {
    if(this.state.desc) {
      return(
        <Description
          closeEdit={this.closeEdit}
          {...this.state}
          {...props}
        />
      )
    }
    if(this.state.facs) {
      return(
        <MiniTable
          onEdit={this.onEdit}
          closeEdit={this.closeEdit}
          {...this.state}
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

  onEdit = spec => {
    if(Object.keys(spec).length > 0) {
      this.props.setSpec(spec)
      this.setState({
        edit_id: spec._id
      })
    }
    this.setState({
      edit: true
    })
  }

  closeEdit = () =>
    this.setState({
      edit_id: '',
      edit: false
    })

  render() {
    return(
      <Fragment>
        <ul className="desc-u-block-h">
          <li onClick={() => this.setState({ desc: true, facs: false, rev: false })} className={`header-w-text`}>
            <span className={`${this.state.desc ? "clicked" : null}`}>Описание</span>
          </li>
          <li onClick={() => this.setState({ desc: false, facs: true, rev: false })} className={`header-w-text`}>
            <span className={`${this.state.facs ? "clicked" : null}`}>Факультеты и специальности</span>
          </li>
          <li onClick={() => this.setState({ desc: false, facs: false, rev: true })} className={`u-p-d-block`}>
            <span className={`${this.state.rev ? "clicked" : null}`}>Отзывы</span>
          </li>
          {
            this.state.desc ?
            <li>
              <div onClick={this.onEdit} className="edit-icon">
                <img src="/images/pencil.svg" />
              </div>
            </li> :
            null
          }
        </ul>
        <div className="desc-u-text">
          { this.renderSection(this.props) }
        </div>
      </Fragment>
    )
  }
}

export default Composition;
