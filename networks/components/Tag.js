import { css } from "../services/css"

const styles = {
    tag: {
        backgroundColor: "#ce0120",
        color: "#ffffff",
        borderRadius: "4px",
        display: "inline-block",
        padding: "4px 8px",
        fontSize: "12px",
        fontWeight: "bold"
    },
}
export const displayTag = (tag, tagsContainer) => {


    const getText = tagText(tag)
    if (getText) {
        const tagContainer = document.createElement('div')
        const text = document.createElement('p')
        text.innerText = getText
        css(text, styles.tag)
        tagContainer.append(text)
        tagsContainer.append(tagContainer)
    }

}

const tagText = (tag) => {
    const date = new Date(tag?.createdAt).toLocaleDateString()
    switch (tag.type) {
        case "SmsSent":
            return `SMS envoyé le ${date}`
        case "form":
            return `Formulaire rempli le ${date}`
        case "call":
            return `Appelé le ${date}`
        default:
            return false
    }
}