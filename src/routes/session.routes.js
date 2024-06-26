import { Router } from "express";
import config from "../config.js";
import { isValidPass } from "../utils.js";
import userManager from "../dao/usersManagaerMdb.js";

const router = Router();
const manager = new userManager();

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

    const findUser = await manager.getUser({ email: email });

    findUser && isValidPass(password, findUser.password)
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
router.get("/current", async (req, res) => {
  try {
    res.status(200).send({ origin: config.SERVER, playload: "DELETE" });
  } catch (error) {
    res.status(500).send({ status: "Error", playload: error.message });
  }
});


export default router;
