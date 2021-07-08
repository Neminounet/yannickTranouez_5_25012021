console.log('ok')

const urlParams = new URLSearchParams(window.location.search);
const urlName = urlParams.get("id");

console.log(urlName);

//Créer une urle dynamique avec Id
///Fetch ver bonne URL
    //Affiche le produit