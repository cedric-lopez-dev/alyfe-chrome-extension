// export const Tool = () => {
//     const toolContainer = document.createElement('div');
//     toolContainer.classList.add('tool-container');
//     // Créer le conteneur du toggle switch
//     const toggleContainer = document.createElement('div');
//     toggleContainer.classList.add('toggle-container');

//     // Texte pour indiquer ce que contrôle le toggle switch
//     const controlText = document.createElement('p');
//     controlText.textContent = 'France Travail :';

//     const initialChecked = await storageGet('france_travail')

//     // Créer le bouton toggle
//     const toggleInput = document.createElement('input');
//     toggleInput.type = 'checkbox';
//     toggleInput.id = 'toggle';
//     toggleInput.classList.add('toggle-input');
//     toggleInput.checked = initialChecked;

//     // Créer le label pour le toggle switch
//     const toggleLabel = document.createElement('label');
//     toggleLabel.htmlFor = 'toggle';
//     toggleLabel.classList.add('toggle-label');

//     toggleInput.addEventListener('change', (event) => {
//         if (event.target.checked) {
//             storageSet('france_travail', true)

//         } else {
//             storageSet('france_travail', false)
//         }
//     });

//     toolContainer.appendChild(controlText); // Ajouter le texte de contrôle
//     toggleContainer.appendChild(toggleInput);
//     toggleContainer.appendChild(toggleLabel);
//     toolContainer.appendChild(toggleContainer)
//     return tool
// }