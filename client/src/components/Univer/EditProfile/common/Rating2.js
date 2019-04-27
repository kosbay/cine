import React, { Component } from 'react'
import StarRatings from 'react-star-ratings'

class Rating extends Component {

  state = {
    rating: 0
  }

  changeRating = ( newRating, name ) => {
    this.setState({
      rating: newRating
    })
  }

  render() {
    return (
      <div>
        <StarRatings
          starDimension="15px"
          starSpacing="1px"
          rating={this.state.rating}
          starRatedColor="rgb(255, 215, 0)"
          starHoverColor="rgb(255, 215, 0)"
          changeRating={this.changeRating}
          numberOfStars={5}
          name='rating'
        />
      </div>
    )
  }
}

export default Rating
