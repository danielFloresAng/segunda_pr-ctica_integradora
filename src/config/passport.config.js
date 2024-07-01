import passport from "passport";
import local from "passport-local";
import { isValidPass } from "../utils.js";

import config from "../config.js";
import userManager from "../dao/usersManagaerMdb.js";

const LocalStrategy = local.Strategy;
const manager = new userManager();

const initializePassport = () => {
  passport.use(
    "login",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        try {
          const user = await manager.getUser({ email: username });

          if (user && isValidPass(password, user.password)) {
            const { password, ...filteredUser } = user;
            return done(null, filteredUser);
          } else {
            return done(null, false);
          }
        } catch (error) {
          return done(`Error al obtener el usuario "${+error}"`, false);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

export default initializePassport;
