import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompact';
import { connect } from 'react-redux';

import { saveChapterToRedux } from '../actions/chapters';
import { makeGetChapterSelector } from '../selectors';
import Querry from './Querry';

class ChapterSchema extends React.PureComponent {
  static propTypes = {
    chapterId: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
    chapter: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
    saveChapterToRedux: PropTypes.func.isRequired,
  };

  static defaultProps = {
    chapter: null,
  };

  render() {
    const {
      chapterId,
      chapter,
      saveChapterToRedux: saveChapterToReduxFunc,
      children,
    } = this.props;
    return (
      <Querry
        normalizer={saveChapterToReduxFunc}
        initialData={chapter}
        endpoint="fetchChapter"
        path={chapterId}
      >
        {children}
      </Querry>
    );
  }
}

const makeStateToProps = () => {
  const getChapter = makeGetChapterSelector();
  return (state, ownProps) => ({
    chapter: getChapter(state, ownProps),
  });
};

const mapDispatchToProps = dispatch => ({
  saveChapterToRedux: chapter => saveChapterToRedux(chapter, dispatch),
});

const withState = connect(
  makeStateToProps,
  mapDispatchToProps
);
const EnhancedChapterSchema = compose(withState)(ChapterSchema);

export default EnhancedChapterSchema;
