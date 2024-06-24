import { Router } from "express";
import config from "../config.js";

const router = Router();

const admindAuth = (req, res, next) => {
  if (req.session.user?.role !== "admin")
    return res
      .stauts(403)
      .send({ status: "Error", playload: "Acceso no autorizado" });

  next();
};

router.get("/counter", async (req, res) => {
  try {
    if (req.session.counter) {
      req.session.counter++;
      res.status(200).send({
        origin: config.SERVER,
        playload: `Haz visitado la página ${req.session.counter} veces`,
      });
    } else {
      req.session.counter = 1;
      res.status(200).send({
        origin: config.SERVER,
        playload: `Es tu primer visita`,
      });
    }
  } catch (error) {
    res.status(500).send({ status: "Error", playload: error.message });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const savedUser = {
      email: "jezz@gmail.com",
      password: "jezz123",
      firstName: "Jezz",
      lastName: "Diaz",
      role: "admin",
    };

    req.session.user = {
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      role: savedUser.role,
    };
    savedUser.email === email && savedUser.password === password
      ? res.redirect("/profile")
      : res.status(401).send({
          status: "Datos no válidos",
          playload: "Email ó password incorrectos",
        });
  } catch (error) {
    res.status(500).send({ status: "Error", playload: error.message });
  }
});
router.put("/", async (req, res) => {
  try {
    res.status(200).send({ origin: config.SERVER, playload: "PUT" });
  } catch (error) {
    res.status(500).send({ status: "Error", playload: error.message });
  }
});
router.delete("/", async (req, res) => {
  try {
    res.status(200).send({ origin: config.SERVER, playload: "DELETE" });
  } catch (error) {
    res.status(500).send({ status: "Error", playload: error.message });
  }
});

export default router;
