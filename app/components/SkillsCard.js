import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Tabs, List } from 'antd';
import { withNamespaces } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroller';

const { TabPane } = Tabs;

const Container = styled.div`
  display: block;
  overflow: hidden;
  padding: 20px;
  width: 100%;
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const CircleWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    /* stylelint-disable-next-line */
    width: -webkit-fill-available;
  }
`;

const Circle = styled.div`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 72px;
  margin-bottom: 16px;
`;

const Skill = styled.div`
  width: 100%;
  height: 24px;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  color: #232424;
`;

const SkillDescription = styled.div`
  padding-left: 31px;
  color: #77787a;
  width: 192px;
  font-size: 14px;
  height: 44px;
`;

const InfiniteContainer = styled.div`
  overflow: auto;
  padding: 8px 24px;
  height: 280px;
  margin-left: 40px;
  width: 100%;
`;

class SkillsCard extends React.PureComponent {
  /* eslint-disable */
  tabs = [
    { label: 'skillLabel', description: 'skillDescription', data: 'skills', color: '45deg, #a6c1ee 0%, #fbc2eb 100%' },
    { label: 'logicLabel', description: 'logicDescription', data: 'logics', color: '45deg, #66A6FF 0%, #8FD3F4 100%' }, 
    { label: 'knowledgeLabel', description: 'knowledgeDescription', data: 'knowledges', color: '45deg, #96E6A1 0%, #D4FC79 100%' },
    { label: 'appsLabel', description: 'appsDescription', data: 'apps', color: '45deg, #A6C0FE 0%, #F68084 100%' },
  ];
  /* eslint-enable */

  renderTabs = () => {
  /* eslint-disable */
    const { t } = this.props;
    return this.tabs.map(({
      label, description, color, data,
    }, index) => (
      <TabPane tab={t(`profile.${label}`)} key={index.toString()}>
        <TabContainer>
          <CircleWrap>
            <Skill>{t(`profile.${label}`)}</Skill>
            <Circle
              style={{
                backgroundImage:
                  `linear-gradient(${color})`,
              }}
            >
              { this.props[data].length}
            </Circle>
            <SkillDescription>
              {t(`profile.${description}`)}
            </SkillDescription>
          </CircleWrap>
          <InfiniteContainer>
            <InfiniteScroll
              initialLoad={false}
              pageStart={0}
              loadMore={() => {}}
              hasMore={false}
              useWindow={false}
            >
              {
                this.props[data].length > 0 ? (
                  <List
                    dataSource={this.props[data]}
                    renderItem={item => (
                      <List.Item key={item.id}>
                        <List.Item.Meta title={item.name} />
                      </List.Item>
                    )}
                  />
                ) : <div />
            }
            </InfiniteScroll>
          </InfiniteContainer>
        </TabContainer>
      </TabPane>
    ));
  /* eslint-enable */
  };

  render() {
    return (
      <Container>
        <Tabs defaultActiveKey="0" tabPosition="left" style={{ height: '100%' }}>
          {this.renderTabs()}
        </Tabs>
      </Container>
    );
  }
}

SkillsCard.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withNamespaces()(SkillsCard);
