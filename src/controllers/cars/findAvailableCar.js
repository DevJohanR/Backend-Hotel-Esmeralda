const { Op, Sequelize } = require('sequelize');
const { car_details } = require('../../db');

const findAvailableCar = async (req, res, next) => {
    try {
        const { from, to, passenger } = req.query;
        console.log(`From: ${from}`);
        console.log(`To: ${to}`);
        console.log(`Passenger: ${passenger}`);
        const fromDate = new Date(from).toISOString();
        const toDate = new Date(to).toISOString();
        const availableCars = await car_details.findAll({
            where: {

                passenger: {
                    [Op.gte]: passenger
                },
                id: {
                    [Op.notIn]: Sequelize.literal(`(SELECT DISTINCT car_id FROM car_reservations WHERE ((check_in_date <= '${toDate}' AND check_out_date >= '${fromDate}')) OR (check_in_date >= '${fromDate}' AND check_in_date <= '${toDate}') OR (check_out_date >= '${fromDate}' AND check_out_date <= '${toDate}'))`)
                }
            }
        });

        if (availableCars.length === 0) {
            return res.status(404).json({ message: 'No hay autos disponibles para el rango de fechas solicitado o con el tipo de auto requerido' });
        }

        res.status(200).json({ message: 'Autos disponibles encontrados', cars: availableCars });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al buscar autos disponibles' });
    }
}

module.exports = { findAvailableCar };
