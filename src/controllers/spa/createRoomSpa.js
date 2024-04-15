const { room_spa } = require('../../db');

const createOrUpdateRoomSpa = async (req, res) => {
    try {
        const { id, ...roomSpaData } = req.body;

        let roomSpa; 

        if (id) {
            
            const [updatedRows] = await room_spa.update(roomSpaData, {
                where: { id: id } 
            });

            
            if (updatedRows > 0) {
                
                roomSpa = await room_spa.findByPk(id);
            } else {
                
                roomSpa = await room_spa.create(roomSpaData);
            }
        } else {
            
            roomSpa = await room_spa.create(roomSpaData);
        }

      
        const allRoomSpa = await room_spa.findAll();

        
        res.status(201).json({
            roomSpa: roomSpa,
            allRoomSpa: allRoomSpa,
            message: "Operación de 'update or create' completada correctamente."
        });
    } catch (error) {
       
        res.status(500).json({ message: 'Error en la operación de "update or create".', error: error.message });
    }
};

module.exports = { createOrUpdateRoomSpa };
