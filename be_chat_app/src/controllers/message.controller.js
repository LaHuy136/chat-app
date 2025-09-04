const messageService = require("../services/message.service");

exports.send = async (req, res) => {
    try {
        const { conversationId, senderId, content, attachmentUrl, messageType } = req.body;
        const message = await messageService.sendMessage(conversationId, senderId, content, attachmentUrl, messageType);
        res.status(201).json(message);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.getByConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const messages = await messageService.getMessagesByConversation(conversationId);
        res.json(messages);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
