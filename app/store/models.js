import { denormalize, schema } from 'normalizr';

export const lesson = new schema.Entity('lessons', {}, { idAttribute: '_id' });

export const module = new schema.Entity(
  'modules',
  { lessons: [lesson] },
  { idAttribute: '_id' }
);

export const chapter = new schema.Entity(
  'chapters',
  { modules: [module] },
  { idAttribute: '_id' }
);

export const course = new schema.Entity(
  'courses',
  { chapters: [chapter] },
  { idAttribute: '_id' }
);

export const faculty = new schema.Entity(
  'faculties',
  { courses: [course] },
  { idAttribute: '_id' }
);

export const userLesson = new schema.Entity(
  'userLessons',
  { lessons: [lesson] },
  { idAttribute: '_id' }
);

export const userModule = new schema.Entity(
  'userModules',
  { userLessons: [userLesson] },
  { idAttribute: '_id' }
);

export const userChapter = new schema.Entity(
  'userChapters',
  { userModules: [userModule] },
  { idAttribute: '_id' }
);

export const userCourse = new schema.Entity(
  'userCourses',
  { userChapters: [userChapter] },
  { idAttribute: '_id' }
);

export const userFaculty = new schema.Entity(
  'userFaculties',
  { userCourses: [userCourse] },
  { idAttribute: '_id' }
);

export const EnrollmentStatus = new schema.Entity(
  'enrollmentStatus',
  { },
  { idAttribute: '_id' }
);

export const UserSkills = new schema.Entity(
  'userSkills',
  {},
  { idAttribute: '_id' }
);

export const UserCertificates = new schema.Entity(
  'userCertificates',
  {},
  { idAttribute: '_id' }
);

export const tariff = new schema.Entity(
  'tariffs',
  {},
  { idAttribute: '_id' }
);

export const UserCreditCard = new schema.Entity(
  'userCreditCard',
  {},
  { idAttribute: '_id' }
);

export const UserSubscriptions = new schema.Entity(
  'userSubscriptions',
  {},
  { idAttribute: '_id' }
);

export const getFacultiesFromState = (state) => {
  const data = denormalize(
    Array.from(Object.keys(state.faculties)),
    [faculty],
    state
  );
  return Object.values(data);
};

export const getCoursesFromState = (state) => {
  const data = denormalize(
    Array.from(Object.keys(state.courses)),
    [course],
    state
  );
  return data;
};

export const getCourseFromState = (courseId, state) => {
  const data = denormalize(courseId, course, state);
  return data;
};

export const getFacultyFromState = (facultyId, state) => {
  const data = denormalize(facultyId, faculty, state);
  return data;
};

export const getUserFacultyFromState = (facultyId, state) => {
  const data = denormalize(facultyId, userFaculty, state);
  return data;
};

export const getUserFacultiesFromState = (state) => {
  const data = denormalize(
    Array.from(Object.keys(state.userFaculties)),
    [userFaculty],
    state
  );
  return data;
};

export const getUserCoursesFromState = (state) => {
  const data = denormalize(
    Array.from(Object.keys(state.userCourses)),
    [userCourse],
    state
  );
  return data;
};

export const getUserCourseFromState = (courseId, state) => {
  const data = denormalize(courseId, userCourse, state);
  return data;
};

export const getUserChapterFromState = (chapterId, state) => {
  const data = denormalize(chapterId, userChapter, state);
  return data;
};

export const getChapterFromState = (chapterId, state) => {
  const data = denormalize(chapterId, chapter, state);
  return data;
};

export const getLessonFromState = (lessonId, state) => {
  const data = denormalize(lessonId, lesson, state);
  return data;
};

export const getUserLessonFromState = (lessonId, state) => {
  const data = denormalize(lessonId, userLesson, state);
  return data;
};

export const getEnrollmentStatusFromState = (id, state) => {
  const data = denormalize(id, EnrollmentStatus, state);
  return data;
};

export const getUserSkillsFromState = (userId, state) => {
  const data = denormalize(userId, UserSkills, state);
  return data;
};

export const getUserCertificatesFromState = (state) => {
  const data = denormalize(
    Array.from(Object.keys(state.userCertificates)),
    [UserCertificates],
    state
  );
  return data;
};

export const getTariffsFromState = (state) => {
  const data = denormalize(
    Array.from(Object.keys(state.tariffs)),
    [tariff],
    state
  );
  return data;
};

export const getTariffFromState = (tariffId, state) => {
  const data = denormalize(tariffId, tariff, state);
  return data;
};

export const getUserCreditCardFromState = (userId, state) => {
  const data = denormalize(userId, UserCreditCard, state);
  return data;
};

export const getUserSubscriptionsFromState = (state) => {
  const data = denormalize(
    Array.from(Object.keys(state.userSubscriptions)),
    [UserSubscriptions],
    state
  );
  return data;
};
