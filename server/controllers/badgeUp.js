const { BadgeUp, modifierType } = require("services/BadgeUp");

module.exports.createEvent = async (req, res) => {
  try {
    // TODO: With PostMan cannot see req.body
    // const { subjectId, key, value } = req.body;
    const result = await BadgeUp.createEvent(
      "5b740330ea7a20998be92a86",
      "instagram",
      { [modifierType.increment]: 1 }
    );
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Creating Event Error");
  }
}

module.exports.getAchievements = async (req, res) => {
  try {
    const achievements = await BadgeUp.getAchievements();
    const localAchievements = [];
    /* eslint-disable */
    achievements.data.map(achievement => {
      localAchievements.push(achievement.id);
    });
    /* eslint-enable */
    res.status(200).send(localAchievements);
  } catch (err) {
    console.log(err);
    res.status(500).send("Creating Event Error");
  }
}

module.exports.getUsersAchievements = async (req, res) => {
  try {
    const achievements = await BadgeUp.getAchievements();
    const userAchievements = {};
    const earnedAchievements = await BadgeUp.getEarnedAchievements();
    /* eslint-disable */
    earnedAchievements.data.map(item => {
      userAchievements[item.subject] = userAchievements[item.subject]
        ? userAchievements[item.subject].concat(
            achievements.data.filter(
              achievement => achievement.id === item.achievementId
            )
          )
        : achievements.data.filter(
            achievement => achievement.id === item.achievementId
          );
    });
    /* eslint-enable */
    res.status(200).send(userAchievements);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server fail");
  }
}

module.exports.getAchievementsBySubjectId = async (req, res) => {
  try {
    const { subjectId } = req.query;
    const userAchievements = [];
    const achievements = await BadgeUp.getAchievements();
    const earnedAchievements = await BadgeUp.getEarnedAchievementsById(
      subjectId
    );
    await Promise.all(
      earnedAchievements
        ? earnedAchievements.data.map(async item => {
            if (userAchievements) {
              userAchievements.push(
                await BadgeUp.getAchievementById(item.achievementId)
              );
            } else {
              userAchievements[0] = await BadgeUp.getAchievementById(
                item.achievementId
              );
            }
          })
        : null
    );
    res.status(200).send({ userAchievements, achievements });
  } catch (err) {
    console.log(err);
    res.status(500).send("Get Achievements By UserId ERROR");
  }
}

module.exports.getMetrics = async (req, res) => {
  try {
    const metrics = await BadgeUp.getMetricsById(req.query.subjectId);
    res.status(200).send(metrics.data || null);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server fail");
  }
}

module.exports.getBadgeProgress = async (req, res) => {
  try {
    const progress = await BadgeUp.getProgress();
    res.status(200).send(progress);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server fail");
  }
}
