import React from 'react';
import PropTypes from 'prop-types';

class HiddenSecureFormContainer extends React.Component {
  static propTypes = {
    paReq: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    md: PropTypes.string.isRequired,
    callbackUrl: PropTypes.string.isRequired,
  };

  formRef = null;

  render() {
    const {
      paReq, url, md, callbackUrl,
    } = this.props;
    return (
      <form
        ref={(node) => {
          node.submit();
        }}
        name="downloadForm"
        action={url}
        method="POST"
      >
        <input
          type="hidden"
          name="PaReq"
          value={paReq}
        />
        <input type="hidden" name="MD" value={md} />
        <input
          type="hidden"
          name="TermUrl"
          value={callbackUrl}
        />
      </form>
    );
  }
}

export default HiddenSecureFormContainer;
