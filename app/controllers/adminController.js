import dataMapper from "../dataMapper.js";

const adminController = {
  // Afficher la page admin
  async renderAdminPage(req, res) {
    const success = req.query.success;
    const coffees = await dataMapper.getAllCoffees();
    res.render("admin", { success, coffees });
  },

  // Ajouter un café
  async addCoffee(req, res) {
    try {
      const { name, description, reference, origin, price_per_kg, main_characteristic, available } = req.body;
      const image = req.file ? req.file.filename : "reference.png"; // Gère le cas sans image

      await dataMapper.addCoffee({
        name,
        description,
        reference,
        origin,
        price_per_kg: parseFloat(price_per_kg),
        main_characteristic,
        available: available === "on", // Convertit "on" en `true`
        image,
      });

      res.redirect("/admin?success=true"); // Redirige vers admin avec message de succès
    } catch (error) {
      console.error("Erreur dans addCoffee :", error);
      res.status(500).render("errors/500");
    }
  },
    
  // Supprimer un café
  async deleteCoffee(req, res) {
    try {
      await dataMapper.deleteCoffee(req.params.id);

      res.redirect("/admin?success=true");      
    } catch (error) {
      console.error("Erreur dans deleteCoffee :", error);
      res.status(500).render("errors/500");    
    }
  },

  // Afficher la page de modification d'un café
  async renderEditPage(req, res) {
    try {
      const coffee = await dataMapper.getEditCoffeeById(req.params.id);
      res.render("edit", { coffee });
    } catch (error) {
      console.error("Erreur dans renderEditPage :", error);
      res.status(500).render("errors/500");   
    }
  },

  // Mettre à jour un café
  async updateCoffee(req, res) {
    try {
      const { name, description, reference, origin, price_per_kg, main_characteristic, available } = req.body;
      const image = req.file ? req.file.filename : req.body.existingImage;

      await dataMapper.updateCoffee(req.params.id, {
        name,
        description,
        reference,
        origin,
        price_per_kg: parseFloat(price_per_kg),
        main_characteristic,
        available: available === "on",
        image,
      });

      res.redirect("/admin?success=true");
    } catch (error) {
      console.error("Erreur dans updateCoffee :", error);
      res.status(500).render("errors/500");   
    }
  }
};

export default adminController;
