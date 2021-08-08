// Récupération produits dans LocalStorage et conversion du JSON au JavaScript
let produitsLocalStorage = JSON.parse(localStorage.getItem("produits"));
console.log(produitsLocalStorage);

const listeProduitsPanier = document.querySelector("#listeProduitsPanier");
const listeRecap = document.querySelector("#listeRecap");
const prixTotal = document.querySelector("#prixTotal");
const viderPanier = document.querySelector("#viderPanier");
let formatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

// Creer une fonction pour vider le LocalStorage
viderPanier.addEventListener("click", ()=> {
    localStorage.clear();
    document.location.reload();
})
// Nous allons vérifier si le panier est vide avec une condition if / else.
// Si le panier est vide alors 
if(produitsLocalStorage === null){
    let panierVide = `<li class="list-group-item">Le panier est vide</li>`
    listeProduitsPanier.innerHTML = panierVide;
    listeRecap.innerHTML = panierVide;
    // si le panier n'est pas vide alors
} else {
    console.log("Je ne suis pas vide");
    // let produitsPanier = [];
    let produitDesc = ``;
    let produitRecap = ``;
    let total = 0;

    produitsLocalStorage.forEach(produit => {
        // produitsPanier.push(produit);
        total += parseFloat(produit.price);
        produitDesc += `<li class="list-group-item d-flex flex-column flex-lg-row align-items-center align-items-lg-start justify-content-lg-between">
        <img src="${produit.image}"  class="w-50 rounded">
        <div class="mx-4">
            <h5>${produit.name}</h5>
            <p>${produit.description}</p>
            <p>Quantité : <span class="fw-bold">${produit.quantité}</span></p>
            <p>Couleur : ${produit.couleur}</p>
            <button type="button" class="btn-close" title="Retirer cet objet du panier"></button>
        </div>
        <h5 class="align-self-center">${produit.price}</h5>
    </li>`;
        produitRecap += `<li class="card-text"><span class="fw-bold">x ${produit.quantité}</span><em> ${produit.name}</em><span class="fw-bold"> ${produit.price}</span></li>`;
    });
    totalConvert = formatter.format(total);
    prixTotal.innerHTML = totalConvert;
    listeProduitsPanier.innerHTML = produitDesc;
    listeRecap.innerHTML = produitRecap;
}