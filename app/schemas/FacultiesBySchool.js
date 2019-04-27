import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompact';
import { connect } from 'react-redux';
import { saveFacultiesToRedux } from '../actions/faculties';
import { makeGetFacultySelector } from '../selectors';
import Querry from './Querry';

class FacultiesBySchool extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    schoolId: PropTypes.string.isRequired,
    faculty: PropTypes.shape({}),
    saveFacultiesToRedux: PropTypes.func.isRequired,
  }

  static defaultProps = {
    faculty: null,
  };

  render() {
    const { schoolId, faculty, saveFacultiesToRedux: saveFacultiesToReduxFunc } = this.props;
    const variables = { schoolId };
    return (
      <Querry
        normalizer={saveFacultiesToReduxFunc}
        initialData={faculty}
        endpoint="facultiesBySchool"
        variables={variables}
      >
        {this.props.children}
      </Querry>
    );
  }
}

const makeStateToProps = () => {
  const getFaculty = makeGetFacultySelector();
  return (state, ownProps) => ({
    faculty: getFaculty(state, ownProps),
  });
};

const mapDispatchToProps = dispatch => ({
  saveFacultiesToRedux: faculties => saveFacultiesToRedux(faculties, dispatch),
});

const withState = connect(makeStateToProps, mapDispatchToProps);
const EnhancedFacultiesBySchool = compose(withState)(FacultiesBySchool);

export default EnhancedFacultiesBySchool;
