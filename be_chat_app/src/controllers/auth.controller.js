const authService = require('../services/auth.service');

exports.register = async (req, res) => {
    try {
        await authService.registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.loginUser(email, password);

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                phonenumber: user.phonenumber,
                gender: user.gender,
                dateofbirth: user.dateofbirth,
                email: user.email,
            }
        });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

exports.getUserById = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await authService.getUserById(userId);
        return res.json({ user });
    } catch (error) {
        if (error.message === 'User not found') {
            return res.status(404).json({ message: 'User not found' });
        }

        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


exports.updateUser = async (req, res) => {
    const userId = req.user.id;
    const { email, username, profession, dateofbirth } = req.body;

    try {
        const user = await authService.updateUserInfo(userId, {
            username,
            phonenumber,
            gender,
            dateofbirth,
            email,
        });

        return res.json({ message: 'User updated successfully', user });
    } catch (error) {
        if (error.message === 'User not found') {
            return res.status(404).json({ message: 'User not found' });
        }

        console.error('Update failed:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};




exports.verifyEmail = async (req, res) => {
    try {
        await authService.verifyEmail(req.query.token);
        res.send('Email verified successfully!');
    } catch (err) {
        res.status(400).send('Verification failed: ' + err.message);
    }
};

exports.resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        await authService.resetPassword(email, newPassword);
        res.json({ message: 'Password reset successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updatePassword = async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;

    try {
        await authService.updatePassword(email, currentPassword, newPassword);
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.verifyCode = async (req, res) => {
    const { email, code } = req.body;

    try {
        await authService.verifyCode(email, code);
        res.json({ message: 'Email verified successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.resendCode = async (req, res) => {
    const { email } = req.body;
    try {
        await authService.generateVerificationCode(email);
        res.status(200).json({ message: 'OTP resent successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
