import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Tooltip } from 'antd';
import styled from 'styled-components';

import { UserBadgesSchema } from 'schemas';
import { StatefulView } from 'components';
import { withNamespaces } from 'react-i18next';

const Spinner = styled(Spin)`
  height: 40px;
  margin-top: 80px;
  width: 100%;
  justify-content: center;
  justify-items: center;

  i {
    background-color: #7a64ff;
  }
`;

// const Button = styled.button`
//   border: 0 solid transparent;
//   background: transparent;
//   cursor: pointer;
//   display: block;
//   margin-right: 0;
//   margin-left: auto;
//   outline: none;
// `;

const BadgesWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const LabelWrapper = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  font-size: 24px;
  color: #232424;
`;

const Badges = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Badge = styled.div`
  width: 90px;
  height: 90px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BadgeIcon = styled.img`
  width: 75px;
  height: 75px;
  border: 1px solid #cecdcd;
  border-radius: 100%;
`;

class UserBadges extends React.PureComponent {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
  };

  state = {
    displayAll: true,
    width: 0,
  }

  wrapperRef = null;

  refCallback = (element) => {
    if (element) {
      const { width: stateWidth } = this.state;
      const bound = element.getBoundingClientRect();
      const width = (bound.left - bound.right) * -1;
      if (width !== stateWidth) {
        this.setState({ width });
      }
    }
  }

  renderBadge = ({
    id, meta, name, description, achieved,
  }, index) => (
    <Badge key={id + index}>
      <Tooltip placement="right" title={`${name}: ${description}`}>
        <BadgeIcon src={meta.icon} alt={description} style={{ filter: achieved ? 'grayscale(0)' : 'grayscale(100%)' }} />
      </Tooltip>
    </Badge>
  )


  renderBadges = (badges) => {
    const { displayAll, width } = this.state;
    const achievements = badges.achievements.data
      .filter(badge => !badges.userAchievements
        .find(userBadge => userBadge.id === badge.id));

    const rightBadges = [
      ...badges.userAchievements.map(badge => ({ ...badge, achieved: true })),
      ...achievements.map(badge => ({ ...badge, achieved: false })),
    ];
    return rightBadges.map((badge, index) => {
      if (displayAll) return this.renderBadge(badge, index);
      if ((index + 1) * 110 < width) return this.renderBadge(badge, index);
      return null;
    });
  }

  handleBadgeViewChanger = () => this.setState(({ displayAll }) => ({ displayAll: !displayAll }));

  renderUserBadges = ({ data: badges }) => {
    // const { displayAll, width } = this.state;
    if (badges && badges.length < 1) return null;
    const { t } = this.props;
    return (
      <BadgesWrapper
        ref={this.refCallback}
      >
        <LabelWrapper>
          <Label>{t('profile.achievementsLabel')}</Label>
        </LabelWrapper>
        <Badges>
          {this.renderBadges(badges)}
        </Badges>
        {/* { (badges.achievements.data.length + badges.userAchievements.length) * 110 > width
        && (
        <Button onClick={this.handleBadgeViewChanger}>
          {displayAll ? t('profile.hideAchievements') : t('profile.showAchievements')}
        </Button>
        )} */}
      </BadgesWrapper>
    );
  }

  renderBadgesLoading = () => <BadgesWrapper><Spinner /></BadgesWrapper>;

  render() {
    const { userId } = this.props;
    return (
      <UserBadgesSchema userId={userId}>
        {StatefulView({
          renderOkState: this.renderUserBadges,
          renderLoading: this.renderBadgesLoading,
        })}
      </UserBadgesSchema>
    );
  }
}

export default withNamespaces()(UserBadges);
