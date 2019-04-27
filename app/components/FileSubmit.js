import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withNamespaces } from 'react-i18next';
import { message, Button } from 'antd';
import { compose } from 'recompact';
import { connect } from 'react-redux';
import { makeGetUserLessonSelector } from 'selectors';

import ValidationUtils from '../utils/ValidationUtils';
import Images from '../theme/Images';

import FileUploadContainer from '../containers/FileUploadContainer';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 540px;
`;

/* stylelint-disable */
const Text = styled.p`
  text-align: center;
  color: ${(p) => {
    switch (p.status) {
      case 'rejected':
        return 'red;';
      case 'finished':
        return 'green;';
      default:
        return 'black;';
    }
  }};
`;
/* stylelint-enable */

const WupaiWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const TextContainer = styled.div`
  max-width: 640px;

  & > * > code {
    background: #efefef;
    padding: 2px 4px;
  }

  & > pre {
    background: #161a36;
    color: #fff;
    padding: 16px;
  }
`;

const Coin = styled.img`
  width: 32px;
  height: 32px;
  margin-left: 8px;
`;

const AdminButtonPanel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

class FileSubmit extends React.PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
    lesson: PropTypes.shape({
      fileURL: PropTypes.string,
    }).isRequired,
    onFileSubmit: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    text: PropTypes.node.isRequired,
  };

  state = { fileURL: this.props.lesson.fileURL || '' };

  handleFileSubmit = (fileURL) => {
    const { onFileSubmit: onFileSubmitFunc, t } = this.props;
    if (!fileURL) {
      message.error(t('fileSubmit.noFileErrorMessage'));
      return;
    }
    onFileSubmitFunc(fileURL.data);
    this.setState({ fileURL });
  };

  validateUrl = url => Boolean(url) && ValidationUtils.validateUrl(url);

  renderSubmitUrl = () => {
    const {
      text, t, lesson, onFileSubmit,
    } = this.props;
    return (
      <React.Fragment>
        <TextContainer
          className="ql-editor"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
        <FileUploadContainer
          onFileSubmit={onFileSubmit}
          fileUrl={lesson.fileURL}
          fileName={lesson.fileName}
          onDidUpload={this.handleFileSubmit}
          uploadButtonLabel={t('fileSubmit.sendLabel')}
        />
      </React.Fragment>
    );
  };

  renderInReviewMessage = () => {
    const {
      lesson: { fileURL },
      t,
    } = this.props;
    return (
      <div>
        {fileURL.localeCompare('Здесь должно быть ваше задание') !== 0 && (
        <Text>
          {t('fileSubmit.linkSentOne')}
          <a href={`${fileURL}`}>{` ${t('fileSubmit.linkSentTwo')} `}</a>
          {t('fileSubmit.linkSentThree')}
        </Text>
        )}
        <Text>
          Все домашние работы проверяются в течение 48 часов с момента сдачи.
          Если ваша работа еще не проверена, значит преподаватели еще до нее не дошли,
          просим отнестись с пониманием. Благодарим!
        </Text>
      </div>
    );
  };

  renderFinishMessage = () => {
    const {
      lesson: { wupai },
    } = this.props;
    return (
      <React.Fragment>
        <Text status="finished">Задание принято</Text>
        <WupaiWrapper>
          {`+ ${wupai || 1}`}
          <Coin src={Images.wupai.gif} alt="Успех :)" />
        </WupaiWrapper>
      </React.Fragment>
    );
  };

  renderRejectMessage = () => <Text status="rejected">Задание отклонено</Text>;

  renderFeedback = () => {
    const {
      lesson: { feedback, status },
    } = this.props;
    return <Text status={status}>{`Комментарий: ${feedback || ''}`}</Text>;
  };

  renderDefaultState = () => this.renderSubmitUrl();

  renderFinishState = () => (
    <React.Fragment>
      {this.renderSubmitUrl()}
      {this.renderFinishMessage()}
      {this.renderFeedback()}
    </React.Fragment>
  );

  renderRejectState = () => (
    <React.Fragment>
      {this.renderSubmitUrl()}
      {this.renderRejectMessage()}
      {this.renderFeedback()}
    </React.Fragment>
  );

  renderInReviewState = () => (
    <React.Fragment>
      {this.renderSubmitUrl()}
      {this.renderInReviewMessage()}
    </React.Fragment>
  );

  renderState = () => {
    const {
      lesson: { status },
    } = this.props;
    switch (status) {
      case 'finished':
        return this.renderFinishState();
      case 'rejected':
        return this.renderRejectState();
      case 'inReview':
        return this.renderInReviewState();
      default:
        return this.renderDefaultState();
    }
  };

  changeStatus = (status) => {
    const { onFileSubmit: onLinkSubmitFunc } = this.props;
    const { fileURL } = this.state;
    onLinkSubmitFunc(fileURL, status);
  };

  render() {
    return (
      <Container>
        <InnerContainer>
          {this.renderState()}
          {this.props.isAdmin && (
            <AdminButtonPanel>
              <Button
                onClick={() => {
                  this.changeStatus('inReview');
                }}
              >
                In review
              </Button>
              <Button
                onClick={() => {
                  this.changeStatus('rejected');
                }}
              >
                Rejected
              </Button>
              <Button
                onClick={() => {
                  this.changeStatus('finished');
                }}
              >
                Finished
              </Button>
            </AdminButtonPanel>
          )}
        </InnerContainer>
      </Container>
    );
  }
}
const makeStateToProps = () => {
  const getLesson = makeGetUserLessonSelector();
  return (state, ownProps) => ({
    lesson: getLesson(state, ownProps),
  });
};

const withState = connect(
  makeStateToProps,
  null
);

const EnchantedFileSubmit = compose(
  withState,
  withNamespaces()
)(FileSubmit);

export default EnchantedFileSubmit;
