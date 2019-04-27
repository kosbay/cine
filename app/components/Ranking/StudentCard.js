import React from 'react';
import PropTypes from 'prop-types';

import { StatefulView, Spinner } from 'components';
import { StudentRankingSchema } from '../../schemas';
import RankingCard from './RankingCard';

class StudentCard extends React.PureComponent {
  static propTypes = {
    userId: PropTypes.string.isRequired,
  };

  renderLoadingStudentCard = () => (
    <Spinner />
  )

  renderStudentCard = ({ data }) => {
    const {
      position, name, wupai, avatar,
    } = data;

    return (
      <RankingCard
        name={name}
        wupai={wupai}
        avatar={avatar}
        position={position}
      />
    );
  };

  render() {
    const { userId } = this.props;
    return (
      <StudentRankingSchema userId={userId}>
        {StatefulView({
          renderOkState: this.renderStudentCard,
          renderLoading: this.renderLoadingStudentCard,
        })}

      </StudentRankingSchema>
    );
  }
}

export default StudentCard;
