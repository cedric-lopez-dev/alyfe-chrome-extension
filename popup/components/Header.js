export const Header = (user) => {
    const section = document.createElement('div');
    section.className = 'header';

    const title = document.createElement('h1');
    title.innerText = "Alyfe LeadGen";

    const headerTop = document.createElement('div');
    headerTop.className = 'headerTop';
    headerTop.append(title);
    section.appendChild(headerTop);

    if (user) {
        const userName = document.createElement('div');
        userName.innerText = `Bonjour ${user.firstname} ${user.lastname} !`;
        section.appendChild(userName);
        if (user.picture) {
            const avatar = document.createElement('img');
            avatar.src = user.picture;
            avatar.alt = 'User Avatar';
            avatar.className = 'avatar';
            headerTop.appendChild(avatar);
        }
    }

    return section;
}
