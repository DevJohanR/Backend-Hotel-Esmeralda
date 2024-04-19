const { users, guest_profile } = require("../../db");

async function setState(req, res) {
  try {
    const { id } = req.params;
    const { state } = req.body;

    if (!id)
      return res.send(400).json({
        message: "Missing id",
      });

    if (state === undefined)
      return res.status(400).json({
        message: "Missing state",
      });

    if (!req.user.role === "admin")
      return res.status(401).json({
        message: "Unauthorized",
      });

    console.log("id", id);
    const user = await users.findOne({
      where: { id },
      include: [{ model: guest_profile }],
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    console.log("user", user);
    user.is_active = state;
    console.log("user", user);
    user.save();

    return res.json({
      message: "User updated",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error updating user",
    });
  }
}

module.exports = { setState };
