import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompact';
import { Helmet } from 'react-helmet';
import { withNamespaces } from 'react-i18next';

import { FacultySchema } from 'schemas';
import page from 'hocs/page';
import { enrollUserInFaculty } from 'actions/faculties';
import { FacultyHeader, StatefulView, Spinner } from 'components';
import ComparisonUtils from 'utils/ComparisonUtils';


class Faculty extends PureComponent {
  constructor(props) {
    super(props);
    const { auth, router } = this.props;
    /* eslint-disable */
    const faculties = auth.user && auth.user.faculties || [];
    /* eslint-enable */
    const { facultyId } = router.query;

    if (faculties) {
      if (faculties.filter(faculty => faculty === facultyId).length > 0) {
        this.state.isEnrolled = true;
      }
    }
  }

  state = { loading: false, requestSent: false, isEnrolled: false };

  componentWillReceiveProps(nextProps) {
    if (ComparisonUtils.difference(nextProps, this.props) === 0) {
      return;
    }
    const faculties = nextProps.auth.user.faculties || [];
    const { facultyId } = nextProps.router.query;

    if (faculties) {
      if (faculties.filter(f => f === facultyId).length > 0) {
        this.setState({ isEnrolled: true });
      }
    }
  }

  handleEnrollUserButtonClick = async () => {
    const {
      router: {
        query: { facultyId },
      },
      auth, enrollUserInFaculty: enrollUserInFacultyFunc,
    } = this.props;

    this.setState({ loading: true });
    await enrollUserInFacultyFunc(facultyId, auth.user._id);
    this.setState({ loading: false, requestSent: true });
  };

  renderLoadingFaculty = () => (
    <Spinner />
  )

  renderFaculty = ({ data: faculty }) => {
    const { loading, isEnrolled, requestSent } = this.state;
    const { t } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>
            {`
          ${t('pages.faculty')} ${faculty.name || 'No name'} | ${t('pages.website')}
          `}
          </title>
        </Helmet>
        <FacultyHeader
          faculty={faculty}
          handleEnrollUserButtonClick={this.handleEnrollUserButtonClick}
          requestSent={requestSent}
          buttonLoading={loading}
          isEnrolled={isEnrolled}
        />
      </React.Fragment>
    );
  }


  render() {
    const { router: { query: { facultyId } } } = this.props;
    return (
      <FacultySchema facultyId={facultyId}>
        {StatefulView({
          renderOkState: this.renderFaculty,
          renderLoading: this.renderLoadingFaculty,
        })}
      </FacultySchema>
    );
  }
}

Faculty.propTypes = {
  t: PropTypes.func.isRequired,
  router: PropTypes.shape({
    query: PropTypes.shape({ facultyId: PropTypes.string }),
  }).isRequired,
  auth: PropTypes.shape({
    user: PropTypes.shape({ faculties: PropTypes.arrayOf(PropTypes.string) }),
  }).isRequired,
  enrollUserInFaculty: PropTypes.func,
};

Faculty.defaultProps = {
  enrollUserInFaculty: {},
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  enrollUserInFaculty: faculty => enrollUserInFaculty(faculty, dispatch),
});

const withState = connect(
  mapStateToProps,
  mapDispatchToProps
);

const EnhancedFaculty = compose(
  page,
  withNamespaces(),
  withState,
)(Faculty);


export default EnhancedFaculty;
