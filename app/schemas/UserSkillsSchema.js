import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'recompact';

import saveUserSkillsToRedux from '../actions/skills';
import Querry from './Querry';
import makeGetUserSkillsSelector from '../selectors/skills';

class UserSkillsSchema extends React.PureComponent {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
    saveUserSkillsToRedux: PropTypes.func.isRequired,
    userSkills: PropTypes.func.isRequired,
  }

  render() {
    const { userSkills, children, userId } = this.props;
    return <Querry initialData={userSkills} normalizer={this.props.saveUserSkillsToRedux} endpoint="fetchUserSkills" path={userId}>{children}</Querry>;
  }
}

const makeStateToProps = () => {
  const getUserSkills = makeGetUserSkillsSelector();
  return (state, ownProps) => ({
    userSkills: getUserSkills(state, ownProps),
  });
};

const withState = connect(makeStateToProps, { saveUserSkillsToRedux });

const EnhancedUserSkillsSchema = compose(withState)(UserSkillsSchema);

export default EnhancedUserSkillsSchema;
