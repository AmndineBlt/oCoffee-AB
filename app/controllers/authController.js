import bcrypt from "bcryptjs";
import dataMapper from "../dataMapper.js";

const authController = {
  renderLoginPage(req, res) {
    res.render("login", { error: null });
  },

  async login(req, res) {
    //console.log("Requête reçue :", req.body);
    const { username, password } = req.body;

    try {
      const admin = await dataMapper.getAdminByUsername(username);
      if (!admin) {
        return res.render("login", { error: "Nom d'utilisateur ou mot de passe incorrect." });
      }

      // Vérifier le mot de passe
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.render("login", { error: "Nom d'utilisateur ou mot de passe incorrect." });
      }

      // Stocker l'admin en session
      req.session.admin = { id: admin.id, username: admin.username };

      res.redirect("/admin");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      res.status(500).send("Erreur interne.");
    }
  },

  logout(req, res) {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  }
};

export default authController;
