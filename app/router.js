import express from "express";
import { upload } from "./controllers/multerConfig.js"; // Import de la config multer

import mainController from "./controllers/mainController.js";
import catalogController from "./controllers/catalogController.js";
import articleController from "./controllers/articleController.js";
import cartController from "./controllers/cartController.js";
import searchController from "./controllers/searchController.js";
import contactController from "./controllers/contactController.js";
import adminController from "./controllers/adminController.js";
import authController from "./controllers/authController.js";

const router = express.Router();

// Page d'accueil
router.get("/", mainController.renderHomePage);
// Page du catalogue
router.get("/catalog", catalogController.renderCatalogPage);
// Page article
router.get("/article/:id", articleController.renderArticlePage);
// Panier
router.get("/cart", cartController.renderCartPage);
router.get("/cart/add/:id", cartController.addToCart);
router.get("/cart/remove/:id", cartController.removeFromCart);
router.get("/cart/clear", cartController.clearCart);
// Page de recherche
router.get("/search/name", searchController.renderSearchPageByName);
router.get("/search/categorie", searchController.renderSearchPageByCategorie);
// Page de contact
router.get("/contact", contactController.renderContactPage);

// Page de connexion
router.get("/login", authController.renderLoginPage);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// Page administration
function checkAdminAuth(req, res, next) {
  if (!req.session.admin) {
    return res.redirect("/login");
  }
  next();
}
// Afficher la page admin
router.get("/admin", checkAdminAuth, adminController.renderAdminPage);
// Ajouter un café (avec image)
router.post("/admin/add", upload.single("image"), adminController.addCoffee);
// Suupprimer un café
router.get("/admin/delete/:id", adminController.deleteCoffee); 
// Modifier un café
router.get("/admin/edit/:id", adminController.renderEditPage);
router.post("/admin/edit/:id", upload.single("image"), adminController.updateCoffee);


// Page 404
router.use((req, res) => {
    res.status(404).render("errors/404")
})

export default router;