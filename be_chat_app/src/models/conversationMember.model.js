module.exports = (sequelize, DataTypes) => {
    const ConversationMember = sequelize.define("ConversationMember", {
        id: {
            type: DataTypes.INTEGER
            , autoIncrement: true,
            primaryKey: true
        },
        role: {
            type: DataTypes.ENUM("member", "admin"),
            defaultValue: "member"
        },
    }, {
        tableName: "conversation_members",
        timestamps: true,
    });
    return ConversationMember;
};
