const db = require('../models');
const ConversationMember = db.ConversationMember;

exports.createConversation = async (type, name, members) => {
    const conversation = await ConversationMember.create({ type, name });
    if (members && members.length > 0) {
        const data = members.map(userId => ({ conversation_id: conversation.id, user_id: userId }));
        await ConversationMember.bulkCreate(data);
    }
    return conversation;
}

exports.getConversationsByUser = async (userId) => {
    return await db.findAll({
        include: [{ model: ConversationMember, where: { user_id: userId } }]
    });
}


