import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FacultiesSchema } from 'schemas';
import { Ranking, StatefulView, Spinner } from 'components';

class RankingContainer extends React.PureComponent {
  static propTypes = {
    auth: PropTypes.shape({
      user: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
        }),
      ]),
    }).isRequired,
  };

  renderLoadingRanking = () => (
    <Spinner />
  )

  renderRankingContainer = ({ data: faculties }) => {
    const { auth } = this.props;
    const userId = auth.user ? auth.user._id : '';
    const schoolId = auth.user && auth.user.school ? auth.user.school._id : '';
    return (<Ranking faculties={faculties} userId={userId} schoolId={schoolId} />);
  }


  render() {
    return (
      <FacultiesSchema>
        {StatefulView({
          renderOkState: this.renderRankingContainer,
          renderLoading: this.renderLoadingRanking,
        })}
      </FacultiesSchema>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(RankingContainer);
