const { users } = require("../../db");

async function setState(req, res) {
  try {
    const { id } = req.params;
    const { state } = req.body;

    if (!id)
      return res.send(400).json({
        message: "Missing id",
      });

    if (!state)
      return res.status(400).json({
        message: "Missing state",
      });

    if (!req.user.role === "admin")
      return res.status(401).json({
        message: "Unauthorized",
      });

    const user = await users.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.state = state;
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

module.exports = setState;
