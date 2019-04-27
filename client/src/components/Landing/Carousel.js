import React, {  Fragment, Component } from 'react';
import Slider from "react-slick";

import { fileserver } from '../../constants';

class Carousel extends Component {

  render() {

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3
    };

    return(
      <Fragment>
          <div>
            <Slider {...settings}>
              {
                this.props.univer.univers ?
                  this.props.univer.univers.map(univer =>
                    <div key={univer._id}>
                      <div className='card-l'>
                        <div className="card-img">
                          <img src={`http://${fileserver}:9999/${univer.wallpapper}`}/>
                        </div>
                        <div className="card-name">
                          <span>{univer.addreviation}</span>
                          <div className="flex js-c">
                            <div className="text-wrap">
                              <span className="g-mid-text-2">{univer.location.region}</span>
                            </div>
                            {/*<Rating />*/}
                          </div>
                        </div>
                        {/*<div className="card-stats">
                          <div className="card-stats-b">
                            <div className="stats-values">
                              <div className="stat-value">150</div>
                              <div className="stat-value">Заявок</div>
                            </div>
                            <div className="stats-values">
                              <div className="stat-value">150</div>
                              <div className="stat-value">Грантов</div>
                            </div>
                            <div className="stats-values">
                              <div className="stat-value">150</div>
                              <div className="stat-value">Студентов</div>
                            </div>
                          </div>
                        </div>*/}
                      </div>
                    </div>
                  ) :
                null
              }
              </Slider>
          </div>

      </Fragment>
    )
  }
}

export default Carousel;
