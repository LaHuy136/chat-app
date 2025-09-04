module.exports = (sequelize, DataTypes) => {
    const Conversation = sequelize.define("Conversation", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: DataTypes.ENUM("single", "group"),
            allowNull: false
        },
        name: DataTypes.STRING,
    }, {
        tableName: "conversations",
        timestamps: true,
    });
    return Conversation;
};
