import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withNamespaces } from 'react-i18next';
import { compose } from 'recompact';
import { connect } from 'react-redux';
import { logoutUser } from 'actions';
import Router from 'next/router';
import UserBadges from '../UserBadges';
import ProfileHeader from './ProfileHeader';
import UserFaculties from './UserFaculties';
import UserSubscription from './UserSubscription';
// import UserSkills from './UserSkills';
import SkillTags from './SkillTags';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  font-size: 16px;
  max-width: 1024px;
  margin: auto;
  margin-bottom: 100px;

  @media screen and (min-width: 1024px) {
    width: 100%;
    padding: 20px;
  }
`;


// const transformToSkill = (user) => {
//   const skills = [];
//   const apps = [];
//   const logics = [];
//   const knowledges = [];

//   for (let i = 0; i < user.skills.length; i += 1) {
//     switch (user.skills[i].type) {
//       case 'Skill':
//         skills.push(user.skills[i]);
//         break;
//       case 'Logic':
//         logics.push(user.skills[i]);
//         break;
//       case 'Knowledge':
//         knowledges.push(user.skills[i]);
//         break;
//       case 'Application':
//         apps.push(user.skills[i]);
//         break;
//       default:
//     }
//   }

//   return {
//     skills,
//     apps,
//     logics,
//     knowledges,
//   };
// };

class Profile extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
    auth: PropTypes.shape({}).isRequired,
    logout: PropTypes.func.isRequired,
    currentUser: PropTypes.shape({
      skills: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})])),
    }).isRequired,
    userId: PropTypes.string.isRequired,
  };

  // state = {
  //   skills: [],
  //   apps: [],
  //   logics: [],
  //   knowledges: [],
  // };

  componentDidMount() {
    // const { currentUser, isCurrentUser } = this.props;
    // if (!isCurrentUser) return;
    // const {
    //   skills, apps, logics, knowledges,
    // } = transformToSkill(currentUser);
    // this.setState({
    //   skills,
    //   apps,
    //   logics,
    //   knowledges,
    // });
  }

  handleLogoutButtonClick = () => {
    const { logout } = this.props;
    logout();
    Router.push('/login');
  };

  renderUserFaculties = ({ data, loading, error }) => {
    const { currentUser, userId } = this.props;

    return (
      <UserFaculties
        data={data}
        loading={loading}
        error={error}
        currentUser={currentUser}
        userId={userId}
      />
    );
  };

  renderSkillTags = ({ data, loading, error }) => {
    const { currentUser } = this.props;
    return <SkillTags data={data} loading={loading} error={error} currentUser={currentUser} />;
  };

  render() {
    const {
      userId,
      t,
      currentUser: { name },
    } = this.props;
    // const {
    //   skills, apps, logics, knowledges,
    // } = this.state;
    return (
      <Container>
        <Helmet>
          <title>
            {`
          ${t('pages.profile')} ${name} | ${t('pages.website')}
          `}
          </title>
        </Helmet>
        <ProfileHeader userId={userId} t={t} onLogoutButtonClick={this.handleLogoutButtonClick} />
        <Link href={{ pathname: '/userCertificates' }}>
          <a style={{ marginTop: 20 }}>Certificates</a>
        </Link>
        <UserBadges userId={userId} />
        {/* {isCurrentUser && (
          <UserSkills skills={skills} apps={apps} logics={logics} knowledges={knowledges} />
        )} */}
        <UserSubscription t={t} />
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch => ({
  logout: () => logoutUser(dispatch),
});

const withState = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withState,
  withNamespaces()
)(Profile);
