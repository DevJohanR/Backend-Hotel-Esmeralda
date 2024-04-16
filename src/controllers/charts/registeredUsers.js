// Importa el modelo de usuario y sequelize
const { users } = require("../../db");
const sequelize = require("sequelize");

// Controlador para obtener el total de usuarios registrados por mes y por día
const getUsersRegisteredByMonthAndDay = async (req, res) => {
  try {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const currentYear = new Date().getFullYear();
    // Consulta para contar el número de usuarios registrados por mes
    const usersByMonth = await users.findAll({
      attributes: [
        [sequelize.fn('TRIM', sequelize.fn('TO_CHAR', sequelize.fn('DATE_TRUNC', 'month', sequelize.col('createdAt')), 'Month')), 'month'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'total_users']
      ],
      where: sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM "createdAt"')), currentYear), // Filtra por el año actual
      group: [sequelize.fn('TRIM', sequelize.fn('TO_CHAR', sequelize.fn('DATE_TRUNC', 'month', sequelize.col('createdAt')), 'Month'))],
      raw: true
    });
    // Ordenar los meses por orden cronológico
    usersByMonth.sort((a, b) => {
      const monthsOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return monthsOrder.indexOf(a.month) - monthsOrder.indexOf(b.month);
    });
    

    // Consulta para contar el número de usuarios registrados por día
    const usersByDay = await users.findAll({
      attributes: [
        [sequelize.fn("DATE", sequelize.col("createdAt")), "day"],
        [sequelize.fn("COUNT", sequelize.col("id")), "total_users"],
      ],
      where: {
        createdAt: {
          [sequelize.Op.gte]: firstDayOfMonth 
        }
      },
      group: [sequelize.fn("DATE", sequelize.col("createdAt"))],
      raw: true,
      order: sequelize.literal("day ASC"),
    });

    if (usersByMonth.length === 0 || usersByDay.length === 0) {
      // Si no hay usuarios registrados, enviar una respuesta con un mensaje adecuado
      return res
        .status(404)
        .json({ message: "No hay usuarios registrados en el sistema" });
    }

    const months = usersByMonth.map((entry) => entry.month);
    const totalUsersByMonth = usersByMonth.map((entry) => entry.total_users);
    const days = usersByDay.map((entry) => entry.day);
    const totalUsersByDay = usersByDay.map((entry) => entry.total_users);

    // Enviar los datos como respuesta en formato JSON
    res.json({
      year: new Date().getFullYear().toString(),
      totalUsersByMonth: { months, totalUsersByMonth },
      totalUsersByDay: { days, totalUsersByDay },
    });
  } catch (error) {
    console.error("Error al obtener el total de usuarios registrados:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Exportar el controlador
module.exports = { getUsersRegisteredByMonthAndDay };
