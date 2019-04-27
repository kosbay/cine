import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Collapse, Pagination, Skeleton, Tooltip,
} from 'antd';

import { ChapterWithProgressSchema } from '../../schemas';
import { StatefulView, Spinner } from '..';

import Images from '../../theme/Images';

const { Panel } = Collapse;

const ovalEmpty = Images.ovalEmpty;
const ovalFull = Images.ovalFull;

const StyledPanel = styled(Panel)`
  background-color: #f9f9f9;

  & > .ant-collapse-content > .ant-collapse-content-box {
    padding: 0 !important;
  }
`;

const StyledPagination = styled(Pagination)`
  opacity: 1;
  width: 80%;
  display: flex;
  margin: 10px auto 10px auto;
  justify-content: center;
  align-items: center;
`;

const CourseContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  background-color: white;
`;

const CourseTitle = styled.div`
  display: flex;
  align-items: center;
  padding-left: 16px;
  font-size: 16px;
  color: black;
  font-weight: 400;
  height: 48px;
  width: 100%;
  background-color: #606dc9;
`;

const StudentInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff !important;
  padding: 16px 16px 0;
  font-size: 14px;
  font-weight: bold;
  color: black;
  border-bottom: 1px solid #00000040;
`;

const ModulesContainer = styled.div`
  display: flex;
  margin-top: 32px;
  flex-wrap: wrap;
`;

const Module = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  margin-right: 60px;
  margin-bottom: 20px;
`;

const CirclesContainer = styled.div`
  display: flex;
`;

const LessonIcon = styled.img`
  height: 20px;
  width: auto;
  margin-right: 8px;
`;

const StudentInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StudentProgress = styled.div`
  margin-right: 16px;
`;

const ChapterInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const courseProgress = (progress) => {
  if (progress.wupai === 0) {
    return 0;
  }
  const userProgress = parseInt((progress.userWupai / progress.wupai) * 100, 10);
  return userProgress > 100 ? 100 : userProgress.toFixed(2);
};

const skeletonParagraph = {
  rows: 10,
  width: ['90%', '90%', '90%', '90%', '90%', '90%', '90%', '90%', '90%', '90%'],
};

const PanelHeader = ({ student }) => (
  <StudentInfo>
    <span>{student.user.name}</span>
    <StudentProgress>{`${courseProgress(student.progress)}%`}</StudentProgress>
  </StudentInfo>
);

class StudentsProgress extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.shape({}),
    data: PropTypes.shape({}),
    refetch: PropTypes.func.isRequired,
    courseName: PropTypes.string.isRequired,
  };

  static defaultProps = {
    error: '',
    data: '',
  };

  defaultActiveKey = ['1'];

  handlePageChange = (page, size) => {
    const variables = { sortByWupai: -1, page, limit: size };
    this.props.refetch(variables);
  };

  handlePageSizeChange = (current, size) => {
    const variables = { sortByWupai: -1, page: current, limit: size };
    this.props.refetch(variables);
  };

  renderModule = oneModule => (
    <Module key={oneModule._id}>
      {oneModule.name}
      <CirclesContainer>{oneModule.userLessons.map(this.renderLesson)}</CirclesContainer>
    </Module>
  );

  renderUserChapter = ({ data: chapter }) => (
    <StudentInfoContainer key={chapter._id}>
      <ChapterInfo>
        <div>{chapter.name}</div>
        <div>{`${((100 * chapter.userWupai) / chapter.wupai) || 0}%`}</div>
      </ChapterInfo>
      <ModulesContainer>{chapter.userModules.map(this.renderModule)}</ModulesContainer>
    </StudentInfoContainer>
  );

  renderStudentProgress = student => (
    <StyledPanel header={<PanelHeader student={student} />} key={student.user._id}>
      {student.progress.chapters.map(chapterId => (
        <ChapterWithProgressSchema key={chapterId} chapterId={chapterId} userId={student.user._id}>
          {StatefulView({
            renderOkState: this.renderUserChapter,
            renderLoading: Spinner,
          })}
        </ChapterWithProgressSchema>
      ))}
    </StyledPanel>
  );

  renderLesson = lesson => (
    <Tooltip key={lesson._id} title={lesson.name}>
      <LessonIcon src={lesson.finished ? ovalFull : ovalEmpty} />
    </Tooltip>
  );

  render() {
    const { data, loading, courseName } = this.props;
    const {
      userCoursesWithProgress: students, page, limit, total: totalDocs,
    } = data || {
      total: 0,
      userCoursesWithProgress: [],
      page: 1,
      pages: 1,
      limit: 10,
    };

    const total = Number(totalDocs);
    const current = Number(page);
    const pageSize = Number(limit);

    return (
      <CourseContainer>
        <CourseTitle>{courseName}</CourseTitle>
        <Skeleton active loading={loading} paragraph={skeletonParagraph} title={false}>
          <Collapse accordion bordered={false} defaultActiveKey={this.defaultActiveKey}>
            {students.map(this.renderStudentProgress)}
          </Collapse>
        </Skeleton>
        {students.length ? (
          <StyledPagination
            showSizeChanger
            key={total}
            pageSize={pageSize}
            onChange={this.handlePageChange}
            onShowSizeChange={this.handlePageSizeChange}
            current={current}
            total={total}
          />
        ) : (
          <div />
        )}
      </CourseContainer>
    );
  }
}

PanelHeader.propTypes = {
  student: PropTypes.shape({}).isRequired,
};

export default StudentsProgress;
