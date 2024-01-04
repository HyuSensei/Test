const express = require("express");
const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/UseController");
const router = express.Router();

router.post("/register", AuthController.handleRegister);
router.post("/login", AuthController.handleLogin);

router.get("/users", UserController.indexuser);
router.post("/users/store", UserController.storeUser);
router.put("/users/update", UserController.updateUser);
router.delete("/users/delete", UserController.destroyUser);

module.exports = router;
