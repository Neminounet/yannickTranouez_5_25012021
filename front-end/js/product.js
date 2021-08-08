const urlParams = new URLSearchParams(window.location.search);
//  Dans le cas où nous avons nommé l'url différement exemple .html?identification=${api.id}... il faudra faire un urlParams.get("identification");
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
                ${myColor}
            </select>
            <h5>${formatter.format(entries.price / 100)}</h5>
        </div>
        <div class="card-footer">
            <a class="btn btn-secondary" id="ajoutPanier" type="submit">Ajouter au panier <i class="fas fa-shopping-cart"></i></a>
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

        //  Création d'une fonction pour confirmer la mise dans le panier du produit 
        const ajoutProduitConfirm = () => {
            if (window.confirm(`${entries.name}, couleur : ${value}, bien ajouté au panier, pour rejoindre le panier OK, pour revenir à l'accueil ANNULER `)) {
                window.location.href = "panier.html";
            } else {
                window.location.href = "../index.html";
            }
        };

        // Local Storage : Ne comprend que le langage JSON !!.
        // Pour envoyer du javascript vers JSON il faut utiliser JSON.stringify();
        // pour récupérer du JSON en JavaScript il faut utiliser JSON.parse("");
        // Pour pouvoir cumuler ou réduire des objets dans le LocalStorage il faut creér un tableau pouvant recevoir nos produits
        // Le souci c'est que si le tableau existe déjà, on ne peut pas le recréer !!!
        // Nous allons d'abord vérifier si ce tableau est vide et donc il faut passer ce tableau du JSON en Javascript.
        // Il faut utiliser POUR RECUPERER la fonction : localStorage.getItem("nomQueNousVoulonsDonnerAuTableauDansLocalStorage") ! MEME SI LE TABLEAU N'EST PAS ENCORE CREE !
        let produitsLocalStorage = JSON.parse(localStorage.getItem("produits"));
        // Donc Nous sommes obligés de créer ce tableau dans une condition if / else
        if (produitsLocalStorage) {
            // if produitsLocalStorage == true (si le tableau est déjà existant dans le localStorage alors pas besoin de créer un tableau, il suffit d'ajouter le produit)
            produitsLocalStorage.push(optionsProduit);
            localStorage.setItem("produits", JSON.stringify(produitsLocalStorage));
            ajoutProduitConfirm();
        } else {
            // S'il n'y a pas de tableau dans le LocalStorage alors il faut le créer
            produitsLocalStorage = [];
            // On ajoute dans ce tableau le produit
            produitsLocalStorage.push(optionsProduit);
            // il faut utiliser POUR ENVOYER la fonction : localStorage.setItem("nomQueNousVoulonsDonnerAuTableauDansLocalStorage") et convertir en JSON au passage
            localStorage.setItem("produits", JSON.stringify(produitsLocalStorage));
            ajoutProduitConfirm();
        }
    })   
});

 

 

