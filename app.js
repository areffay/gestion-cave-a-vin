document.addEventListener('DOMContentLoaded', () => {
    const addBottleForm = document.getElementById('add-bottle-form');
    const bottleList = document.getElementById('bottle-list');

    // Gérer l'ajout de bouteille
    addBottleForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        const name = document.getElementById('bottle-name').value;
        const location = document.getElementById('bottle-location').value;

        addBottleToUI(name, location);

        // Réinitialiser le formulaire
        addBottleForm.reset();
    });

    function addBottleToUI(name, location) {
        const li = document.createElement('li');
        
        const bottleInfo = document.createElement('span');
        bottleInfo.textContent = `${name} (Emplacement: ${location})`;
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Retirer';
        removeBtn.className = 'remove-btn';

        removeBtn.addEventListener('click', () => {
            li.remove();
        });

        li.appendChild(bottleInfo);
        li.appendChild(removeBtn);
        bottleList.appendChild(li);
    }
});
