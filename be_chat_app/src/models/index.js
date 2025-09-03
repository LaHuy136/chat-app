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

db.User.hasOne(db.VerifiedEmail, { foreignKey: 'user_id' });
db.VerifiedEmail.belongsTo(db.User, { foreignKey: 'user_id' });


module.exports = db;