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