import { Screen } from "../components/Screen";
import { navigate } from "../popup";
import { storageGet, storageRemove, storageSet } from "../services/storageService";
import { getWebsite } from "../services/userService";
import { Connexion } from "./Connexion";



export const Home = async (user) => {

    const website = await getWebsite(user.email)
    const marketWebsites = website.filter((websiteMarket) => {
        return websiteMarket.website.type === "market"
    }
    )
    const screen = Screen(user);

    let selectedWebsiteMarketId = await storageGet("selectedWebsiteMarket")

    if (!selectedWebsiteMarketId) {
        selectedWebsiteMarketId = marketWebsites[0].website.id
    }

    const marketList = document.createElement('div')
    screen.appendChild(marketList)
    MarketList(marketWebsites, selectedWebsiteMarketId, marketList)

    return screen;

};

const Market = (market, content, indicator) => {

    const marketContainer = document.createElement('div')
    marketContainer.classList.add('marketContainer');

    if (indicator) {
        marketContainer.appendChild(indicator)
    }

    const marketName = document.createElement('p')
    marketName.innerText = market.name
    marketContainer.appendChild(marketName)
    if (content)
        marketContainer.appendChild(content)
    return marketContainer
}
const handleDashboard = (url) => {
    window.open(url, '_blank');
}

const handleDisconnect = async () => {
    storageRemove('selectedWebsiteMarket')
    storageRemove('alyfe_token')
    storageRemove('alyfe_refreshToken')
    navigate(await Connexion())
}

const MarketList = (marketWebsites, selectedWebsiteMarketId, marketList) => {
    let selectedWebsite = marketWebsites[0].website

    if (marketWebsites.length > 1)

        marketWebsites.forEach((websiteMarket) => {
            if (websiteMarket.website.id === selectedWebsiteMarketId) {
                const indicator = document.createElement('div')
                indicator.classList.add('indicator');
                const stateMarket = document.createElement('p')
                stateMarket.classList.add('selected');
                stateMarket.innerText = 'Selectionné'
                marketList.appendChild(Market(websiteMarket.market, stateMarket, indicator))
                selectedWebsite = websiteMarket.website
            }
            else {

                const stateMarket = document.createElement('p')
                stateMarket.classList.add('not-selected');
                stateMarket.innerText = 'Choisir'
                marketList.appendChild(Market(websiteMarket.market, stateMarket))
                stateMarket.addEventListener('click', () => choice(marketWebsites, websiteMarket.website.id, marketList))
            }
        })
    else {
        const indicator = document.createElement('div')
        indicator.classList.add('indicator');
        marketList.appendChild(Market(marketWebsites[0].market, null, indicator))
        storageSet("selectedWebsiteMarket", marketWebsites[0].website.id)
    }
    const url = `https://${selectedWebsite?.subdomain ? selectedWebsite?.subdomain + "." : ""}${selectedWebsite.domain}/dashboard?tab=cvtheque`

    const disconnectContainer = document.createElement('div')
    disconnectContainer.classList.add('disconnectContainer');
    const disconnect = document.createElement('p')
    disconnect.innerText = "Me déconnecter"
    disconnect.classList.add('disconnect');
    disconnectContainer.appendChild(disconnect)
    const buttonDashboard = document.createElement('button')
    buttonDashboard.innerText = 'Ma CVthèque'
    buttonDashboard.addEventListener('click', () => { handleDashboard(url) })
    disconnect.addEventListener('click', () => { handleDisconnect() })

    disconnectContainer.appendChild(buttonDashboard)
    disconnectContainer.appendChild(disconnect)
    marketList.appendChild(disconnectContainer)
}

const choice = (marketWebsites, websiteMarketId, marketList) => {
    storageSet("selectedWebsiteMarket", websiteMarketId)
    marketList.innerHTML = ""
    marketList = MarketList(marketWebsites, websiteMarketId, marketList)
}



