import client from "./client.js";

const dataMapper = {
  async getAllCoffees() {
    const result = await client.query(`SELECT * FROM "coffees"`);
    
    //console.log(result.rows);
    return result.rows;
  },

  async getOneCoffee(coffeeId) {
    const result = await client.query(`SELECT * FROM "coffees" WHERE "id" = $1`, [`${coffeeId}`]);
    
    //console.log(result.rows[0]);
    return result.rows[0];
  },

  // Récupère trois cafés aléatoirement
  async getRandomCoffees(limit) {
    const result = await client.query(
      `SELECT * FROM "coffees" ORDER BY RANDOM() LIMIT $1`,
      [`${limit}`]
    );
    return result.rows;
  },

  // Récupérer les caffés ajouter au panier
  async getCoffeeByIds(cart) {
    if (cart.length === 0) return [];

    // Récupérer uniquement les IDs des cafés stockés en session
    const coffeeIds = cart.map(item => item.id);

    const result = await client.query(
        `SELECT * FROM "coffees" WHERE "id" = ANY($1::int[])`,
        [coffeeIds]
    );

    return result.rows.map(coffee => {
        const cartItem = cart.find(item => item.id === coffee.id);
        return { ...coffee, quantity: cartItem ? cartItem.quantity : 1 };
      });

  },
  
  // On veut les cafés dont le nom contient la valeur dans la barre de recherche
  async getSearchName(name) {
    const result = await client.query(`SELECT * FROM "coffees" WHERE name ILIKE $1`,
      [`%${name}%`]);

    //console.log(result.rows);
    return result.rows;
  },
  
  async getSearchCategorie(categorie) {
    const result = await client.query(`SELECT * FROM "coffees" WHERE "main_characteristic" = $1`, [
      `${categorie}`,
    ]);

    //console.log(result.rows);
    return result.rows;
  },
  
  // Ajouter un café
  async addCoffee(coffee) {
    const result = await client.query(`
        INSERT INTO "coffees" (name, description, reference, origin, price_per_kg, main_characteristic, available, image)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;`, [coffee.name, coffee.description, coffee.reference, coffee.origin, coffee.price_per_kg, coffee.main_characteristic, coffee.available, coffee.image]);

    return result.rows[0]; // Retourne l'élément inséré
  },

  // Supprimer un café
  async deleteCoffee(id) {
    await client.query(`DELETE FROM "coffees" WHERE id = $1`, [id]);
  },

  async getEditCoffeeById(id) {
    const result = await client.query(`SELECT * FROM "coffees" WHERE id = $1`, [id]);
    return result.rows[0];
  },

  // Mettre à jour un café
  async updateCoffee(id, coffee) {
    const query = `UPDATE "coffees" SET name = $1, description = $2, reference = $3, origin = $4, price_per_kg = $5, main_characteristic = $6, available = $7, image = $8 WHERE id = $9`;

    const values = [
        coffee.name,
        coffee.description,
        coffee.reference,
        coffee.origin,
        coffee.price_per_kg,
        coffee.main_characteristic,
        coffee.available,
        coffee.image,
        id
    ];

    await client.query(query, values);
  },

  async getAdminByUsername(username) {
    const result = await client.query(`SELECT * FROM "admin" WHERE username = $1`, [username]);
    return result.rows[0]; // Retourne l'admin ou undefined
  }
}

export default dataMapper;