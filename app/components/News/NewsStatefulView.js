import { StatefulView } from 'components';
import NewsList from '.';

const NewsStatefulView = (...args) => StatefulView({
  renderOkState: NewsList,
})(...args);

export default NewsStatefulView;
