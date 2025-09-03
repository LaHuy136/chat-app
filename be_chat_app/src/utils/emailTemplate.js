function generateEmailTemplate(username, code) {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
    <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="color: #4CAF50;">👋 Hello ${username || 'User'},</h2>
      <p>Thank you for signing up. Please use the following verification code to activate your account:</p>
      <div style="font-size: 32px; font-weight: bold; margin: 20px 0; color: #333; letter-spacing: 4px;">
        ${code}
      </div>
      <p>This code will expire in 5 minutes.</p>
      <p style="margin-top: 40px;">Best regards,<br/><strong>Chat App</strong></p>
    </div>
  </div>
  `;
}

module.exports = { generateEmailTemplate };
