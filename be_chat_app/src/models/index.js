const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('chat_app', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model')(sequelize, Sequelize);
db.VerifiedEmail = require('./verifiedEmail.model')(sequelize, Sequelize);
db.VerificationCode = require('./verificationCode.model')(sequelize, Sequelize);
db.Conversation = require("./conversation.model")(sequelize, Sequelize);
db.ConversationMember = require("./conversationMember.model")(sequelize, Sequelize);
db.Message = require("./message.model")(sequelize, Sequelize);
db.MessageStatus = require("./messageStatus.model")(sequelize, Sequelize);



db.User.hasOne(db.VerifiedEmail, { foreignKey: 'user_id' });
db.VerifiedEmail.belongsTo(db.User, { foreignKey: 'user_id' });

db.Conversation.hasMany(db.ConversationMember, { foreignKey: "conversation_id" });
db.ConversationMember.belongsTo(db.Conversation, { foreignKey: "conversation_id" });

db.User.hasMany(db.ConversationMember, { foreignKey: "user_id" });
db.ConversationMember.belongsTo(db.User, { foreignKey: "user_id" });

db.Conversation.hasMany(db.Message, { foreignKey: "conversation_id" });
db.Message.belongsTo(db.Conversation, { foreignKey: "conversation_id" });

db.User.hasMany(db.Message, { foreignKey: "sender_id" });
db.Message.belongsTo(db.User, { foreignKey: "sender_id" });

db.Message.hasMany(db.MessageStatus, { foreignKey: "message_id" });
db.MessageStatus.belongsTo(db.Message, { foreignKey: "message_id" });

db.User.hasMany(db.MessageStatus, { foreignKey: "user_id" });
db.MessageStatus.belongsTo(db.User, { foreignKey: "user_id" });

module.exports = db;