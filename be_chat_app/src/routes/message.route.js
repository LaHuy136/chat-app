const express = require("express");
const router = express.Router();
const {send, getByConversation} = require("../controllers/message.controller");

router.post("/", send);
router.get("/conversation/:conversationId", getByConversation);

module.exports = router;
