import { Loader } from "./components/Loader";
import { Connexion } from "./pages/Connexion";
import { Home } from "./pages/Home";
import { checkToken } from "./services/authService";
import { storageGet } from "./services/storageService";

const app = document.getElementById("app")

const checkIfLogged = async () => {
    const token = await storageGet('alyfe_token')
    if (token)
        return await checkToken(token)
    return false

}
export const navigate = (screen) => {
    app.innerHTML = ""
    app.append(screen)

}
const init = async () => {

    app.append(Loader())
    const user = await checkIfLogged()

    if (user?.id) {
        navigate(await Home(user))

    }

    else {
        navigate(await Connexion())
    }
}


init()

