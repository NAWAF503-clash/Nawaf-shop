document.addEventListener("DOMContentLoaded", function () {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("cart-count");
    
  if(cartCount){
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
                        onclick="zoomImage('${p.images[1]}')">
                    </div>
                    ` : ''}

                    ${p.images?.[2] ? `
                    <div class="swiper-slide">
                        <img src="${p.images[2]}"
                        onclick="zoomImage('${p.images[2]}')">
                    </div>
                    ` : ''}

                    ${p.video ? `
                    <div class="swiper-slide">
                        <video class="productVideo"
                        muted controls>
                            <source src="${p.video}">
                        </video>
                    </div>
                    ` : ''}

                </div>

                <div class="swiper-pagination"></div>

            </div>

            <div class="desc">${p.description}</div>

            <div class="titre">${p.nom}</div>

            <div class="options">

${p.couleurs && p.couleurs.length > 0 ? `
<div class="option-box">

<div class="colors">

${p.couleurs.map(c => `

<div
class="color-dot"
style="
background:${convertColor(c)};
"
onclick="selectColor(this, '${c}', '${p._id}')">
</div>

`).join("")}

<input
type="hidden"
id="color-${p._id}"
value="${p.couleurs[0]}">

</div>

</div>
` : ''}

${p.tailles && p.tailles.length > 0 ? `
<div class="option-box">


<div class="sizes">

${p.tailles.map(t => `

<button
class="size-btn"
onclick="selectSize(this, '${t}', '${p._id}')">

${t}

</button>

`).join("")}

<input
type="hidden"
id="size-${p._id}"
value="${p.tailles[0]}">

</div>

</div>
` : ''}

<div class="option-box">


<div class="qty-box">

<button onclick="changeQty('${p._id}', -1)">
-
</button>

<input
type="text"
id="qty-${p._id}"
value="1"
readonly>

<button onclick="changeQty('${p._id}', 1)">
+
</button>

</div>

</div>

</div>

<div class="box">

    <div class="prix">
        ${p.prix} FCFA
    </div>

    <button class="achat"
    onclick="ajouterAuPanier(
    '${p._id}',
    '${p.nom}',
    '${p.prix}',
    '${p.images?.[0] || ""}'
    )">

        Acheter

    </button>

</div>

        </div>
        `;

    });

    document.getElementById("products").innerHTML = html;

    const swipers =
        document.querySelectorAll(".produitSwiper");

    swipers.forEach(swiperElement => {

        new Swiper(swiperElement, {

            loop: false,

            pagination: {
                el: swiperElement.querySelector(
                    ".swiper-pagination"
                ),
                clickable: true
            },

            on: {

                slideChange: function() {

                    const videos =
                        swiperElement.querySelectorAll(
                            "video"
                        );

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

function ajouterAuPanier(id, nom, prix, image) {

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    const quantity = Number(
       document.getElementById(`qty-${id}`).value
    );

    const couleurSelect =
    document.getElementById(`color-${id}`);

    const tailleSelect =
    document.getElementById(`size-${id}`);

    const couleur =
    couleurSelect ? couleurSelect.value : "";

    const taille =
    tailleSelect ? tailleSelect.value : "";

    cart.push({

        name: nom,

        unitPrice: Number(prix),

        price: Number(prix) * quantity,

        image: image,

        quantity: quantity,

        couleur: couleur,

        taille: taille

    });

    localStorage.setItem("cart", JSON.stringify(cart));

    document.getElementById("cart-count")
    .textContent = cart.length;

    alert(nom + " ajouté au panier 🛒");
}

const cartCount = document.getElementById("cart-count");

if (cartCount) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.textContent = cart.length;
}


function zoomImage(src){

    const modal =
    document.getElementById("zoomModal");

    const img =
    document.getElementById("zoomImage");

    img.src = src;

    modal.style.display = "flex";
}

/* attendre chargement HTML */
window.addEventListener("DOMContentLoaded", () => {

    const modal =
    document.getElementById("zoomModal");

    const closeBtn =
    document.querySelector(".closeZoom");

    /* fermer avec X */
    closeBtn.addEventListener("click", () => {

        modal.style.display = "none";

    });

    /* fermer fond noir */
    modal.addEventListener("click", (e) => {

        if(e.target === modal){

            modal.style.display = "none";

        }

    });

});

function selectColor(el, color, id){

    document
    .querySelectorAll(`#product-${id} .color-dot`)
    .forEach(dot => {

        dot.classList.remove("active-color");

    });

    el.classList.add("active-color");

    document
    .getElementById(`color-${id}`)
    .value = color;
}

function selectSize(el, size, id){

    document
    .querySelectorAll(`#product-${id} .size-btn`)
    .forEach(btn => {

        btn.classList.remove("active-size");

    });

    el.classList.add("active-size");

    document
    .getElementById(`size-${id}`)
    .value = size;
}

function changeQty(id, amount){

    const input =
    document.getElementById(`qty-${id}`);

    let value = Number(input.value);

    value += amount;

    if(value < 1) value = 1;

    input.value = value;
}


function convertColor(color){

    const colors = {

        Noir: "black",
        Blanc: "white",
        Rouge: "red",
        Bleu: "blue",
        Vert: "green",
        Jaune: "yellow",
        Orange: "orange",
        Rose: "pink",
        Gris: "gray",
        Violet: "purple"

    };

    return colors[color] || color;
}