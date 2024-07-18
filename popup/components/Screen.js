import { Header } from "./Header"

export const Screen = (user) => {
    const screen = document.createElement('div')
    screen.className = 'container';
    screen.append(Header(user))
    return screen
}