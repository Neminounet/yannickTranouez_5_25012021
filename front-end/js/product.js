const urlParams = new URLSearchParams(window.location.search);
const urlID = urlParams.get("id");
let url = `http://localhost:3000/api/teddies/${urlID}`;
let itemPres = document.querySelector("#itemPres");
let colorOptions = document.querySelector("#colorOptions");
let myPres = "";
let myColor = "";
let value = 1;

console.log(colorOptions);
// console.log(urlID);
// console.log(url)

fetch(url, {method : "GET"})
.then(data => {
    return data.json()
}).then(entries => {
    console.log(entries);
    entries.colors.forEach(entrie => {
        myColor += `<option value="${value ++}">${entrie}</option>`
        
    });
  console.log(myColor);
    //Tritement des donneé ici (Créer les option du selecte avec ofreeche HTML)
    //Let mesOptiuons = ''
    // entries.colors
        // messoption += <option>

    //vv Ajoutre dans le html les option dans le select sci dessous
    myPres = `<img src="${entries.imageUrl}" class="card-img-top w-75 mx-auto mt-3 rounded" alt="image du Nounours Beau Gosse">
    <div class="card-body">
        <h4 class="card-title">${entries.name}</h4>
        <p class="card-text w-75 mx-auto">${entries.description}</p>
        <div class="card-header">
            <select class="form-select form-select-sm w-50 m-auto">
            <option selected>Couleurs</option>
            <div id="colorOptions">
                ${myColor}
            </div>
            </select>  
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