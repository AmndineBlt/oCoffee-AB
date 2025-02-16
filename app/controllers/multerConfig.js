import multer from "multer";
import path from "path";

// Configuration de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets/images/"); // Enregistre les fichiers dans `public/assets/images/`
    },
    filename: function (req, file, cb) {
        // Vérifier si la référence est fournie
        if (!req.body.reference) {
            return cb(new Error("La référence du café est requise !"));
        }

        const reference = req.body.reference.replace(/\s+/g, "_"); // Remplace les espaces par "_"
        const ext = path.extname(file.originalname); // Récupère l'extension (.png, .jpg, etc.)
        cb(null, `${reference}${ext}`); // Définit le nom du fichier comme `reference.png`
    }
});

// Création d'une instance de Multer avec la configuration
const upload = multer({ storage: storage });

export { upload };
