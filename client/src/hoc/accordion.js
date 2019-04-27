import React, {Component} from 'react'

export default (OriginalComponent) =>
  class Accordion extends Component {
    state = {
      openItemId: 1
    }

    clickBtnItem = openItemId => ev => {
      this.setState({
        openItemId: openItemId
      })
    }

    render() {
      return <OriginalComponent
        {...this.props}
        {...this.state}
        openItemId={this.state.openItemId}
        clickBtnItem={this.clickBtnItem}
      />
    }
  }
