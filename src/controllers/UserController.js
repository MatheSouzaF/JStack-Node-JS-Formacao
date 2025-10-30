const { get } = require("http");
const users = require("../mocks/users");

module.exports = {
  listUser(req, res) {
    const { order } = req.query;
    const sortedUsers = users.sort((a, b) => {
      if (order === "desc") {
        return a.id < b.id ? 1 : -1;
      }
      return a.id > b.id ? 1 : -1;
    });

    res.send(200, sortedUsers);
  },

  getUserById(req, res) {
    const { id } = req.params;

    const user = users.find((user) => user.id === Number(id));
    if (!user) {
      return res.send(400, { error: "User not Find" });
    }
    res.send(200, user);
  },

  createUser(req, res) {
    const { body } = req;

    const lastUserId = users[users.length - 1].id;
    const newUser = {
      id: lastUserId + 1,
      name: body.name,
    };
    users.push(newUser);
    res.send(200, newUser);
  },
};
