import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompact';
import { connect } from 'react-redux';

import { saveEnrollmentStatusToRedux } from 'actions';
import { makeGetEnrollmentStatusSelector } from 'selectors';
import Querry from './Querry';

class EnrollmentSchema extends React.PureComponent {
    static propTypes = {
      courseId: PropTypes.string,
      auth: PropTypes.shape({ user: PropTypes.shape({ role: PropTypes.string }) }).isRequired,
      chapterId: PropTypes.string,
      moduleId: PropTypes.string,
      children: PropTypes.func.isRequired,
      saveEnrollmentStatusToRedux: PropTypes.func.isRequired,
    }

  static defaultProps = {
    courseId: '',
    chapterId: '',
    moduleId: '',
  };

  componentDidMount() {
    const { courseId, chapterId, moduleId } = this.props;
    /*eslint-disable */
        const allExist = !(Boolean(courseId) ^ Boolean(chapterId) ^ Boolean(moduleId)) || courseId && chapterId && moduleId;
        /* eslint-enable */
    const allDoesNotExist = !courseId && !chapterId && !moduleId;

    if (allExist || allDoesNotExist) {
      throw new Error('Provide either courseId, chapterId or moduleId');
    }
  }

  render() {
    const {
      courseId,
      chapterId,
      moduleId,
      children,
      saveEnrollmentStatusToRedux: saveEnrollmentStatusToReduxFunc,
      auth,
    } = this.props;
    const variables = Object.assign(
      {}, courseId && { courseId }, moduleId && { moduleId }, chapterId && { chapterId }
    );

    if (auth.user && auth.user.role === 'admin') {
      const data = { isEnrolled: true };
      return children({ loading: false, data });
    }
    return <Querry normalizer={saveEnrollmentStatusToReduxFunc} variables={variables} endpoint="enrollmentStatus">{children}</Querry>;
  }
}

const makeStateToProps = ({ auth }) => {
  const getEnrollmentStatus = makeGetEnrollmentStatusSelector();
  return (state, ownProps) => ({
    auth,
    enrollmentStatus: getEnrollmentStatus(state, ownProps),
  });
};

const mapDispatchToProps = dispatch => ({
  saveEnrollmentStatusToRedux:
  enrollmentStatus => saveEnrollmentStatusToRedux(enrollmentStatus, dispatch),
});

const withState = connect(makeStateToProps, mapDispatchToProps);

const EnhancedEnrollmentSchema = compose(withState)(EnrollmentSchema);

export default EnhancedEnrollmentSchema;
