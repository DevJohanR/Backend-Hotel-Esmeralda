const { Sequelize } = require("sequelize");
const { rooms, room_types, room_details, connect } = require("../../db");

const createRoom = async (req, res) => {
  const transaction = await connect.transaction();
  try {
    const roomExist = await rooms.findAll({
      where: { room_number: req.body.room_number },
    });

    if (roomExist.length > 0) throw new Error("The room already exist.");
    // Luego, crea la habitación con el tipo de habitación asociado
    const {
      room_number,
      room_type,
      status,
      price_per_night,
      description,
      max_capacity,
      photo_url,
      services,
      photos,
    } = req.body;
    const newRoom = await rooms.create(
      {
        room_number,
        type_id: Number(room_type.id),
        status,
        price_per_night: parseFloat(price_per_night, 2),
        description,
        max_capacity,
        photo_url,
      },
      { transaction }
    );
    console.log(newRoom);

    // Ahora, crea los detalles de la habitación asociados
    const newRoomDetails = await room_details.create(
      {
        room_id: newRoom.id,
        single_bed: services.single_bed,
        double_bed: services.double_bed,
        air_conditioning: services.air_conditioning,
        jacuzzi: services.jacuzzi,
        internet_connection: services.internet_connection,
        tv: services.tv,
        minibar: services.minibar,
        phone: services.phone,
        photos,
      },
      { transaction }
    );
    console.log(newRoomDetails);

    await transaction.commit();
    const room = await rooms.findByPk(newRoom.id, {
      include: [
        { model: room_details, as: "room_detail" },
        { model: room_types, as: "room_type" },
      ],
    });
    if (!room) {
      return res.status(404).send("Room not found");
    }
    return res.status(200).send(room);
  } catch (error) {
    await transaction.rollback();
    console.log(error);

    return res.status(500).json({error:error.message});
  }
};

module.exports = { createRoom };

// JSON de ejemplo para crear una habitación
// {
//     "room_number": 103,
//     "type_rooms": "Standard King",
//     "status": "available",
//     "price_per_night": 100,
//     "description": "This room type is perfect for couples seeking a spacious and comfortable stay. It includes all the essential facilities, ensuring a comfortable and convenient stay for guests.",
//     "max_capacity": 2,
//     "is_active": true,
//     "photo_url": "https://media-public.canva.com/MADQ43iq6nE/1/thumbnail_large-1.jpg",
//     "single_bed": 2,
//     "double_bed": 0,
//     "photos": [
//       "https://www.atualrededor.com/wp-content/uploads/2020/08/Hotel-768x512.jpg",
//       "https://media-public.canva.com/Qs724/MAElQNQs724/1/tl.jpg"
//     ],
//     "air_conditioning": true,
//     "jacuzzi": false,
//     "internet_connection": true,
//     "tv": true,
//     "minibar": false,
//     "phone": true
//   }
