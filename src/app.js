import express from "express";
import handelbars from "express-handlebars";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";

import config from "./config.js";
import socketInit from "./sockets.js";
import productsRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import viewsRouter from "./routes/views.routes.js";
import userIndexRouter from "./routes/user.routes.js";
import cookiesRouter from "./routes/cookies.routes.js";
import sessionsRouter from './routes/session.routes.js'
import authsRouter from './routes/auth.routes.js'
import initializePassport from "./config/passport.config.js";

const app = express();

const httpInstance = app.listen(config.PORT, async () => {
  await mongoose.connect(config.MONGODB_URI);
});
console.log(
  `Servidor funcionando en puerto ${config.PORT} conectada a ${config.SERVER}`
);

const socketServer = socketInit(httpInstance);

app.set("socketServer", socketServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.SECRET));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.MONGODB_URI,
      ttl: 15,
    }),
    secret: config.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine("handlebars", handelbars.engine());
app.set("views", `${config.DIRNAME}/views`);
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/users", userIndexRouter);
app.use("/api/cookies", cookiesRouter);
app.use('/api/sessions', sessionsRouter)
app.use('/api/auth', authsRouter)
app.use("/static", express.static(`${config.DIRNAME}/public`));
