const express = require("express");
const router = express.Router();
const {create, getByUser} = require("../controllers/conversation.controller");

router.post("/", create);
router.get("/user/:userId", getByUser);

module.exports = router;
