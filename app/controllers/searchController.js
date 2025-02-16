import dataMapper from "../dataMapper.js";

const searchController = {
  async renderSearchPageByName(req, res) {
    try {
      const name = req.query.search;
      //console.log(typeof name);
      console.log(name);

      const message = req.session.message; // Récupérer le message
      req.session.message = null; // Réinitialiser après affichage
      
      const nameCoffees = await dataMapper.getSearchName(name);

      if (nameCoffees.length === 0) {
        req.session.message = "Aucun café n'a été trouvé";
      }

      res.render("nameSearch", { nameCoffees, message });
    } catch (error) {
      console.error("Erreur dans renderSearchPageByName :", error);
      res.status(500).render("errors/500");
    }
  },

  async renderSearchPageByCategorie(req, res) {
    try {
      const categorie = req.query.characteristic;
      //console.log(typeof element);
      
      const categorieCoffees = await dataMapper.getSearchCategorie(categorie);

      res.render("categorieSearch", { categorieCoffees });
    } catch (error) {
      console.error("Erreur dans renderSearchPageByCategorie :", error);
      res.status(500).render("errors/500");
    }
  },

};

export default searchController;
