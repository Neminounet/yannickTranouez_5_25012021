const urlParams = new URLSearchParams(window.location.search);
const urlID = urlParams.get("id");
let url = `http://localhost:3000/api/teddies/${urlID}`;
let itemPres = document.querySelector("#itemPres");
let myPres = "";
let myColor = "";
let formatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });


fetch(url, {method : "GET"})
.then(data => {
    return data.json()
}).then(entries => {
    console.log(entries);
    entries.colors.forEach(entrie => {
        myColor += `<option value="${entrie}">${entrie}</option>`
        
    });
  console.log(myColor);
    myPres = `<img src="${entries.imageUrl}" class="card-img-top w-75 mx-auto mt-3 rounded" alt="image du Nounours Beau Gosse">
    <div class="card-body">
        <h4 class="card-title">${entries.name}</h4>
        <p class="card-text w-75 mx-auto">${entries.description}</p>
        <div class="card-header">
            <select class="form-select form-select-sm w-50 m-auto" id="select">
            <option>Couleurs</option>
                ${myColor}
            </select>
            <h5>${formatter.format(entries.price / 100)}</h5>
        </div>
        <div class="card-footer">
            <a class="btn btn-secondary" id="ajoutPanier">Ajouter au panier <i class="fas fa-shopping-cart"></i></a>
        </div>
    </div>`;
    itemPres.innerHTML = myPres;

    //  Le panier

    //  Cibler le bouton du panier
    const btn_ajoutPanier = document.querySelector("#ajoutPanier");
    
    // Ecouter le bouton du panier
    btn_ajoutPanier.addEventListener("click", ()=>{

        //  Récupération de la couleur du Nounours 

        let select = document.querySelector("#select");
        let value = select.options[select.selectedIndex].value;
       
        // Récupération des données du produit dans un objet 
        let optionsProduit = {
            id: entries._id,
            name: entries.name,
            description: entries.description,
            couleur: value,
            quantité: 1,
            price: formatter.format(entries.price / 100),
            image: entries.imageUrl
        };
        console.log(optionsProduit);
    })
});

 

