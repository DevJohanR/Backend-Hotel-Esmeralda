module.exports = {
  run: async (sequelize) => {
    try {
      //Creating roomType
      const existRoomType = await sequelize.models.room_types.findOne({
        where: { name: "Not Assigned" },
      });
      if (!existRoomType) {
        const newRoomType = await sequelize.models.room_types.create({
          name: "Not Assigned",
          description: "Not assigned to any room type",
        });

        return newRoomType;
      }
    } catch (error) {
      console.error(error);
    }
  },
};
