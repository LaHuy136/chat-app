const conversationService = require("../services/conversation.service");

exports.create = async (req, res) => {
    try {
        const { type, name, members } = req.body;
        const conversation = await conversationService.createConversation(type, name, members);
        res.json(conversation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.getByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const conversations = await conversationService.getConversationsByUser(userId);
        res.json(conversations);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
