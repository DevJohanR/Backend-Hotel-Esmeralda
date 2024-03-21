const bcrypt = require('bcrypt');
const { users } = require('../../db');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const loginUser = async (req, res) => {
    const { userName, userEmail, password } = req.body;

    // Validación de datos de entrada
    if (!password || (!userName && !userEmail)) {
        return res.status(400).json({ message: "Campos obligatorios no completados" });
    }

    try {
        let user;
        let field;
        if (userEmail) {
            user = await users.findOne({ where: { email: userEmail } });
            field = "email";
        } else {
            user = await users.findOne({ where: { username: userName } });
            field = "nombre de usuario";
        }

        if (!user) {
            return res.status(400).json({ message: `No existe un usuario con este ${field} registrado` });
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "La contraseña ingresada es incorrecta" });
        }

        const token = generateToken(user.id, user.email, user.role);
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: "Inicio de sesión completado correctamente" });

    } catch (error) {
        res.status(500).json({ message: "Hubo un error", error: error.message });
    }
};

const generateToken = (userId, username, role) => {
    return jwt.sign({ id: userId, username, role }, 'Soylaclave', { expiresIn: '30m' });
};

module.exports = { loginUser };
