document.addEventListener("DOMContentLoaded", function () {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("cart-count");
    const buttons = document.querySelectorAll(".achat");

    updateCartCount();

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const name = this.dataset.name;
            const price = this.dataset.price;

            cart.push({ name, price });
            localStorage.setItem("cart", JSON.stringify(cart));

            updateCartCount();
            alert(name + " ajouté au panier 🛒");
        });
    });

    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

});

function searchProduct() {

    let input = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    let products = document.querySelectorAll(".carte");

    products.forEach(product => {

        let titre = product
            .querySelector(".titre")
            .textContent
            .toLowerCase();

        let description = product
            .querySelector(".desc")
            .textContent
            .toLowerCase();

        if (
            titre.includes(input) ||
            description.includes(input)
        ) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });
}

async function chargerProduits() {

    const response = await fetch(
        "https://nawaf-shop-backend.onrender.com/products"
    );

    const produits = await response.json();

    let html = "";

    produits.forEach(p => {

      html += `
<div class="carte">
    <div class="img">
        <img src="${p.image}" alt="${p.nom}">
    </div>

    <div class="desc">${p.description}</div>

    <div class="titre">${p.nom}</div>

    <div class="box">
        <div class="prix">${p.prix} fr</div>

        <button class="achat"
            onclick="ajouterAuPanier('${p.nom}', '${p.prix}')">
            Acheter
        </button>
    </div>
</div>
`;

    });

    document.getElementById("products").innerHTML = html;

}

chargerProduits();

function ajouterAuPanier(nom, prix) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name: nom,
        price: prix
    });

    localStorage.setItem("cart", JSON.stringify(cart));

      localStorage.setItem("cart", JSON.stringify(cart));

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }

    alert(nom + " ajouté au panier 🛒");
}

const cartCount = document.getElementById("cart-count");

if (cartCount) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.textContent = cart.length;
}