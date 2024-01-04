const db = require("../models/index");

const indexuser = async (req, res) => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: {
        model: db.Group,
        attributes: ["name", "description"],
      },
    });
    return res.status(200).json({
      success: true,
      users: users,
    });
  } catch (error) {
    console.log(error);
  }
};

const storeUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const destroyUser = () => {};

const showUser = () => {};

const updateUser = () => {};

module.exports = {
  indexuser,
  storeUser,
  destroyUser,
  showUser,
  updateUser,
};
