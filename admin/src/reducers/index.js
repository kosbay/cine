import { combineReducers } from "redux";
import authReducer from "./authReducer";
import certificatesReducer from "./certificatesReducer";
import certificateReducer from "./certificateReducer";
import chapterReducer from "./chapterReducer";
import chaptersReducer from "./chaptersReducer";
import compilersReducer from "./compilersReducer";
import contestReducer from "./contestReducer";
import courseReducer from "./courseReducer";
import coursesReducer from "./coursesReducer";
import eventReducer from "./eventReducer";
import eventsReducer from "./eventsReducer";
import facultiesReducer from "./facultiesReducer";
import facultyReducer from "./facultyReducer";
import messagesReducer from "./messagesReducer";
import moduleReducer from "./moduleReducer";
import modulesReducer from "./modulesReducer";
import schoolReducer from "./schoolReducer";
import schoolsListReducer from "./schoolsListReducer";
import schoolsReducer from "./schoolsReducer";
import skillReducer from "./skillReducer";
import skillsReducer from "./skillsReducer";
import submissionReducer from "./submissionReducer";
import submissionsReducer from "./submissionsReducer";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import notificationMessagesReducer from "./notificationMessages";
import notificationsReducer from "./notifications";
import tariffReducer from "./tariffReducer";
import tariffsReducer from "./tariffsReducer";

export default combineReducers({
  auth: authReducer,
  certificates: certificatesReducer,
  certificate: certificateReducer,
  chapter: chapterReducer,
  chapters: chaptersReducer,
  compilers: compilersReducer,
  contests: contestReducer,
  course: courseReducer,
  courses: coursesReducer,
  event: eventReducer,
  events: eventsReducer,
  faculties: facultiesReducer,
  faculty: facultyReducer,
  messages: messagesReducer,
  module: moduleReducer,
  modules: modulesReducer,
  school: schoolReducer,
  schools: schoolsReducer,
  schoolsList: schoolsListReducer,
  skill: skillReducer,
  skills: skillsReducer,
  submission: submissionReducer,
  submissions: submissionsReducer,
  user: userReducer,
  users: usersReducer,
  notificationMessages: notificationMessagesReducer,
  notifications: notificationsReducer,
  tariff: tariffReducer,
  tariffs: tariffsReducer
});
