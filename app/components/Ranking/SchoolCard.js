import React from 'react';
import PropTypes from 'prop-types';

import { StatefulView, Spinner } from 'components';
import { SchoolRankingSchema } from '../../schemas';
import RankingCard from './RankingCard';

class SchoolCard extends React.PureComponent {
  static propTypes = {
    schoolId: PropTypes.string.isRequired,
  };

  renderLoadingSchoolCard = () => (
    <Spinner />
  )

  renderSchoolCard = ({ data }) => {
    const { position, name, wupai } = data;

    return (
      <RankingCard
        name={name}
        wupai={wupai}
        imageUrl=""
        position={position}
      />
    );
  };

  render() {
    const { schoolId } = this.props;
    return (
      <SchoolRankingSchema schoolId={schoolId}>
        {StatefulView({
          renderOkState: this.renderSchoolCard,
          renderLoading: this.renderLoadingSchoolCard,
        })}

      </SchoolRankingSchema>
    );
  }
}

export default SchoolCard;
