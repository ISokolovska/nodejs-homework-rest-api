const jwt = require("jsonwebtoken");
const { signUp } = require("../controller/userController");

const email = "a.sokil@gmail.com";
const password = "test123";
const payload = { id: 123456, username: "Larson" };
const secret = "secret word";

test("return token after signup", () => {
  const { token } = signUp({ email, password });
  expect(token).toString().includes(jwt.sign(payload, secret));
});
