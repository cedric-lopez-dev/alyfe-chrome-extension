import { css } from "../services/css"

const styles = {
    noteContainer: {
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
        padding: "8px",
        borderLeft: "5px solid #ce0120",
        paddingLeft: "18px",
    },
    noteText: {
        margin: "0"
    },
    date: {
        fontWeight: "bold"
    }
}

export const Note = (note) => {
    const noteContainer = document.createElement('div')
    css(noteContainer, styles.noteContainer)
    // const date = document.createElement('p')
    // css(date, styles.date)
    // date.innerText = new Date(note.date).toLocaleDateString()
    const noteText = document.createElement('p')
    css(noteText, styles.noteText)
    noteText.innerText = note
    noteContainer.append(noteText)
    // noteContainer.append(date, noteText)
    return noteContainer
}