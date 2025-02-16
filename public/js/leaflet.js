// Création de la carte
const map = L.map('map').setView([48.8566, 2.3522], 13);  // Coordonnées de Paris et un zoom de 13

// Ajouter un fond de carte (tile layer)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Ajouter un marqueur à la carte
L.marker([48.8566, 2.3522]).addTo(map)
    .bindPopup('Bienvenue à Paris !')
    .openPopup();