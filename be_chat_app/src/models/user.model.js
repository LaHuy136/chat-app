module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phonenumber: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
        },
        gender: DataTypes.STRING,
        dateofbirth: DataTypes.DATE,
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        provider: {
            type: DataTypes.STRING,
            defaultValue: 'email',
        },
    }, {
        tableName: 'users',
        timestamps: false
    });

    return User;
};
