import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { School } from '../components';

class SchoolContainer extends React.PureComponent {
  static propTypes = {
    auth: PropTypes.shape({
      user: PropTypes.shape({
        _id: PropTypes.string,
        school: PropTypes.shape({
          _id: PropTypes.string,
        }),
      }),
    }).isRequired,
  }

  render() {
    return (
      <School user={this.props.auth.user} />
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(SchoolContainer);
