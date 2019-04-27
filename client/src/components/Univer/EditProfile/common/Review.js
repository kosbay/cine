import React from 'react';

import StarRating from './Rating2';

const Review = props =>

  <div className="review">
    <div className="avatar-2">
      <div style={{ backgroundColor: '#000000', height: '36px', width: '36px', borderRadius: '50%' }}></div>
    </div>
    <div className="rev-body">
      <div className="flex">
        <div className="padding-l-20">
          <span className="text-16">Алибеков Данияр</span>
        </div>
        <div className="padding-l-10">
          <StarRating {...props} />
        </div>
      </div>
      <p className="padding-l-20 padding-t-10 text-14">
        Я учусь на факультете востоковедения по специальности Тюркологии.
        Поступил я в этот университет,
        потому что здесь по этому предмету самое большое количество материала и постоянный доступ к библиотеке.
        Это помогает мне в учебе и достижении моих целей! Я очень благодарен нашему талантливому педагогическому составу
      </p>
      <div className="padding-l-20 padding-t-10 m-ta-text">23.06.2018</div>
    </div>
  </div>

export default Review;
