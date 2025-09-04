const db = require("../models");
const Message = db.Message;
const User = db.User;
const Conversation = db.Conversation;

exports.sendMessage = async (conversationId, senderId, content, attachmentUrl = null, messageType = "text") => {
    const message = await Message.create({
        conversation_id: conversationId,
        sender_id: senderId,
        content,
        attachment_url: attachmentUrl,
        message_type: messageType,
    });
    return message;
}

exports.getMessagesByConversation = async (conversationId) => {
    return await Message.findAll({
        where: { conversation_id: conversationId },
        include: [
            { model: User, attributes: ["id", "name", "email"] },
            { model: Conversation, attributes: ["id", "type", "name"] },
        ],
        order: [["createdAt", "ASC"]],
    });
}
