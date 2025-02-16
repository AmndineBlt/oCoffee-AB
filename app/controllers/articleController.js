import dataMapper from "../dataMapper.js";

const articleController = {
    async renderArticlePage(req, res) {
      try {
        const coffeeId = req.params.id;
        //console.log(`ID du café demandé : ${coffeeId}`);
        
        const coffee = await dataMapper.getOneCoffee(coffeeId);
        //console.log(`Données du café : : ${coffee}`);

        res.render("article", { coffee });

      } catch (error) {
        console.error("Erreur dans renderArticlePage :", error);
        res.status(500).render("errors/500");
      }
    }
};

export default articleController;