let url = "http://localhost:3000/api/teddies";
let produits = document.querySelector("#produits");
let myCard = "";
let formatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

// FETCH

fetch(url, {method : "GET"})
.then(data => {
    return data.json()
}).then(products => {
    console.log(products);
    products.forEach(product => {
        console.log(product);
        myCard += `<div class="col-md-6 col-lg-4 my-2">
                        <div class="card text-center h-100">
                            <img src="${product.imageUrl}" class="card-img-top" style = "height : 50%;" alt="${product.name}">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.description}</p>
                                <div class="card-header">   
                                    <h6>${formatter.format(product.price / 100)}</h6>
                                </div>
                                <div class="card-footer">
                                    <a href="pages/product.html?id=${product._id}" class="btn btn-secondary">Voir le Produit <i class="fas fa-shopping-cart"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>`;
                });
    console.log(myCard);
    produits.innerHTML = myCard;
})