document.addEventListener("DOMContentLoaded", function () {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("cart-count");
    const buttons = document.querySelectorAll(".achat");

    updateCartCount();

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const name = this.dataset.name;
            const price = this.dataset.price;

            cart.push({
    name: nom,
    price: prix,
    image: image,
    quantity: 1,
    couleur: "Noir",
    taille: "Standard"
});
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

    <div class="swiper produitSwiper">
        <div class="swiper-wrapper">

            <div class="swiper-slide">
                <img src="${p.images?.[0] || ''}"
                onclick="zoomImage('${p.images?.[0] || ''}')">
            </div>

            ${p.images?.[1] ? `
            <div class="swiper-slide">
                <img src="${p.images[1]}"
                onclick="zoomImage('${p.images?.[1] || ''}')">
            </div>` : ''}

            ${p.images?.[2] ? `
            <div class="swiper-slide">
                <img src="${p.images[2]}"
                onclick="zoomImage('${p.images?.[2] || ''}')">
            </div>` : ''}

            ${p.video ? `
            <div class="swiper-slide">
                <video  class="productVideo" muted controls>
                    <source src="${p.video}">
                </video>
            </div>` : ''}

        </div>

        <div class="swiper-pagination"></div>

    </div>

    <div class="desc">${p.description}</div>
    <div class="titre">${p.nom}</div>

    <div class="box">
        <div class="prix">${p.prix} fr</div>

        <button class="achat"
            onclick="ajouterAuPanier(
'${p.nom}',
'${p.prix}',
<p>🎨 ${p.couleur}</p>

<p>📏 ${p.taille}</p>

<p>📦 Stock : ${p.stock}</p>
'${p.images?.[0] || ""}'
)">
            Acheter
        </button>
    </div>

</div>
`;
    });

    document.getElementById("products").innerHTML = html;

   

const swipers = document.querySelectorAll(".produitSwiper");

swipers.forEach(swiperElement => {

    const swiper = new Swiper(swiperElement, {

        loop: false,

        pagination: {
            el: swiperElement.querySelector(".swiper-pagination"),
            clickable: true
        },

        on: {

            slideChange: function() {

                const videos =
                    swiperElement.querySelectorAll("video");

                videos.forEach(v => {
                    v.pause();
                    v.currentTime = 0;
                });

                const activeSlide =
                    this.slides[this.activeIndex];

                const video =
                    activeSlide.querySelector("video");

                if(video){

                    video.play();

                }

            }
        }
    });

});
 }

chargerProduits();

function ajouterAuPanier(nom, prix, image) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const produitExistant = cart.find(
        p => p.name === nom
    );

    if(produitExistant){

        produitExistant.quantity += 1;

    }else{

        cart.push({
            name: nom,
            price: prix,
            image: image,
            quantity: 1,
            couleur: "Noir",
            taille: "Standard"
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    document.getElementById("cart-count").textContent =
        cart.length;

    alert(nom + " ajouté au panier 🛒");
}

const cartCount = document.getElementById("cart-count");

if (cartCount) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.textContent = cart.length;
}


function zoomImage(src){

    const modal = document.getElementById("zoomModal");
    const img = document.getElementById("zoomImage");

    img.src = src;
    modal.style.display = "block";
}

document.querySelector(".closeZoom").onclick = () => {
    document.getElementById("zoomModal").style.display = "none";
};