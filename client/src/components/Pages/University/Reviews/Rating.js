import React, { Component } from 'react'
import StarRatings from 'react-star-ratings'

const Rating = props =>

  <StarRatings
    starDimension="17px"
    starSpacing="1px"
    rating={props.rating}
    starRatedColor="rgb(255, 215, 0)"
    starHoverColor="rgb(255, 215, 0)"
    changeRating={props.changeRating}
    numberOfStars={5}
    name='rating'
  />

export default Rating
