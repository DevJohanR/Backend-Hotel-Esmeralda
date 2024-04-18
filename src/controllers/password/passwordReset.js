const { users } = require("../../db");

// Endpoint to reset the password
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await users.findOne({ where: { email: decoded.email } });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      user.password = newPassword;
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

module.exports = {resetPassword};