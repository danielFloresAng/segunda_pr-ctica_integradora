import passport from "passport";
import local from "passport-local";
import { createHash, isValidPass } from "../utils.js";
import userModel from "../dao/models/users.models.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { firstName, lastName, email, role } = req.body;

        try {
          let user = await userModel.findOne({ email: username });
          if (user) {
            res.send({ message: "El usuario ya existe" });
            return done(null, false);
          }
          const newUser = {
            firstName,
            lastName,
            email,
            role,
            password: createHash(password),
          };

          let result = await userModel.create(newUser);
          return done(null, result);
        } catch (error) {
          return done(`Error al obtener el usuario "${+error}"`);
        }
      }
    )
  );
};

passport.use(
  "login",
  new LocalStrategy(
    { usernameField: "email" },
    async (username, password, done) => {
      try {
        const user = await userModel.findOne({ email: username });
        if (!user) {
          console.log(`El usuario ${username} no existe`);
          return done(null, false);
        }
        if (!isValidPass(user, password)) return done(null, false);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  {
    done(null, user._id);
  }
});
passport.deserializeUser(async (id, done) => {
  let user = await userModel.findById(id);
  done(null, user);
});

export default initializePassport;
