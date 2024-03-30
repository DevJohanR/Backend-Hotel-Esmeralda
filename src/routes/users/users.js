//routes/users/users.js
const { Router } = require('express');
const { checkUserExists } = require('../../controllers/users/checkUser');
const { register } = require('../../controllers/users/register');
const { getAllUsers } = require('../../controllers/users/getAllUsers');
const { login } = require('../../controllers/users/login');
const { authenticateToken } = require('../../helpers/authenticateToken');
const { userInfo } = require('../../controllers/users/userInfo');
const { updateProfile } = require('../../controllers/users/updateProfile');

const router = Router();

router.post('/register', register);
router.get('/checkUser', checkUserExists);
router.get('/allUsers', authenticateToken, getAllUsers);
router.post('/login', login);
router.get('/userinfo', authenticateToken, userInfo); 
router.post('/profile/:userId', updateProfile);

router.get('/confirm/:token', async (req, res) => {
    try {
      const { token } = req.params;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const user = await users.findOne({ where: { id: decoded.id } });
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }
  
      if (user.emailVerified) {
        return res.status(400).json({ message: 'El correo electrónico ya ha sido verificado.' });
      }
  
      user.emailVerified = true;
      await user.save();
  
      // En lugar de redirigir, devuelve una respuesta JSON
      return res.status(200).json({ message: 'Correo electrónico verificado con éxito.' });
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Token inválido.' });
      } else {
        return res.status(500).json({ message: 'Error al verificar el correo electrónico.' });
      }
    }
  });
  

module.exports = router;
