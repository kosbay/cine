import React, { Component } from 'react';
import { compose } from 'recompact';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';

import { UserCoursesSchema } from 'schemas';
import { StatefulView } from 'components';
import page from 'hocs/page';
import { Helmet } from 'react-helmet';
import { CoursesContainer, InstaFeedContainer } from 'containers';

class MyProgram extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    router: PropTypes.shape({}).isRequired,
  };

  renderFaculties = ({ data: courses }) => {
    const { router } = this.props;
    return <CoursesContainer courses={courses} route={router.route} />;
  }

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
        <UserCoursesSchema>
          {StatefulView({
            renderOkState: this.renderFaculties,
          })}
        </UserCoursesSchema>
        <InstaFeedContainer />
      </React.Fragment>
    );
  }
}

const EnhancedMyProgram = compose(
  page,
  withNamespaces()
)(MyProgram);

export default EnhancedMyProgram;
