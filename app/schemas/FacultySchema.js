import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompact';
import { connect } from 'react-redux';

import { saveFacultyToRedux } from 'actions/faculties';
import { getFacultyFromState } from '../store/models';
import Querry from './Querry';

class FacultiesSchema extends React.PureComponent {
    static propTypes = {
      saveFacultyToRedux: PropTypes.func.isRequired,
      faculty: PropTypes.shape({}).isRequired,
      children: PropTypes.func.isRequired,
      facultyId: PropTypes.string.isRequired,
    }

    render() {
      const {
        facultyId, faculty, children, saveFacultyToRedux: saveFacultyToReduxFunc,
      } = this.props;
      const initialData = faculty || {};
      return (
        <Querry
          normalizer={saveFacultyToReduxFunc}
          initialData={initialData}
          endpoint="fetchFaculty"
          path={facultyId}
          variables={{ populateCourses: 1 }}
        >
          {children}
        </Querry>
      );
    }
}

const makeStateToProps = (state, ownProps) => ({
  faculty: getFacultyFromState(ownProps.facultyId, state),
});
const mapDispatchToProps = dispatch => ({
  saveFacultyToRedux: faculties => saveFacultyToRedux(faculties, dispatch),
});

const withState = connect(makeStateToProps, mapDispatchToProps);
const EnhancedFacultiesSchema = compose(withState)(FacultiesSchema);

export default EnhancedFacultiesSchema;
