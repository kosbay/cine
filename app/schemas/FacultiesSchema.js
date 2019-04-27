import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompact';
import { connect } from 'react-redux';

import { getFacultiesSelector } from 'selectors/faculties';
import { saveFacultiesToRedux } from 'actions/faculties';
import Querry from './Querry';

class FacultiesSchema extends React.PureComponent {
    static propTypes = {
      saveFacultiesToRedux: PropTypes.func.isRequired,
      faculties: PropTypes.arrayOf(PropTypes.shape({})),
      children: PropTypes.func.isRequired,
    }

    static defaultProps = {
      faculties: [],
    }

    render() {
      const { faculties, children, saveFacultiesToRedux: saveFacultiesToReduxFunc } = this.props;
      const initialData = faculties.length > 0 ? faculties : null;
      return (
        <Querry
          normalizer={saveFacultiesToReduxFunc}
          initialData={initialData}
          endpoint="fetchFaculties"
          variables={{ populate: false }}
        >
          {children}
        </Querry>
      );
    }
}

const makeStateToProps = state => ({ faculties: getFacultiesSelector(state) });
const mapDispatchToProps = dispatch => ({
  saveFacultiesToRedux: faculties => saveFacultiesToRedux(faculties, dispatch),
});

const withState = connect(makeStateToProps, mapDispatchToProps);
const EnhancedFacultiesSchema = compose(withState)(FacultiesSchema);

export default EnhancedFacultiesSchema;
