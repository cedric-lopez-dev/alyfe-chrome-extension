import { css } from "../services/css";
import { createAlyfeProfile, createAlyfeProfileSms, getOneAlyfeProfile, newEventProfile, updateAlyfeProfile } from "../services/profileService";
import { createElement, Mail, Phone, Star, ClipboardPenLine } from 'lucide';
import { Button } from "./Button";
import { displayTags } from "./AlyfeProfile";
import { Modal } from "./Modal";



export const AlyfeProfileAction = async (container, profile, modalContainer, renderList) => {

    let alyfeProfile

    const handleSendSms = () => {
        const payload = alyfeProfile || profile
        createAlyfeProfileSms(payload).then((res) => {
            render()
            renderList()
        })
    }

    const handleSendAppel = () => {
        if (alyfeProfile) {
            newEventProfile(alyfeProfile.id, { event: "call" }).then((res) => {
                render()
                renderList()
            })
        }
        else {
            createAlyfeProfile(profile).then((res) => {
                newEventProfile(res.id, { event: "call" }).then((res) => {
                    render()
                    renderList()
                })
            })
        }
    }

    const registerNote = (inputNote) => {
        if (alyfeProfile) {
            updateAlyfeProfile(alyfeProfile.id, { note: inputNote.value }).then((res) => {
                render()
                renderList()
            })
        }
        else {
            createAlyfeProfile(profile).then((res) => {
                updateAlyfeProfile(res.id, { note: inputNote.value }).then((res) => {
                    inputNote.value = "Rédiger une note...";
                    render()
                    renderList()
                })
            })
        }


    }


    const Title = () => {
        const title = document.createElement('h2');
        css(title, styles.title)
        title.innerText = "Alyfe LeadGen";
        return title

    }

    const Buttons = () => {
        const containerButtons = document.createElement('div');
        css(containerButtons, styles.containerButtons)

        const smsIcon = createElement(Mail);
        smsIcon.setAttribute('stroke', '#fff');
        const smsButton = Button(smsIcon, "envoyer sms", handleSendSms)

        const phoneIcon = createElement(Phone);
        phoneIcon.setAttribute('stroke', '#fff');
        const callButton = Button(phoneIcon, "J'ai appelé", handleSendAppel)

        containerButtons.append(smsButton, callButton)

        return containerButtons

    }


    const AddNotesButton = () => {

        const addNoteContainer = document.createElement('div')
        css(addNoteContainer, styles.addNoteContainer)

        const addNoteIcon = createElement(ClipboardPenLine);
        addNoteIcon.setAttribute('stroke', 'hsl(185, 100%, 32.7%)');

        const addNoteText = document.createElement('p')
        css(addNoteText, styles.addNoteText)
        addNoteText.innerText = alyfeProfile?.note ? "modifier note" : "ajouter une note"

        addNoteContainer.append(addNoteIcon, addNoteText)

        return addNoteContainer
    }

    const ModaleNote = (addNoteButton) => {
        const contentModale = document.createElement('div')
        css(contentModale, styles.contentModale)

        const modaleTitle = document.createElement('p')
        modaleTitle.innerText = alyfeProfile?.note ? `modifier note :` : `Ajouter une note :`
        css(modaleTitle, styles.modaleTitle)

        const inputNote = document.createElement('textarea')
        inputNote.value = alyfeProfile?.note ? alyfeProfile.note : "Rédiger une note...";
        css(inputNote, styles.inputNote)


        const { closeModal, displayModal } = Modal(modalContainer, contentModale)

        const registerNoteButtonContainer = document.createElement('div')
        css(registerNoteButtonContainer, styles.registerNoteButtonContainer)
        const registerNoteButton = Button("", "Enregistrer", () => closeModal(() => registerNote(inputNote)))
        addNoteButton.addEventListener('click', displayModal)
        registerNoteButtonContainer.append(registerNoteButton)

        contentModale.append(modaleTitle, inputNote, registerNoteButtonContainer)
        return contentModale
    }

    const DisplayAlyfeProfile = (alyfeProfile) => {
        const alyfeProfileContainer = document.createElement('div');
        css(alyfeProfileContainer, styles.alyfeProfileContainer)

        const alyfeProfileTitleContainer = document.createElement('div');
        css(alyfeProfileTitleContainer, styles.alyfeProfileTitleContainer)

        const starIcon = createElement(Star);
        starIcon.setAttribute('stroke', 'hsl(185, 100%, 32.7%)');
        starIcon.setAttribute('fill', 'hsl(185, 100%, 32.7%)');

        const AlyfeProfileTitle = document.createElement('p')
        AlyfeProfileTitle.innerText = "Profil dans votre CVthèque"
        css(AlyfeProfileTitle, styles.AlyfeProfileTitle)

        alyfeProfileTitleContainer.append(starIcon, AlyfeProfileTitle)

        const tagsContainer = document.createElement('div');
        css(tagsContainer, styles.tagsContainer)
        displayTags(alyfeProfile.history, tagsContainer)

        alyfeProfileContainer.append(alyfeProfileTitleContainer, tagsContainer)

        return alyfeProfileContainer
    }


    const alyfeProfileAction = document.createElement('div')

    const render = async () => {

        alyfeProfile = await getOneAlyfeProfile(profile.networkIdContext)
        alyfeProfileAction.innerHTML = ""

        const title = Title()
        const buttons = Buttons()
        const addNoteButton = AddNotesButton()

        alyfeProfileAction.append(title, buttons, addNoteButton)
        ModaleNote(addNoteButton)
        container.append(alyfeProfileAction)

        // Alyfe Profile
        if (alyfeProfile) {
            const displayAlyfeProfile = DisplayAlyfeProfile(alyfeProfile)
            alyfeProfileAction.append(displayAlyfeProfile)
        }
    }
    render()
}


const styles = {
    containerButtons: {
        display: "flex",
        gap: "20px"
    },
    title: {
        borderLeft: "5px solid #ce0120",
        paddingLeft: "10px",
        marginBottom: "10px",
        fontSize: "24px",
        fontWeight: "bold"
    },
    alyfeProfileContainer: {
        borderTop: "1px solid #e5e5e5",
        marginTop: "10px",
        paddingTop: "10px",

    },
    tagsContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: "4px"

    },
    AlyfeProfileTitle: {
        fontSize: "14px",
        fontWeight: "bold",
        margin: "0"
    },
    alyfeProfileTitleContainer: {
        display: "flex",
        alignItems: "center",
        gap: "4px",
        marginBottom: "10px"
    },
    addNoteContainer: {
        display: "inline-flex",
        gap: "4px",
        marginTop: "10px",
        alignItems: "center",
        cursor: "pointer"
    },
    addNoteText:
    {
        color: "hsl(185, 100%, 32.7%)",
        margin: "0",
        cursor: "pointer",
        display: "inline-block",
        textDecoration: "underline"
    },
    contentModale: {
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },
    modaleTitle: {
        fontSize: "16px",
        fontWeight: "bold"
    },
    inputNote: {
        height: "20vh",
        border: "1px solid #e5e5e5",
        borderRadius: "10px",
        padding: "10px"
    },
    registerNoteButtonContainer: {
        display: "flex",
        justifyContent: "flex-end"
    }
}