const { users } = require('../../db');
const bcrypt = require("bcrypt"); 

const changePassword = async (req, res) => {
    
    const currentPassword = req.body['currentPassword'];
    const newPassword = req.body.newPassword;

    const userId = req.params.id;    
      
    try {
        console.log('Cuerpo de la solicitud:', req.body); 
        const user = await users.findOne({
            where: { id: userId },
        });
        console.log('mi current password es:',currentPassword,user.password)
        console.log(user)

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
       
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Contraseña actual incorrecta' });
        }
         console.log(isPasswordMatch)
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
         console.log(hashedNewPassword)

        await users.update({ password: hashedNewPassword }, { where: { id: userId } });
       
        res.status(200).json({ message: 'Contraseña actualizada con éxito' });
    } catch (error) {

        console.error('Error en la operación de cambio de contraseña:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { changePassword };
