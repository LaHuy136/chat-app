module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      }
    },
    conversation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "conversations", 
        key: "id"
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    attachment_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    message_type: {
      type: DataTypes.ENUM("text", "image", "file", "system"),
      defaultValue: "text"
    },
  }, {
    tableName: "messages",
    timestamps: true,
  });

  return Message;
};
