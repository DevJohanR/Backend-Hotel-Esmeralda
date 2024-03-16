const { Router } = require("express");

const routeInit = () => {
  const router = Router();

  router.get("/", (req, res) => {
    res.status(200).json("Bienvenido");
  });
  return router;
};
//prueba

module.exports = routeInit;
