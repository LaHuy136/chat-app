module.exports = (sequelize, DataTypes) => {
    const VerifiedEmail = sequelize.define('VerifiedEmail', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        verified_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'verified_emails',
        timestamps: false
    });
    return VerifiedEmail;
};
