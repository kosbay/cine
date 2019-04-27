import React, { PureComponent } from "react";
import { Helmet } from "react-helmet";

const withHelmet = options => ComposedComponent =>
  class WithHelmet extends PureComponent {
    renderTags = ({ tag: HtmlTag, content }) => (
      <HtmlTag key={HtmlTag}>{content}</HtmlTag>
    );

    render() {
      return (
        <React.Fragment>
          <Helmet>{options.map(this.renderTags)}</Helmet>
          <ComposedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };

export default withHelmet;
