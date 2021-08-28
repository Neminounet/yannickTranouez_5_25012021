const orderIdLocalStorage = JSON.parse(localStorage.getItem("OrderID"));
const prixTotalLocalStorage = JSON.parse(localStorage.getItem("Prix Total"));
const orderIdSelect = document.querySelector("#orderId");
const prixTotalSelect = document.querySelector("#prixTotal");

const orderConfirm = ()=>{
    orderIdSelect.textContent = orderIdLocalStorage;
    prixTotalSelect.textContent = prixTotalLocalStorage;
}

orderConfirm();

// Création d'un bouton pour retourner vers l'accueil du site et reset le localStorage !

let btnReset = document.querySelector(".btnReset");
btnReset.addEventListener("click", ()=> {
    window.location.href = "../index.html";
    localStorage.clear();
})

