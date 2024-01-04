const { where } = require("sequelize");
const bcrypt = require("bcrypt");
const db = require("../models/index");

const handleRegister = async (req, res) => {
  try {
    let { email, username, password, phone } = req.body;
    if (!email || !username || !password || !phone) {
      return res.status(400).json({
        detail: "Vui lòng điền đầy đủ dữ liệu !",
      });
    }
    let check_mail = await db.User.findOne({
      where: {
        email: email,
      },
    });
    if (check_mail) {
      return res.status(400).json({
        detail: "Email đăng ký đã tồn tại !",
      });
    }
    let check_username = await db.User.findOne({
      where: {
        username: username,
      },
    });
    if (check_username) {
      return res.status(400).json({
        detail: "Username đăng ký đã tòno tại !",
      });
    }

    let hash_password = await bcrypt.hash(password, 10);

    let data_new_user = await db.User.create({
      email: email,
      username: username,
      password: hash_password,
      phone: phone,
    });
    return res.status(200).json({
      success: true,
      message: "Đăng ký thành công",
      user: data_new_user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      detail: "Erro from Server",
    });
  }
};

const checkPassword = async (password, hashPassword) => {
  const check = await bcrypt.compare(password, hashPassword);
  return check;
};

const handleLogin = async (req, res) => {
  try {
    console.log("Data:", req.body);
    let { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        detail: "Vui lòng điền đầy đủ dữ liệu !",
      });
    }
    let user = await db.User.findOne({
      where: {
        username: username,
      },
    });
    if (!user) {
      return res.status(404).json({
        detail: "Username đăng nhập không tồn tại !",
      });
    } else {
      let check_password = await checkPassword(password, user.password);
      if (check_password == false) {
        return res.status(401).json({
          detail: "Password đăng nhập không đúng !",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Đăng nhập thành công !",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleRegister,
  handleLogin,
};
