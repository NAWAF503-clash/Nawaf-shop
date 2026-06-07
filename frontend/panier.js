let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsContainer = document.getElementById("cart-items");
const totalElement = document.getElementById("cart-total");

displayCart();

function displayCart() {

    cartItemsContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += Number(item.price);

        const div = document.createElement("div");

        div.innerHTML = `
            <p>
                ${item.name} - ${item.price} fr
                <button onclick="removeItem(${index})">
                    Supprimer
                </button>
            </p>
        `;

        cartItemsContainer.appendChild(div);
    });

    totalElement.textContent = total;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
    displayCart();
}


async function commander() {

    const nom = document.getElementById("nom").value;
    const numero = document.getElementById("numero").value;
    const adresse = document.getElementById("adresse").value;

    if (!nom || !numero || !adresse) {
        alert("Veuillez remplir tous les champs");
        return;
    }

    const produits = JSON.parse(localStorage.getItem("cart")) || [];

    if (produits.length === 0) {
        alert("Votre panier est vide");
        return;
    }

    try {

        const response = await fetch("https://nawaf-shop-backend.onrender.com/commande", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nom,
                numero,
                adresse,
                produits
            })
        });

        const data = await response.json();

        alert(data.message);

        if (data.success) {

            localStorage.removeItem("cart");

            window.location.reload();
        }

    } catch (error) {

        console.error(error);
        alert("Erreur de connexion au serveur");

    }
}