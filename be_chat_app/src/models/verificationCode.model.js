module.exports = (sequelize, DataTypes) => {
    return sequelize.define('VerificationCode', {
        email: { type: DataTypes.STRING, allowNull: false },
        code: { type: DataTypes.STRING, allowNull: false },
        expires_at: { type: DataTypes.DATE, allowNull: false },
        purpose: { type: DataTypes.STRING, defaultValue: 'verify' },
        used: { type: DataTypes.BOOLEAN, defaultValue: false }
    }, {
        tableName: 'verification_codes',
        timestamps: false
    });
};