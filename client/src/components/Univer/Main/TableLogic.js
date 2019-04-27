import React, { Component, Fragment } from 'react';

import Table from './Table';

class TableLogic extends Component {

  state = {
    lightboxIsOpen: false,
    currentImage: 0
  }

  openLightbox = (index, e) => {
		e.preventDefault();
		this.setState({
			currentImage: index,
			lightboxIsOpen: true,
		});
	}

	closeLightbox = () => {
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false,
		});
	}

	gotoPrevious = () => {
		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	}

	gotoNext = () => {
		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	}

	gotoImage = (index) => {
		this.setState({
			currentImage: index,
		});
	}

	handleClickImage = () => {
		if (this.state.currentImage === this.props.apply[0].docs.length - 1) return;

		this.gotoNext();
	}

  render() {
    return(
      <Fragment>
        <Table
          openLightbox={this.openLightbox}
          closeLightbox={this.closeLightbox}
          gotoPrevious={this.gotoPrevious}
          gotoNext={this.gotoNext}
          gotoImage={this.gotoImage}
          handleClickImage={this.handleClickImage}
          {...this.props}
          {...this.state}
        />
      </Fragment>
    )
  }
}

export default TableLogic;
