import { Button } from "../components/Button"
import { Modal } from "../components/Modal"
import { css } from "../services/css"
import { createAlyfeProfile, getOneAlyfeProfile } from "../services/profileService"
import { getDisplayedLists } from "./FranceTravail"
import { franceTravailNormalizer } from "./services/franceTravailProfile"


export const MultipleSend = (render) => {


    let smsSended = 0;
    const rapport = { cvCount: 0, noPhone: 0, inCvTheque: 0, sms: 0 }

    const handleBobyChange = async (value, mutationsList, observer) => {

        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // Vérifiez chaque noeud ajouté
                mutation.addedNodes.forEach(async node => {
                    if (node instanceof HTMLElement && node.classList.contains('modal-body')) {
                        const profil = document.querySelector('#zoneAfficherDetailProfil')
                        const modalHeader = profil.querySelector('.modal-header')
                        const nextButton = modalHeader.querySelector('.next')
                        const isDisabled = nextButton.hasAttribute('disabled');
                        const close = modalHeader.querySelector('.modal-details-close')
                        const buttonContainer = document.getElementById('zoneTelephones')

                        rapport.cvCount++
                        if (!buttonContainer) {
                            rapport.noPhone++
                            setTimeout(() => {
                                if (isDisabled) {

                                    render()
                                    close.click()
                                    displayRapport(rapport)
                                }
                                nextButton.click()
                            }, "50");
                        }
                    }
                    // Vérifiez si le numéro de téléphone est visible
                    if (node instanceof HTMLElement && node.id === 'description-aside-phone') {
                        const container = document.querySelector('.description-aside')
                        const profilContainer = document.querySelector('#zoneAfficherDetailProfil')
                        const modalHeader = profilContainer.querySelector('.modal-header')
                        const nextButton = modalHeader.querySelector('.next')
                        const isDisabled = nextButton.hasAttribute('disabled');
                        const close = modalHeader.querySelector('.modal-details-close')
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
                        const isAlyfeProfile = await getOneAlyfeProfile(normalizedProfile.networkIdContext)

                        if (isAlyfeProfile || !normalizedProfile.phone) {
                            if (isAlyfeProfile)
                                rapport.inCvTheque++
                            if (!normalizedProfile.phone)
                                rapport.noPhone++
                            setTimeout(() => {
                                if (isDisabled) {

                                    render()
                                    close.click()
                                    displayRapport(rapport)

                                }
                                nextButton.click()
                            }, "50");

                        }

                        else {
                            createAlyfeProfile(normalizedProfile).then((res) => {
                                if (res.id)
                                    rapport.sms++
                                setTimeout(() => {
                                    smsSended = smsSended + 1
                                    if (smsSended >= value) {
                                        render()
                                        observer.disconnect();
                                        smsSended = 0
                                        close.click()
                                        displayRapport(rapport)
                                        return;
                                    }
                                    if (isDisabled) {
                                        render()
                                        close.click()
                                        displayRapport(rapport)
                                    }
                                    nextButton.click()
                                }, "50");
                            })

                        }
                    }
                });
            }
        }

    };
    const displayRapport = (rapport) => {
        const body = document.querySelector('body')
        const container = document.createElement('div')

        const title = document.createElement('p')
        title.innerText = "Envois terminés :"
        css(title, styles.title)

        const cvCount = document.createElement('p')
        cvCount.innerText = `Cv parcourus : ${rapport.cvCount}`

        const sms = document.createElement('p')
        sms.innerText = `sms envoyés : ${rapport.sms}`

        const noPhone = document.createElement('p')
        noPhone.innerText = `Cv sans numéro ou numéro valide : ${rapport.noPhone}`

        const inCvTheque = document.createElement('p')
        inCvTheque.innerText = `Cv déjà présents dans votre cvThèque : ${rapport.inCvTheque}`

        container.append(title, cvCount, sms, noPhone, inCvTheque)

        const { displayModal } = Modal(body, container)
        displayModal()
    }


    const observeTel = (value) => {
        const targetNode = document.body;
        const observerOptions = {
            childList: true,
            subtree: true,
        };
        const createObserverCallback = (value) => {
            return (mutationsList, observer) => handleBobyChange(value, mutationsList, observer);
        };
        const bodyObserver = new MutationObserver(createObserverCallback(value));
        bodyObserver.observe(targetNode, observerOptions);
    }


    const handleSend = async (input) => {
        observeTel(input.value)
        const displayedLists = getDisplayedLists()
        if (displayedLists.length) {
            const firstList = Array.from(displayedLists)[0].querySelectorAll('li[data-num-profil]')
            const fistElement = Array.from(firstList)[0]
            const button = fistElement.querySelector('button')
            button.click()
        }

    }


    const panel = document.querySelector('.panel-top')
    const alyfePanel = document.createElement('div')
    const title = document.createElement('p')
    title.innerText = "Alyfe Leadgen"
    css(title, styles.title)

    const subtitle = document.createElement('p')
    subtitle.innerText = "Envoi multiple de sms"

    const label = document.createElement('p')
    label.innerText = "Nb sms à envoyer :"

    const numberInput = document.createElement('input')
    numberInput.value = 20
    css(numberInput, styles.numberInput)

    const sendButton = Button('', 'Lancer', () => handleSend(numberInput))

    alyfePanel.append(title, subtitle, label, numberInput, sendButton)
    panel.appendChild(alyfePanel)
}

const styles = {

    title: {
        borderLeft: "5px solid #ce0120",
        paddingLeft: "10px",
        marginBottom: "10px",
        fontSize: "24px",
        fontWeight: "bold"
    },
    numberInput: {
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
        width: "40px"
    }

}