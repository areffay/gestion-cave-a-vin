// Attend que le contenu de la page soit entièrement chargé
document.addEventListener('DOMContentLoaded', () => {

    // Récupère les éléments du DOM (la page HTML)
    const form = document.getElementById('add-bottle-form');
    const bottleList = document.getElementById('bottle-list');
    const nameInput = document.getElementById('bottle-name');
    const yearInput = document.getElementById('bottle-year');
    const locationInput = document.getElementById('bottle-location');

    // Charge les bouteilles depuis le localStorage ou initialise un tableau vide
    let bottles = JSON.parse(localStorage.getItem('bottles')) || [];

    // Fonction pour sauvegarder les bouteilles dans le localStorage
    const saveBottles = () => {
        localStorage.setItem('bottles', JSON.stringify(bottles));
    };

    // Fonction pour afficher les bouteilles dans la liste
    const renderBottles = () => {
        // Vide la liste actuelle pour éviter les doublons
        bottleList.innerHTML = '';

        if (bottles.length === 0) {
            bottleList.innerHTML = '<p>Aucune bouteille dans la cave pour le moment.</p>';
            return;
        }

        // Crée un élément de liste pour chaque bouteille
        bottles.forEach((bottle, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>
                    <strong>${bottle.name}</strong> (${bottle.year})
                    <em>- Emplacement : ${bottle.location}</em>
                </span>
                <button class="delete-btn" data-index="${index}">Supprimer</button>
            `;
            bottleList.appendChild(li);
        });
    };

    // Gère la soumission du formulaire pour ajouter une bouteille
    form.addEventListener('submit', (event) => {
        // Empêche la page de se recharger
        event.preventDefault();

        // Crée un nouvel objet bouteille
        const newBottle = {
            name: nameInput.value,
            year: yearInput.value,
            location: locationInput.value
        };

        // Ajoute la nouvelle bouteille au tableau
        bottles.push(newBottle);

        // Sauvegarde et affiche la mise à jour
        saveBottles();
        renderBottles();

        // Réinitialise le formulaire
        form.reset();
    });

    // Gère le clic sur le bouton "Supprimer"
    bottleList.addEventListener('click', (event) => {
        // Vérifie si le clic était bien sur un bouton de suppression
        if (event.target.classList.contains('delete-btn')) {
            const indexToDelete = parseInt(event.target.getAttribute('data-index'), 10);
            
            // Supprime la bouteille du tableau
            bottles.splice(indexToDelete, 1);

            // Sauvegarde et affiche la mise à jour
            saveBottles();
            renderBottles();
        }
    });

    // Affiche les bouteilles au chargement initial de la page
    renderBottles();
});
