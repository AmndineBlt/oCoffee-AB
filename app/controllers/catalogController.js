import dataMapper from "../dataMapper.js";

const catalogController = {
    async renderCatalogPage(req, res) {
      try {
        const coffees = await dataMapper.getAllCoffees();

        // Regrouper les cafés par `main_characteristic`
        const groupedCoffees = {};
        coffees.forEach((coffee) => {
            if (!groupedCoffees[coffee.main_characteristic]) {
                groupedCoffees[coffee.main_characteristic] = [];
            }
            groupedCoffees[coffee.main_characteristic].push(coffee);
        });

        res.render("catalog", { groupedCoffees });

      } catch (error) {
        console.error("Erreur dans renderCatalogPage :", error);
        res.status(500).render("errors/500");
      }
    }
};

export default catalogController;
