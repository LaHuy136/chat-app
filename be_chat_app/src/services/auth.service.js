const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { sendMail } = require('../utils/mailer');
const User = db.User;
const VerifiedEmail = db.VerifiedEmail;
const VerificationCode = db.VerificationCode;

exports.registerUser = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await User.create({ ...data, password: hashedPassword });

    // Tạo mã OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); 

    await VerificationCode.create({
        email: user.email,
        code: otp,
        expires_at: expiresAt,
        purpose: 'verify'
    });

    // Gửi OTP qua email
    await sendMail(user.email, 'Verify your email address', generateEmailTemplate(user.username, otp));

    return user;
};

exports.generateVerificationCode = async (email) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Email not found');

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await VerificationCode.destroy({ where: { email } });

    await VerificationCode.create({
        email,
        code,
        expires_at: expiresAt,
        purpose: 'verify',
        used: false
    });

    await sendMail(user.email, 'Verify your email address', generateEmailTemplate(user.username, code));
    return user;
};

exports.loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User not found');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Incorrect password');

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return { user, token };
};


exports.updateUserInfo = async (userId, updateData) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    user.username = updateData.username || user.username;
    user.phonenumber = updateData.phonenumber || user.phonenumber;
    user.gender = updateData.gender || user.gender;
    user.dateofbirth = updateData.dateofbirth || user.dateofbirth;
    user.email = updateData.email || user.email;

    await user.save();
    return user;
};


exports.getUserById = async (userId) => {
    const user = await User.findByPk(userId, {
        attributes: ['id', 'username', 'phonenumber', 'gender', 'dateofbirth', 'email'],
    });

    if (!user) throw new Error('User not found');
    return user;
};

exports.verifyEmail = async (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) throw new Error('User not found');

    const [record, created] = await VerifiedEmail.findOrCreate({
        where: { email: user.email },
        defaults: {
            user_id: user.id,
            email: user.email
        }
    });

    if (!created) {
        throw new Error('Email already verified');
    }

    return true;
};

exports.resetPassword = async (email, newPassword) => {
    const user = await db.User.findOne({ where: { email } });
    if (!user) throw new Error('User not found');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
};

exports.updatePassword = async (email, currentPassword, newPassword) => {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        throw new Error('Current password is incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();
};

exports.verifyCode = async (email, code) => {
    const record = await VerificationCode.findOne({
        where: {
            email,
            code,
            used: false,
            purpose: 'verify',
            expires_at: { [Op.gt]: new Date() }
        }
    });

    if (!record) {
        throw new Error('Invalid or expired code');
    }

    // Đánh dấu mã đã dùng
    record.used = true;
    await record.save();

    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User not found');

    const [verified, created] = await VerifiedEmail.findOrCreate({
        where: { email },
        defaults: {
            user_id: user.id,
            email
        }
    });

    if (!created) {
        throw new Error('Email already verified');
    }

    return true;
};