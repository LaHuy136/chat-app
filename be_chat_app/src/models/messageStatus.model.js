module.exports = (sequelize, DataTypes) => {
    const MessageStatus = sequelize.define("MessageStatus", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        status: {
            type: DataTypes.ENUM("sent", "delivered", "seen"),
            defaultValue: "sent"
        },
    }, {
        tableName: "message_status",
        timestamps: true,
    });
    return MessageStatus;
};
