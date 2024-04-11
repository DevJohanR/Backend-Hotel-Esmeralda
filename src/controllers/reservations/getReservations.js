const { reservations } = require("../../db");

const getReservations = async (req, res, next) => {
  try {
    const allReservations = await reservations.findAll(req.body);

    return res.status(200).json(allReservations);
  } catch (error) {
    console.log("Error getting reservation: ", error);
    return res.status(400).json(error);
  }
};
module.exports = { getReservations };
