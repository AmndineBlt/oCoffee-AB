import "dotenv/config";
import path from "node:path";
import express from "express";
import router from "./app/router.js";
//import pour les sessions
import session from 'express-session';
import pg from "pg";

const app = express();
app.set("trust proxy", 1);

app.set('view engine', 'ejs');
app.set('views', path.join(import.meta.dirname, "app/views"));

app.use(express.static(path.join(import.meta.dirname, "/public")));

app.use(express.urlencoded({ extended: true })); // Permet à Express de lire `req.body`
app.use(express.json()); // Optionnel, mais utile si des requêtes JSON sont utilisées

// Middleware de session (avant le retour)
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  cookie: {
    secure: process.env.NODE_ENV === "production", // en HTTP
    maxAge: 1 * 60 * 60 * 1000 // 1h en milliseconds
  }
})); // ce middleware permet d'accéder à un req.session par utilisateur !

// Rendre accessible dans toutes les vues
app.use((req, res, next) => {
  res.locals.session = req.session; // Permet d'accéder à `session` dans EJS
  next();
});

// Middleware pour observer la session
app.use((req, res, next) => {
  if (! req.session.coffeeIds) {
    req.session.coffeeIds = []; // On initialise un tableau vide pour contenir les infos
  }
  // Observer la session
  //console.log(req.session);
  next();
});

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
