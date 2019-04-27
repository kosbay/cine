import authReducer from './authReducer';
import chaptersReducer from './chaptersReducer';
import coursesReducer from './coursesReducer';
import enrollmentReducer from './enrollmentReducer';
import eventReducer from './eventReducer';
import facultiesReducer from './facultiesReducer';
import lessonsReducer from './lessonsReducer';
import modulesReducer from './modulesReducer';
import notificationReducer from './notificationReducer';
import rankingReducer from './rankingReducer';
import teacherFacultiesReducer from './teacherFacultiesReducer';
import userCertificatesReducer from './certificatesReducer';
import userChaptersReducer from './userChaptersReducer';
import userCoursesReducer from './userCoursesReducer';
import userFacultiesReducer from './userFacultiesReducer';
import userLessonsReducer from './userLessonsReducer';
import userModulesReducer from './userModulesReducer';
import userSkillsReducer from './userSkillsReducer';
import tariffsReducer from './tariffsReducer';
import userCreditCardReducer from './userCreditCardReducer';
import userSubscriptionsReducer from './userSubscriptionsReducer';

export default {
  auth: authReducer,
  chapters: chaptersReducer,
  courses: coursesReducer,
  enrollment: enrollmentReducer,
  event: eventReducer,
  faculties: facultiesReducer,
  lessons: lessonsReducer,
  modules: modulesReducer,
  notifications: notificationReducer,
  ranking: rankingReducer,
  teacherFaculties: teacherFacultiesReducer,
  userCertificates: userCertificatesReducer,
  userChapters: userChaptersReducer,
  userCourses: userCoursesReducer,
  userFaculties: userFacultiesReducer,
  userLessons: userLessonsReducer,
  userModules: userModulesReducer,
  userSkills: userSkillsReducer,
  tariffs: tariffsReducer,
  userCreditCard: userCreditCardReducer,
  userSubscriptions: userSubscriptionsReducer,
};
