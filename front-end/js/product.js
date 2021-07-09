const urlParams = new URLSearchParams(window.location.search);
const urlID = urlParams.get("id");
let url = `http://localhost:3000/api/teddies/${urlID}`;
let itemPres = document.querySelector("#itemPres");
let myPres = "";

console.log(urlID);
console.log(url)

fetch(url, {method : "GET"})
.then(data => {
    return data.json()
}).then(entries => {
    console.log(entries)
    myPres += `<img src="${entries.imageUrl}" class="card-img-top w-75 mx-auto mt-3 rounded" alt="image du Nounours Beau Gosse">
    <div class="card-body">
        <h4 class="card-title">${entries.name}</h4>
        <p class="card-text w-75 mx-auto">${entries.description}</p>
        <div class="card-header">   
            <h5>${entries.price / 100} €</h5>
        </div>
        <div class="card-footer">
            <a class="btn btn-secondary">Ajouter au panier <i class="fas fa-shopping-cart"></i></a>
        </div>
    </div>`;
    itemPres.innerHTML = myPres;
});

//Créer une urle dynamique avec Id
///Fetch ver bonne URL
    //Affiche le produit