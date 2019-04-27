import React, { Component } from 'react';
import { compose } from 'recompact';
import { StatefulView } from 'components';
import page from 'hocs/page';
import { FacultiesSchema } from 'schemas';
import { Helmet } from 'react-helmet';
import { withNamespaces } from 'react-i18next';
import { FacultiesContainer } from 'containers';
import PropTypes from 'prop-types';

class Faculties extends Component {
  static propTypes ={
    t: PropTypes.func.isRequired,
  }

  renderLoadingFaculties = () => (
    <FacultiesContainer loading />
  )

  renderFaculties = ({ data }) => (<FacultiesContainer faculties={data} />)

  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>
            {`
          ${t('pages.faculties')} | ${t('pages.website')}
          `}
          </title>
        </Helmet>
        <FacultiesSchema>
          {StatefulView({
            renderOkState: this.renderFaculties,
            renderLoading: this.renderLoadingFaculties,
          })}
        </FacultiesSchema>
      </React.Fragment>
    );
  }
}


const EnhancedFaculties = compose(
  page,
  withNamespaces()
)(Faculties);

export default EnhancedFaculties;
