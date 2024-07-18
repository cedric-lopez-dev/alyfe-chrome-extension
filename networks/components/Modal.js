import { css } from "../services/css"

const styles = {
    overlay: {
        width: "100vw",
        height: "100vh",
        backgroundColor: "#00000080",
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "2000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    modal: {
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "16px",
        width: "50vw",
        maxHeight: "80vh",
        overflowY: "auto",
        maxWidth: "800px"
    },
}

export const Modal = (container, content) => {

    const overlay = document.createElement('div')

    const overlayClickHandler = (event) => {
        if (event.target === overlay) {
            closeModal();
        }
    };
    const displayModal = () => {
        overlay.innerHTML = ""
        css(overlay, styles.overlay)
        overlay.addEventListener('mousedown', overlayClickHandler);
        const modal = document.createElement('div')
        css(modal, styles.modal)
        modal.append(content)
        overlay.append(modal)
        container.append(overlay)
    }

    const closeModal = (callback) => {
        if (callback)
            callback()
        container.removeChild(overlay);
    };

    return {
        closeModal, displayModal
    };
}



