const mongoose = require("mongoose");

const User = mongoose.model("User");
const School = mongoose.model("School");

const Faculty = mongoose.model("Faculty");
const Course = mongoose.model("Course");
const Chapter = mongoose.model("Chapter");
const Module = mongoose.model("Module");
const Lesson = mongoose.model("Lesson");
const UserProgress = mongoose.model("UserProgress");

const FacultyLessons = mongoose.model("FacultyLessons");
const NotificationMessage = mongoose.model("NotificationMessage");
const Notification = mongoose.model("Notification");

const refreshWupaiAmountForUsers = require("../refreshers/wupaiUsers");
const deletingTree = require("../helpers/deletingTree");
const contentRefresher = require("../refreshers/wupaiContent");
const updateFacultyLessons = require("../helpers/updateFacultyLessons");
const addPointsByLesson = require("../helpers/addPoints");

module.exports.pointAdding = async (req, res) => {
  try{
    const { submissionId } = req.query;
    const submission = await UserProgress.findById(submissionId);
    if (submission && submission.status === "finished") {
      await addPointsByLesson(submission);
    }
    res.status(200).send(submission);
  } catch(err){
    console.log(err);
    res.status(500).send({ err })
  }
}

module.exports.removeUsernameSpaces = async (req, res) => {
  try {
    const users = await User.find({});
    await Promise.all(
      users.map(async ({ username, _id }) => {
        if (username.includes(" ")) {
          await User.update(
            { _id },
            { username: username.replace(/\s/g, "") }
          );
        }
      })
    );
    res.status(200).send("OK");
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports.refreshWupai = async (req, res) => {
  try {
    await refreshWupaiAmountForUsers();
    res.status(200).send("ok");
  } catch (err) {
    console.log(err);
  }
}

module.exports.deleteAdminProgress = async (req, res) => {
  try {
    const { userId, lessonId } = req.query;
    const user = await User.findById(userId);
    if (user && user.role === "admin") {
      await UserProgress.deleteOne({ lessonId, userId });
      res.status(200).send("Progress of Admin deleted!");
    } else {
      res.status(200).send("You can't delete, because you are not Admin!!!");
    }
  } catch (err) {
    res.status(422).send(err);
  }
}

module.exports.changePasswordStatus = async (req, res) => {
  try {
    const { userId, lessonId, status } = req.query;
    const user = await User.findById(userId);
    if (user && user.role === "admin") {
      await UserProgress.update(
        { userId, lessonId },
        {
          status
        }
      );
      res.status(200).send("Status of Progress changed!");
    } else {
      res
        .status(200)
        .send("You can't change status, because you are not Admin!!!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports.deletingTrees = async (req, res) => {
  try {
    const lessonId = "5b81078e3545bb2a1eb54c2c";
    // const moduleId = "5b756cd163144d838663fe3c";
    await deletingTree({ lessonId });
    res.status(200).send("OK");
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

module.exports.contentRefresher = async (req, res) => {
  try {
    await contentRefresher();
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

module.exports.updateFacultyLessons = async (req, res) => {
  try {
    await updateFacultyLessons();
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

module.exports.schoolUser = async (req, res) => {
  try{
    const s = await School.find({}).fill('studentsCount').select({ studentsCount: 1, name: 1, wupai: 1 });
    // const studentsCount = await User.count({
    //   school: schoolId,
    //   role: { $eq: "user" }
    // }).exec();
    console.log("School.find({}).fill('studentsCount'): ", await School.paginate({}));
    res.status(200).send(s);
  } catch(err) {
    console.log(err);
    res.status(500).send(err)
  }
}

module.exports.usernameToLower = async (req, res) => {
  try{
    const users = await User.find({ username: {$regex: "^(?=.*[A-Z])"}, role: "user" });
    await Promise.all(
      users.map(async user => {
        await User.update(
          { _id: user._id },
          { username: user.username.toLowerCase() },
          { multi: true }
        );
      })
    )
    const email = " urazalin.acndjcndj@nisa.edu.kz ";
    const test = email.split("@")[0];
    const test2 = email.replace(/ /g, "")
    console.log(test, test2);
    res.status(200).send({users})
  } catch(err){
    console.log(err)
    res.status(500).send({err})
  }
}

module.exports.createObjectTest = async (req, res) => {
  try{
    // const note = await Notification.create({
    //   recieverId: "5b9f2865e86e830f3f0d995b",
    //   notificationMessageId: "5c6680a1f46c060fb5dd14f6",
    //   isRead: false,
    //   isSend: false
    // })
    const note = await Notification.find({}).populate("notificationMessageId");
    console.log("note", note);
    res.status(200).send(note)
  } catch(err){
    console.log(err);
    res.status(500).send({ err })
  }
}

module.exports.courseCount = async (req, res) => {
  try{
    const result = {};
    const courses = await Course.find({}).select({ _id: 1, name: 1 }).populate({
      path: "chapters",
      select: {  _id: 1 },
      populate: {
        path: "modules",
        select: {  _id: 1 },
        populate: {
          path: "lessons",
          select: {  _id: 1 } 
        }
      }
    });
    await Promise.all(
      courses.map( async course => {
        let modules = 0;
        let lessons = 0;
        await Promise.all(
          course.chapters.map(async chapter => {
            modules += chapter.modules.length;
            await Promise.all(
              chapter.modules.map(async module => {
                lessons += module.lessons.length
              })
            )
          })
        )
        result[course.name] = modules;
      })
    )
    console.log("RESULT", result)
    res.status(200).send({ courses })
  } catch(err){
    console.log(err);
    res.status(500).send({err})
  }
}

module.exports.getChapterWithProgress = async (req, res) => {
  try{
    const { courseId } = req.query;
    const userId = "5b740330ea7a20998be92a86";
    const course = await Course.findById(courseId).select({ chapters: 1 }).populate({
      path: 'chapters',
      select: { _id: 1, wupai: 1 },
      populate: {
        path: "modules",
        select: "_id wupai",
        populate: {
          path: "lessons",
          select: "_id wupai"
        }
      }
    });

    let count = 0;
    const chaptersWupai = []
    for(let i = 0; i < course.chapters.length; i++){
        console.log("in chap")
        const userChapterWupai = 0;
        for(let j = 0; j < course.chapters[i].modules.length; j++){
          console.log("in mo", course.chapters[i].modules[j])
          const modules = course.chapters[i].modules[j];
          for(let k = 0; k < modules.lessons.length; k++){
            const lesson = modules.lessons[k]
            console.log("in les", lesson)
            const lessonId = lesson._id
            count += lesson && lesson.wupai ? lesson.wupai : 1;
            const userProgress = await UserProgress.findOne({ userId, lessonId });
            if(userProgress && Object.keys(userProgress).length > 0){
              console.log("in", userChapterWupai)
              userChapterWupai += userProgress.result ? userProgress.result : 1;
              console.log("out", userChapterWupai)
            }
          }
          
        }
        console.log("inside loop", userChapterWupai)
        chaptersWupai.push(userChapterWupai);
      
    }
    
    res.status(200).send({course, count, chaptersWupai});
  } catch(err){
    console.log(err);
    res.status(400).send({ err })
  }

}
