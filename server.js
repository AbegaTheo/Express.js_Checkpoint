const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// Middleware pour restreindre l'accès aux heures de travail (Lundi-Vendredi, 9h-17h)
const workHoursMiddleware = (req, res, next) => {
    const now = new Date();
    const day = now.getDay(); // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
    const hour = now.getHours(); // Heure actuelle

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); // Autoriser l'accès vers la page demandée
    } else {
        res.render('restricted');
    }
};

// Appliquer le middleware à toutes les routes
/* app.use(workHoursMiddleware); */

// Configurer EJS comme moteur de rendu
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Servir les fichiers statiques (CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Routes des pages
app.get("/", (req, res) => res.render("index"));
app.get("/services", (req, res) => res.render("services"));
app.get("/contact", (req, res) => res.render("contact"));

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
