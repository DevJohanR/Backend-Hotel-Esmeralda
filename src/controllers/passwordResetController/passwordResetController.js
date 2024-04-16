// src/controllers/passwordResetController.js
const sgMail = require('@sendgrid/mail');
const { users } = require('../models');
const jwt = require('jsonwebtoken');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to send password reset email
const sendPasswordResetEmail = async ({ username, email }) => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const resetUrl = `http://localhost:3000/reset-password/${token}`;
  
    const message = {
      to: email,
      from: process.env.EMAIL_FROM,
      subject: 'Reset your password',
      templateId: 'd-3236090be3234a4b88a3e56a8c34d460', // new template ID for reset
      dynamicTemplateData: {
        username: username,
        resetUrl: resetUrl
      },
    };
  
    try {
      await sgMail.send(message);
      console.log('Password reset email sent');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw new Error('Error sending password reset email');
    }
  };


  

// Endpoint to request a password reset
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    const user = await users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
  
    await sendPasswordResetEmail({ username: user.username, email: user.email });
    res.status(200).json({ message: 'Password reset email sent.' });
  };




// Endpoint to reset the password
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await users.findOne({ where: { email: decoded.email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.password = newPassword; // hash this password before saving in a real application
    await user.save();
    res.status(200).json({ message: 'Password reset successfully.' });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token.' });
    } else {
      return res.status(500).json({ message: 'Error resetting password.' });
    }
  }
};

module.exports = {
  sendPasswordResetEmail,
  requestPasswordReset,
  resetPassword
};
