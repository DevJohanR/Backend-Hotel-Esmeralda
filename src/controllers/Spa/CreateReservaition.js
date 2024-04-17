const crypto = require("crypto");
const { spa_reservations, room_spa, connect } = require("../../db");
const { Sequelize } = require("sequelize");

const generateReservationNumber = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let reservationNumber = "";
    for (let i = 0; i < 3; i++) {
        reservationNumber += letters.charAt(crypto.randomInt(letters.length));
    }
    for (let i = 0; i < 3; i++) {
        reservationNumber += crypto.randomInt(10);
    }
    return reservationNumber;
};

const createSpaReservation = async (req, res) => {
    const transaction = await connect.transaction();
    try {
        const { user_id, checkInDateTime, checkOutDateTime, room_id } = req.body;

        const spa = await room_spa.findByPk(room_id)
        if (!spa) {
            return res.status(400).json({ message: "servicio no encontrado" });
        }
        const pricePerHour = spa.price;
        const checkInDate = new Date(checkInDateTime);
        const checkOutDate = new Date(checkOutDateTime);
        const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
        const hours = timeDifference / (1000 * 60 * 60);

        const totalPrice = hours * pricePerHour

        let reservationNumber = generateReservationNumber();
        const existingReservationNumber = await spa_reservations.findOne({
            where: {
                reservation_Number: reservationNumber,
                status: {
                    [Sequelize.prototype.ne]: "completed",
                },
            },
        });
        while (existingReservationNumber) {
            reservationNumber = generateReservationNumber();
        }
        const newReservation = await spa_reservations.create(


            {
                reservation_number: reservationNumber,
                user_id,
                checkInDateTime: checkInDate,
                checkOutDateTime: checkOutDate,
                status: "active",
                total_Price: totalPrice,
                room_id
            },
            { transaction }
        )
        await transaction.commit();
        return res.status(201).json(newReservation);
    }   catch (error) {
        await transaction.rollback();
        console.error(error);
        return res.status(500).json({message:"Error al crear Reserva del Spa"})
     }
}

module.exports = {createSpaReservation}