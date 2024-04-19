const { Op, Sequelize } = require('sequelize');
const { room_spa } = require('../../db');

const findAvailableSpa = async (req, res, next) => {
    try {
        const { from, to, capacity } = req.query;
        console.log(`From: ${from}`);
        console.log(`To: ${to}`);
        console.log(`capacity: ${capacity}`);
        const fromDate = new Date(from).toISOString();
        const toDate = new Date(to).toISOString();
        const availableSpa = await room_spa.findAll({
            where: {

                max_capacity: {
                    [Op.gte]: capacity
                },
                id: {
                    [Op.notIn]: Sequelize.literal(`(SELECT DISTINCT spa_room_id FROM spa_reservations WHERE ((check_in_date <= '${toDate}' AND check_out_date >= '${fromDate}')) OR (check_in_date >= '${fromDate}' AND check_in_date <= '${toDate}') OR (check_out_date >= '${fromDate}' AND check_out_date <= '${toDate}'))`)
                }
            }
        });

        if (availableSpa.length === 0) {
            return res.status(404).json({ message: 'Not Spa rooms available' });
        }

        res.status(200).json({ message: 'Spa rooms availables', spa: availableSpa });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error Spa' });
    }
}

module.exports = { findAvailableSpa };
