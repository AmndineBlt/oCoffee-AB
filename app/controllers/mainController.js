import dataMapper from "../dataMapper.js";

const mainController = {
    async renderHomePage(req, res) {
        try {
            // Récupérer 3 cafés aléatoires
            const coffees = await dataMapper.getRandomCoffees(3);

            res.render("homePage", { coffees });
        } catch (error) {
            console.error("Erreur dans renderHomePage :", error);
            res.status(500).render("errors/500");
        }
    }
};

export default mainController;
