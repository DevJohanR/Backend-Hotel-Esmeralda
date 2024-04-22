const { reservations, users, guest_profile, rooms } = require("../../db");

const getReservations = async (req, res, next) => {
  try {
    const { id } = req.params;
    const allReservations = id
      ? await reservations.findAll({
          where: { id: id },
          include: [
            { model: rooms },
            { model: users, include: [{ model: guest_profile }] },
          ],
        })
      : await reservations.findAll({
          include: [
            { model: rooms },
            { model: users, include: [{ model: guest_profile }] },
          ],
        });
    console.log("allReservations", allReservations);
    return res.status(200).json(allReservations);
  } catch (error) {
    console.log("Error getting reservation: ", error);
    return res.status(400).json(error);
  }
};
module.exports = { getReservations };
