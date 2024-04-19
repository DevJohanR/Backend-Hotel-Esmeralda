const { Op } = require("sequelize");

/**
 * Check if a table is available for a given time range.
 * @param {number} tableNumber - The table number.
 * @param {Date} reservationTime - The desired reservation start time.
 * @returns {Promise<boolean>}
 */
async function isTableAvailable(tableNumber, reservationTime) {
  // Calculate end time assuming dining duration is 2 hours
  const endTime = new Date(reservationTime.getTime() + 2 * 60 * 60 * 1000); // Adds 2 hours to the reservation time

  // Check if the reservation is between 12 AM and 12 PM
  if (reservationTime.getHours() >= 12 && reservationTime.getHours() < 24) {
    return false; // Table not available as it's outside operational hours
  }

  // Check for existing reservations that might conflict
  const count = await sequelize.models.restaurant_reserv.count({
    where: {
      table_number: tableNumber,
      [Op.or]: [
        {
          reservation_time: {
            [Op.between]: [reservationTime, endTime]
          }
        },
        {
          reservation_time: {
            [Op.lte]: reservationTime
          },
          '$reservation_time + INTERVAL 2 HOUR$': {
            [Op.gte]: reservationTime
          }
        }
      ],
      status: {
        [Op.not]: "cancelled" // Ignore cancelled reservations
      }
    }
  });

  return count === 0; // If no conflicting reservations, the table is available
}

module.exports = {
  isTableAvailable
};
