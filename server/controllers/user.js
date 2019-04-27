const mongoose = require("mongoose");
const nodemailer = require("nodemailer")

const User = mongoose.model("User");
const schoolWupaiRefresher = require("../refreshers/wupaiSchool");
/* eslint-disable */
const { BadgeUp, modifierType } = require("services/BadgeUp");
const config = require('config');
/* eslint-enable */
const { validationResult } = require("express-validator/check");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.mail.user,
    pass: config.mail.pass
  }
});

const endpoint = process.env.NODE_ENV === "production" ? "http://localhost:5001" : "https://wunder-server.herokuapp.com"

module.exports.getUsers = async (req, res) => {
  try {
    const {
      sortByWupai,
      populateSchool,
      role,
      page,
      limit,
      userName,
      name,
      schoolId
    } = req.query;
    const pageSizeLimit = Number(limit);
    const queryOptions = Object.assign(
      {},
      sortByWupai && { sort: { wupai: sortByWupai } },
      populateSchool && { populate: { path: "school", select: "name" } },
      limit && { limit: pageSizeLimit || 10 },
      page && { page: page || 0 }
    );

    const searchOptions = Object.assign(
      {},
      userName && { username: { $regex: new RegExp(`^${userName}`, "i") } },
      name && { name: { $regex: new RegExp(`^${name}`, "i") } },
      schoolId && { school: schoolId },
      role && { role }
    );
    const findedUsers = await User.paginate(searchOptions, queryOptions);

    const users = {
      ...findedUsers,
      docs: role
        ? findedUsers.docs.filter(user => user.role === role)
        : findedUsers.docs
    };

    if (typeof sortByWupai !== "undefined") {
      users.docs = users.docs.map(user => {
        const greaterDocmentCount = users.docs.filter(
          ({ wupai }) => wupai > user.wupai
        ).length;
        const queryPage = Number(page || 0);
        const offsetNumber = (queryPage || 1) - 1;
        const offset = offsetNumber * (Number(limit) || 10);
        const position = greaterDocmentCount + offset + 1;
        return { ...user.toObject(), position };
      });
    }

    res.status(200).send(users);
  } catch (err) {
    console.log('error: ', err);
    res.status(500).send({ err });
  }
}

module.exports.addUser = async (req, res) => {
  try {
    const errors = validationResult(req).array();
    if (errors && errors.length > 0) {
      res.status(400).send(errors);
    }
    const { password, ...userProps } = req.body;
    User.register(new User(userProps), password, (err, user) => {
      if (err) {
        res.status(422).send(err);
      }
      res.status(200).send(user);
      return user;
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.demoUserRegistration = async (req, res) => {
  try {
    const errors = validationResult(req).array();
    if (errors && errors.length > 0) {
      res.status(400).send(errors);
    }

    const { password, ...userProps } = req.body;

    const userFields = { ...userProps, isVerified: false, role: "demo" }
    User.register(new User(userFields), password, (err, user) => {
      if (err) {
        res.status(422).send(err);
      }

      const mailOptions = {
        from: 'intellection.kz@gmail.com', // sender address
        to: 'sabit990928@gmail.com', // list of receivers
        subject: 'Confirm it!', // Subject line
        html: `
        <div>
            <p>Ne nu ty <b>real</b>!!!<br/>
            <img src="https://gq-images.condecdn.net/image/opZ8Wnr74DE/crop/405/landscape/f/El-Classico-01-GQ-14Aug17_getty_b.jpg"/>
            </p>
            <div>
              Перейди то этой ссылке чтобы подвердить<br/>
              <a href=${endpoint}+"/test"/>
            </div>
        </div>
        `
      };

      transporter.sendMail(mailOptions, (mailError, info) => {
        if(mailError)
          console.log(mailError)
        else
          console.log(info);
      });
      console.log("here")
      res.status(200).send(user);
      return user;
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.getUser = async (req, res) => {
  try {
    console.log('req: ', req.params);
    const { userId } = req.params;
    if (!userId) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const user = await User.findById(userId);
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(500).send({ err });
  }
}

module.exports.getUserRank = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const user = await User.findById(userId);
      if (!user) {
        res.status(400).send("User not found");
        return;
      }

      const { wupai } = user;
      const rankPosition = await User.distinct("wupai").count({
        wupai: { $gt: wupai }
      });
      const userWithRank = { ...user.toObject(), position: rankPosition + 1 };
      res.status(200).send(userWithRank);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { school: schoolId } = req.body;
    const user = await User.findById(userId);
    const { school: prevSchoolId } = user;
    await User.update({ _id: userId }, req.body);
    if (schoolId) {
      schoolWupaiRefresher(schoolId);
      schoolWupaiRefresher(prevSchoolId);
    }
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}

module.exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const user = await User.findById(userId);
      const result = await User.findByIdAndRemove(userId);
      schoolWupaiRefresher(user.school);
      res.status(200).send(result);
    }
  } catch (err) {
    res.status(500).send({ err });
  }
}

module.exports.setUserPassword = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400).send({ err: "Данные не отправлены!" });
    } else {
      const user = await User.findById(req.params.userId);
      const sanitizedUser = await user.setPassword(req.body.password);
      await sanitizedUser.save();
      res.status(200).send(sanitizedUser);
    }
  } catch (err) {
    res.status(500).send({ err });
  }
}

module.exports.setUserBadge = async (req, res) => {
  try {
    const { userId, socialType } = req.body;
    await BadgeUp.createEvent(userId, socialType, {
      [modifierType.increment]: 1
    });
    res.status(200).send("Badge added successfully!");
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
}
