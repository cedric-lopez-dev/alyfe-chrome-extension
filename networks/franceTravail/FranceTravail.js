
import { AlyfeProfile } from "../components/AlyfeProfile";
import { AlyfeProfileAction } from "../components/AlyfeProfileAction";
import { getAlyfeProfiles, normalizeProfile } from "../services/profileService";
import { MultipleSend } from "./multipleSend";
import { franceTravailNormalizer } from "./services/franceTravailProfile";

// liste des profils visibles sur la pages
export const getDisplayedLists = () => {

  const lists = document.querySelectorAll('.result-list')
  const displayedLists = Array.from(lists).filter((list) => {
    return list.querySelectorAll('li[data-num-profil]').length
  })
  return displayedLists
}

export const FranceTravail = () => {

  const handleBobyChange = async (mutationsList, observer) => {
    const displayedLists = getDisplayedLists()

    // Vérifiez si de nouveaux profils sont sur la page
    if (currentLists.length !== displayedLists.length) {
      addAlyfeProfil(displayedLists)
      currentLists = displayedLists
    }

    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {

        // Vérifiez chaque noeud ajouté
        mutation.addedNodes.forEach(node => {

          // Vérifiez si la modale est dans le dom
          if (node instanceof HTMLElement && node.classList.contains('modal-body')) {

            // Vérifiez si le bouton du téléphone est dom 
            const buttonContainer = document.getElementById('zoneTelephones')
            if (buttonContainer) {
              const buttonPhone = buttonContainer.querySelector('button');
              buttonPhone.click();
            }

          }
          // Vérifiez si le numéro de téléphone est visible
          if (node instanceof HTMLElement && node.id === 'description-aside-phone') {
            const container = document.querySelector('.description-aside')
            // récupération du profil depuis la modale
            const getProfil = () => {
              const profil = document.querySelector('#zoneAfficherDetailProfil')
              const modalHeader = profil.querySelector('.modal-header')
              const fullNameBalise = profil.querySelector('h2')
              const fullname = fullNameBalise.querySelector('span').innerText
              const printButton = modalHeader.querySelector('[data-num-profil]')
              const phone = container.querySelector('#zoneTelephones').innerText
              const FTID = printButton.dataset.numProfil
              return { fullname, FTID, phone }
            }
            const profil = getProfil()
            const normalizedProfile = franceTravailNormalizer(profil)
            const modalContainer = document.querySelector('#PopinDetails-RecrutementCompetences')
            AlyfeProfileAction(container, normalizedProfile, modalContainer, render)
          }
        });
      }
    }

  };

  const targetNode = document.body;

  const observerOptions = {
    childList: true,
    subtree: true,
  };
  const bodyObserver = new MutationObserver(handleBobyChange);
  bodyObserver.observe(targetNode, observerOptions);

  // initialisation des profils visibles
  let currentLists = getDisplayedLists()

  const getProfilesFranceTravail = (profiles) => {

    const filteredProfiles = profiles.filter((profile) => {
      return profile.networks.some(networkItem => networkItem.name === "France Travail");
    });
    return filteredProfiles
  }

  let alyfeProfiles = []

  // ajout des informations alyfe sur les profils visibles 
  const addAlyfeProfil = (displayedLists) => {

    const alyfeProfilesFranceTravail = getProfilesFranceTravail(alyfeProfiles)
    Array.from(displayedLists).forEach((list) => {
      const arrayListElements = list.querySelectorAll('li[data-num-profil]')
      Array.from(arrayListElements).forEach((element) => {
        const alyfeProfile = alyfeProfilesFranceTravail.find((profile) => {
          return profile.networks.some(networkItem => networkItem.id === element.dataset.numProfil);
        })
        if (alyfeProfile) {
          const displayedProfile = element.querySelector('.leadGen')
          if (displayedProfile) {
            displayedProfile.remove()
          }
          element.append(AlyfeProfile(alyfeProfile))
        }
      })
    })
  }

  const render = async () => {
    alyfeProfiles = await getAlyfeProfiles()
    if (alyfeProfiles)
      addAlyfeProfil(currentLists)
  }

  MultipleSend(render)
  render()
}





