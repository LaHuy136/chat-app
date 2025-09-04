const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth.middleware');
const { register, login, getUserById, updateUser, verifyEmail, resetPassword, updatePassword, verifyCode, resendCode } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateToken, getUserById);
router.put('/update', authenticateToken, updateUser);
router.get('/verify-email', verifyEmail);
router.post('/reset-password', resetPassword);
router.post('/update-password', updatePassword);
router.post('/verify-code', verifyCode);
router.post('/resend-code', resendCode);
module.exports = router;