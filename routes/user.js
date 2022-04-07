const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
// user routes
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.get("/", userController.getusers);
router.get("/:id", userController.getusersById);
router.delete("/:id", userController.deleteuser);
// // login user routes
router.post("/login", userController.loginUser);

module.exports = router;
