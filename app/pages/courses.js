import React, { Component } from 'react';
import { compose } from 'recompact';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';

import { CoursesSchema } from 'schemas';
import { StatefulView } from 'components';
import page from 'hocs/page';
import { Helmet } from 'react-helmet';
import { CoursesContainer } from 'containers';

class Courses extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
  }

  renderFaculties = ({ data: courses }) => (
    <CoursesContainer courses={courses} />
  )

  renderLoadingCourses = () => (
    <CoursesContainer loading />
  )

  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>
            {`
        ${t('pages.courses')} | ${t('pages.website')}
        `}
          </title>
        </Helmet>
        <CoursesSchema>
          {StatefulView({
            renderOkState: this.renderFaculties,
            renderLoading: this.renderLoadingCourses,
          })}
        </CoursesSchema>
      </React.Fragment>

    );
  }
}

const EnhancedCourses = compose(
  page,
  withNamespaces(),
)(Courses);

export default EnhancedCourses;
