import { Loader } from "../components/Loader";
import { Screen } from "../components/Screen";
import { navigate } from "../popup";
import { checkToken, login } from "../services/authService";
import { storageSet } from "../services/storageService";
import { Home } from "./Home";


const Form = async () => {
    const form = document.createElement('div')
    form.classList.add('container');

    const email = document.createElement('input');
    email.type = 'email';
    email.placeholder = 'Email';

    const password = document.createElement('input');
    password.type = 'password';
    password.placeholder = 'Password';

    const button = document.createElement('button');
    button.innerText = 'Connexion';

    form.appendChild(email);
    form.appendChild(password);
    form.appendChild(button);

    button.addEventListener('click', async () => {
        content.innerHTML = ""
        content.appendChild(Loader())
        const response = await login(email.value, password.value)

        if (response) {
            storageSet('alyfe_token', response.token)
            storageSet('alyfe_refreshToken', response.refreshToken)
            const user = await checkToken(response.token)
            navigate(await Home(user))
        }

        else {
            content.innerHTML = ""
            content.appendChild(await Form())
        }
    });
    return form
}

const content = document.createElement('div')


export const Connexion = async () => {
    content.innerHTML = ""
    const form = await Form()
    content.appendChild(form)
    const screen = Screen();
    screen.appendChild(content)
    return screen;
}