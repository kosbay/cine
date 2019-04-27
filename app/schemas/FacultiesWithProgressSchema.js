import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompact';
import { connect } from 'react-redux';

import { getUserFacultiesSelector } from 'selectors';
import { saveFacultiesWithProgressToRedux } from 'actions/faculties';
import Querry from './Querry';


class FacultiesWithProgressSchema extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    saveFacultiesWithProgressToRedux: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    faculties: PropTypes.arrayOf(PropTypes.shape({})),
  }

  static defaultProps = {
    faculties: [],
  }

  render() {
    const {
      saveFacultiesWithProgressToRedux: saveFacultiesWithProgressToReduxFunc,
      children,
      userId,
    } = this.props;
    const faculties = this.props.faculties.length > 0 ? this.props.faculties : null;
    return <Querry normalizer={saveFacultiesWithProgressToReduxFunc} endpoint="fetchFacultiesWithProgress" initialData={faculties} variables={{ userId }}>{children}</Querry>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  faculties: getUserFacultiesSelector(state, ownProps),
});

const mapDispatchToProps = dispatch => ({
  saveFacultiesWithProgressToRedux:
  faculties => saveFacultiesWithProgressToRedux(faculties, dispatch),
});

const withState = connect(mapStateToProps, mapDispatchToProps);

const EnhancedFacultiesWithProgressSchema = compose(withState)(FacultiesWithProgressSchema);

export default EnhancedFacultiesWithProgressSchema;
