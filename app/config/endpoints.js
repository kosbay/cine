const getBackendUrl = () => {
  if (!process.browser) {
    return process.env.BACKEND_URL || 'https://wunder-server-stage.herokuapp.com';
  }

  return (window.env && window.env.BACKEND_URL) || 'https://wunder-server-stage.herokuapp.com';
};

// const getBackendUrl = () => 'http://localhost:5001';

const getEndpoints = () => ({
  achievementsBySubjectId: `${getBackendUrl()}/api/achievementsBySubjectId`,
  courseProgressBySchool: `${getBackendUrl()}/api/courseProgressBySchool`,
  enrollmentStatus: `${getBackendUrl()}/api/enrollment/status`,
  facultiesBySchool: `${getBackendUrl()}/api/facultiesBySchool`,
  fetchChapter: `${getBackendUrl()}/api/chapters`,
  fetchCourse: `${getBackendUrl()}/api/courses`,
  fetchCourses: `${getBackendUrl()}/api/courses`,
  fetchCourseWithProgress: `${getBackendUrl()}/api/progress/getCourseWithProgress`,
  fetchFaculties: `${getBackendUrl()}/api/faculties`,
  fetchFacultiesWithProgress: `${getBackendUrl()}/api/progress/getFacultiesWithProgress`,
  fetchFaculty: `${getBackendUrl()}/api/faculties`,
  fetchLesson: `${getBackendUrl()}/api/lessons`,
  fetchUserLesson: `${getBackendUrl()}/api/progress/getUserLesson`,
  fetchUserSkills: `${getBackendUrl()}/api/userSkills`,
  finishLesson: `${getBackendUrl()}/api/progress/finishLesson`,
  deleteLesson: `${getBackendUrl()}/api/deleteAdminProgress`,
  getChapterWithProgress: `${getBackendUrl()}/api/progress/getChapterWithProgress`,
  getContests: `${getBackendUrl()}/api/contests`,
  loginUser: `${getBackendUrl()}/api/auth/login`,
  schoolInfo: `${getBackendUrl()}/api/schoolInfo`,
  schools: `${getBackendUrl()}/api/schools`,
  socketDevEndpoint: 'http://localhost:5001',
  socketProdEndpoint: getBackendUrl(),
  studentRank: `${getBackendUrl()}/api/users/rank`,
  users: `${getBackendUrl()}/api/users`,
  certificate: `${getBackendUrl()}/api/certificate`,
  userCertificates: `${getBackendUrl()}/api/userCertificate`,
  currentUser: `${getBackendUrl()}/api/auth/current_user`,
  notifications: `${getBackendUrl()}/api/notifications`,
  fetchUserCourses: `${getBackendUrl()}/api/userCourses`,
  editNotification: `${getBackendUrl()}/api/editNotification`,
  activeEvent: `${getBackendUrl()}/api/activeEvent`,
  getCoursesWithProgress: `${getBackendUrl()}/api/progress/getCoursesWithProgress`,
  fetchTariffs: `${getBackendUrl()}/api/tariffs`,
  fetchTariff: `${getBackendUrl()}/api/tariff`,
  firstPayment: `${getBackendUrl()}/api/cloudpayment/firstPayment`,
  saveSubscription: `${getBackendUrl()}/api/cloudpayment/saveSubscription`,
  userCreditCard: `${getBackendUrl()}/api/cloudpayment/userCard`,
  userSubscription: `${getBackendUrl()}/api/cloudpayment/userSubscription`,
  cancelSubscription: `${getBackendUrl()}/api/cloudpayment/subscriptionCancel`,
});

export default getEndpoints;
