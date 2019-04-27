import { hoistStatics } from 'recompact';

import { Layout, ScrollToTop } from '../components';

const withLayout = hoistStatics((ComposedComponent) => {
  const WithLayout = props => (
    <Layout {...props}>
      <ScrollToTop />
      <ComposedComponent {...props} />
    </Layout>
  );

  return WithLayout;
});

export default withLayout;
