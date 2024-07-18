import { css } from "../services/css";
import { createElement, Clipboard, Phone } from 'lucide';
import { displayTag } from "./Tag";
import { Modal } from "./Modal";
import { Note } from "./Note";
const styles = {
    alyfeProfileContainer: {
        backgroundColor: "#fafafa",
        padding: "10px",
    },
    title: {
        borderLeft: "5px solid #ce0120",
        paddingLeft: "10px",
        marginBottom: "10px",
        fontSize: "24px",
        fontWeight: "bold"
    },
    fullname: {
        borderLeft: "5px solid #ce0120",
        paddingLeft: "10px",
        marginBottom: "10px",
        fontSize: "16px",
        fontWeight: "bold"
    },
    phoneContainer: {
        display: "flex",
        gap: "4px"
    },

    phone: {
        marginBottom: "10px",
        fontSize: "14px",
        fontWeight: "bold"
    },
    tagsContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: "4px"

    },
    noteButtonContainer: {
        position: "relative",
        display: "inline-block"
    },
    noteIcon: {
        cursor: "pointer"

    },
    noteNumber: {
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: "translate(-50%,-50%)"
    },
    number: {
        margin: "0",
        cursor: "pointer"
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
}


export const displayTags = (tags, tagsContainer) => {
    if (tags)
        tags.forEach((tag) => {
            displayTag(tag, tagsContainer)
        })
}


export const AlyfeProfile = (alyfeProfile) => {
    const alyfeProfileContainer = document.createElement('div')
    alyfeProfileContainer.classList.add('leadGen');
    css(alyfeProfileContainer, styles.alyfeProfileContainer)

    if (alyfeProfile.fullname) {
        const fullname = document.createElement('p');
        fullname.innerText = alyfeProfile.fullname
        css(fullname, styles.fullname)
        alyfeProfileContainer.appendChild(fullname)
    }

    if (alyfeProfile.phone) {
        const phoneContainer = document.createElement('div');
        css(phoneContainer, styles.phoneContainer)
        const phoneIcon = createElement(Phone);
        const phone = document.createElement('p');
        phone.innerText = alyfeProfile.phone
        css(phone, styles.phone)
        phoneContainer.append(phoneIcon, phone)
        alyfeProfileContainer.appendChild(phoneContainer)
    }

    if (alyfeProfile.history) {
        const tagsContainer = document.createElement('div');
        css(tagsContainer, styles.tagsContainer)
        displayTags(alyfeProfile.history, tagsContainer)
        alyfeProfileContainer.appendChild(tagsContainer)
    }

    //if (alyfeProfile?.notes.length) {
    if (alyfeProfile?.note) {
        const noteButtonContainer = document.createElement('div');
        css(noteButtonContainer, styles.noteButtonContainer)
        const noteIcon = createElement(Clipboard);
        css(noteIcon, styles.noteIcon)
        // const noteNumber = document.createElement('div');
        // const number = document.createElement('p');
        // number.innerText = alyfeProfile.notes.length
        // noteNumber.appendChild(number)
        // css(noteNumber, styles.noteNumber)
        // css(number, styles.number)
        // noteButtonContainer.append(noteIcon, noteNumber)
        noteButtonContainer.append(noteIcon)

        noteButtonContainer.addEventListener('click', () => {
            const contentModale = document.createElement('div')
            css(contentModale, styles.contentModale)
            const modaleTitle = document.createElement('p')
            modaleTitle.innerText = `Note : ${alyfeProfile?.fullname}`
            css(modaleTitle, styles.modaleTitle)
            contentModale.append(modaleTitle)

            // alyfeProfile.notes.forEach((note) => {
            //     contentModale.append(Note(note))
            // })
            contentModale.append(Note(alyfeProfile.note))
            const body = document.querySelector('body')

            const { displayModal } = Modal(body, contentModale)
            displayModal()
        })
        alyfeProfileContainer.appendChild(noteButtonContainer)
    }
    return alyfeProfileContainer
}