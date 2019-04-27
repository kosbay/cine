import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompact';
import { connect } from 'react-redux';

import { saveUserChapterToRedux } from 'actions/chapters';
import { makeGetUserChapterSelector } from 'selectors';
import Querry from './Querry';

class ChapterWithProgressSchema extends React.PureComponent {
    static propTypes = {
      chapterId: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      children: PropTypes.func.isRequired,
      chapter: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
      saveUserChapterToRedux: PropTypes.func.isRequired,
    }

    static defaultProps = {
      chapter: null,
    };

    render() {
      const {
        chapterId, chapter, children, saveUserChapterToRedux: saveUserChapterToReduxFunc, userId,
      } = this.props;
      const variables = { userId, chapterId };

      return (
        <Querry
          normalizer={saveUserChapterToReduxFunc}
          initialData={chapter}
          endpoint="getChapterWithProgress"
          variables={variables}
        >
          {children}
        </Querry>
      );
    }
}

const makeStateToProps = () => {
  const getChapter = makeGetUserChapterSelector();
  return (state, ownProps) => ({
    chapter: getChapter(state, ownProps),
  });
};

const mapDispatchToProps = dispatch => ({
  saveUserChapterToRedux: chapter => saveUserChapterToRedux(chapter, dispatch),
});

const withState = connect(makeStateToProps, mapDispatchToProps);
const EnhancedChapterWithProgressSchema = compose(withState)(ChapterWithProgressSchema);

export default EnhancedChapterWithProgressSchema;
