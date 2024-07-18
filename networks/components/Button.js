import { css } from "../services/css";

const styles = {

    button: {
        backgroundColor: "hsl(185, 100%, 32.7%)",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "6px 12px",
        gap: "4px",

    },
    buttonText: {
        color: "white",
        cursor: "pointer",
        fontSize: "12px",
        fontWeight: "bold",
        margin: "0px"
    }
}


export const Button = (icon, text, callback) => {
    const button = document.createElement('div')
    css(button, styles.button)
    css(icon, styles.icon)
    const buttonText = document.createElement('p')
    buttonText.innerText = text
    css(buttonText, styles.buttonText)

    button.append(icon, buttonText)
    button.addEventListener('click', callback)

    return button
}