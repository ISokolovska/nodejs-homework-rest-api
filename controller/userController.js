const gravatar = require("gravatar");
const User = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/hash.util");
const { jwtSign } = require("../utils/jwt.util");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const signUp = async ({ email, password }) => {
  const user = await User.findOne({ email: email });
  if (user) {
    return null;
  }
  const newUser = await User.create({
    email,
    password: hashPassword(password),
  });
  const secureUrl = gravatar.url(email, { s: "100", r: "x", d: "retro" }, true);
  const updatedUser = await User.findOneAndUpdate(
    { _id: newUser._id },
    {
      token: jwtSign({ _id: newUser._id }),
      avatarURL: secureUrl,
    },
    { new: true }
  );
  const msg = {
    to: email, // Change to your recipient
    from: "uu.sokil@gmail.com", // Change to your verified sender
    subject: "Sign up", // Change to your
    text: "Congratulations! You have successfully signed up",
    html: "<h1>Sign up!</h1>",
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
  return updatedUser;
};

const signIn = async ({ email, password }) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    return null;
  }
  const isPasswordValid = comparePassword(password, user.password);
  if (!isPasswordValid) {
    return null;
  }
  return user;
};

const logout = async (_id) => {
  const user = await User.findOneAndUpdate(
    { _id },
    {
      token: null,
    },
    { new: true }
  );
  console.log("🚀 ~ file: userController.js:47 ~ logout ~ user", user);

  return user;
};

const updateSubscription = async (_id, subscription) => {
  const user = await User.findByIdAndUpdate(
    { _id },
    { subscription },
    { new: true }
  );
  return user;
};

const updateAvatar = async (_id, avatarURL) => {
  const user = await User.findByIdAndUpdate(
    { _id },
    { avatarURL },
    { new: true }
  );
  return user;
};

module.exports = {
  signUp,
  signIn,
  logout,
  updateSubscription,
  updateAvatar,
};
