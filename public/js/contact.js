// Initialisation d'EmailJS
(function(){
  const publicKey = "10nEgbl6RMh05UNJL";  // Remplace ça par ta clé publique
  emailjs.init(publicKey);
  //console.log("Clé publique utilisée :", publicKey);
})();

// Écouteur d'événement sur le formulaire
document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();  // Empêche le rechargement de la page

  sendMail();
});

function sendMail() {
  const btn = document.getElementById("send-button");
  const statusMessage = document.getElementById("status-message");

  btn.disabled = true; // Désactiver le bouton pendant l'envoi

  const params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  // Envoi du mail à l’admin
  emailjs.send('service_s9vypud', 'template_9mtlmvw', params)
    .then(function(response) {
      console.log('Admin Email SUCCESS', response.status);

      // Envoi du mail de confirmation au client
      return emailjs.send('service_s9vypud', 'template_ftnmokd', params);
    })
    .then(function(response) {
      console.log('Client Email SUCCESS', response.status);
      statusMessage.innerText = "✅ Message envoyé avec succès !";
      statusMessage.style.color = "green";

      document.getElementById("contact-form").reset();  // Réinitialise le formulaire
      btn.disabled = false;
    })
    .catch(function(error) {
      console.log('FAILED', error);
      statusMessage.innerText = "❌ Une erreur est survenue. Veuillez réessayer plus tard.";
      statusMessage.style.color = "red";

      btn.disabled = false;
    });
}
