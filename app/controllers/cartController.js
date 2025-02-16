import dataMapper from "../dataMapper.js";

const cartController = {
  async renderCartPage(req, res) {
    try {
      const coffeeIds = req.session.coffeeIds;
      //console.log(coffeeIds);
      //console.log(typeof coffeeIds);
  
      const coffeesCart = await dataMapper.getCoffeeByIds(coffeeIds);
  
      res.render("cart", { coffeesCart })
    } catch (error) {
      console.error("Erreur dans renderCartPage :", error);
      res.status(500).render("errors/500");
    }
  },

  // Ajouter au panier
  addToCart(req, res) {
    const coffeeIds = parseInt(req.params.id);
    //console.log(coffeeIds);
    
    // Vérifier si le panier contient déjà ce café
    const existingItem = req.session.coffeeIds.find(item => item.id === coffeeIds);

    if (existingItem) {
        existingItem.quantity++; // Augmente la quantité
    } else {
        req.session.coffeeIds.push({ id: coffeeIds, quantity: 1 }); // Ajoute un nouvel élément
    }

    res.redirect("/cart");
  },

  // Retirer du panier
  removeFromCart(req, res) {
    const coffeeIds = parseInt(req.params.id);

    // Trouver l'élément dans le panier
    const existingItem = req.session.coffeeIds.find(item => item.id === coffeeIds);

    if (existingItem) {
        existingItem.quantity--; // Diminue la quantité
        if (existingItem.quantity <= 0) {
            // Supprime l'élément s'il n'y en a plus
            req.session.coffeeIds = req.session.coffeeIds.filter(item => item.id !== coffeeIds);
        }
    }

    res.redirect("/cart");
  },

  // Vider entièrement le panier
  clearCart(req, res) {
    req.session.coffeeIds = [];
    res.redirect("/cart");
  },
};

export default cartController;