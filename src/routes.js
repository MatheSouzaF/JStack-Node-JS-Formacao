const UserController = require('./controllers/UserController')

module.exports = [
  {
    endpoint: "/users",
    method: "GET",
    handler: UserController.listUser,
  },
  {
    endpoint: "/products",
    method: "GET",
    handler: UserController.listUser,
  }
]