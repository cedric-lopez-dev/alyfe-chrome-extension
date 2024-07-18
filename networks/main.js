import { FranceTravail } from "./franceTravail/FranceTravail";
import { Hellowork } from "./helloWork/Hellowork";
import { storageGet } from "./services/networksStorageServices";




const init = async () => {
    const websiteId = await storageGet('selectedWebsiteMarket')

    if (websiteId) {
        const currentURL = window.location.href;

        switch (currentURL) {
            case 'https://entreprise.francetravail.fr/recherche-profil/rechercheprofil':
                return FranceTravail()
            case 'https://www.hellowork.com/fr-fr/':
                return Hellowork()
            default:
                return
        }
    }
}
init()