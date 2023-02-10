const jwt = require("jsonwebtoken");

const { signUp } = require("../controller/userController");

const email = "a.sokil@gmail.com";
const password = "test123";
const payload = { id: 123456, username: "Larson" };
const secret = "secret word";

// test("should return 201 Status", () => {
//   // const res = signUp({ email, password });
//   // expect(res).toBe(201);

// });
describe("signUp", () => {
  test("should return 201 Status", () => {
    const drink = jest.fn();
    drinkAll(drink, "lemon");
    expect(drink).toHaveBeenCalled();
  });
});

// test("should return token after signup", () => {
//   const { token } = signUp({ email, password });
//   expect(token).toString().includes(jwt.sign(payload, secret));
// });

// test("should return user with email and subscription after signup", () => {
//   const user = signUp({ email, password });
//   expect(user.email).toString();
//   expect(user.subscription).toString();
// });
