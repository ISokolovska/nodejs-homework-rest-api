const jwt = require("jsonwebtoken");

const { signUp } = require("../controller/userController");

const email = "a.sokil@gmail.com";
const password = "test123";
const payload = { id: 123456, username: "Larson" };
const secret = "secret word";

describe("should return 201 Status", () => {
  test("should return 201 Status", () => {
    const apiUrl = "http://localhost:3000/api/users/signup";
    signUp(apiUrl)
      .then((res) => {
        expect(res.status).toBeGreaterThanOrEqual(201);
      })
      .catch((e) => {
        fail(`Expected successful response`);
      });
  });
});

test("should return token after signup", () => {
  const { token } = signUp({ email, password });
  expect(token).toString().includes(jwt.sign(payload, secret));
});

test("should return user with email and subscription after signup", () => {
  const user = signUp({ email, password });
  expect(user.email).toString();
  expect(user.subscription).toString();
});
