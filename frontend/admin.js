async function ajouterProduit() {


const nom = document.getElementById("nom").value;
const description = document.getElementById("description").value;
const prix = document.getElementById("prix").value;
const image1 = document.getElementById("image1").value;
const image2 = document.getElementById("image2").value;
const image3 = document.getElementById("image3").value;
const video = document.getElementById("video").value;

const response = await fetch(
    "https://nawaf-shop-backend.onrender.com/add-product",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nom,
            description,
            prix,
            images: [image1, image2, image3],
            video
        })
    }
);

const data = await response.json();

alert(data.message);

chargerProduits();


}

async function chargerProduits() {

    const response = await fetch(
        "https://nawaf-shop-backend.onrender.com/products"
    );

    const produits = await response.json();

    let html = "";

    produits.forEach(p => {

        html += `
        <div class="produit">
            <img src="${p.image}" width="120">

            <h3>${p.nom}</h3>

            <p>${p.description}</p>

            <h4>${p.prix} FCFA</h4>

            <button onclick="supprimerProduit('${p._id}')">
                Supprimer
            </button>
        </div>
        `;
    });

    document.getElementById("listeProduits").innerHTML = html;
}


async function supprimerProduit(id) {

    if (!confirm("Supprimer ce produit ?")) return;

    await fetch(
        `https://nawaf-shop-backend.onrender.com/product/${id}`,
        {
            method: "DELETE"
        }
    );

    chargerProduits();
}


async function chargerCommandes() {

    const response = await fetch(
        "https://nawaf-shop-backend.onrender.com/commandes"
    );

    const commandes = await response.json();

    let html = "";

    commandes.forEach(c => {

        html += `
        <div class="commande">
            <h3>${c.nom}</h3>
            <p>📞 ${c.numero}</p>
            <p>📍 ${c.adresse}</p>
            <p>🛒 ${c.produits.length} produit(s)</p>
<ul>
    ${c.produits.map(p => `<li>${p.name} - ${p.price} FCFA</li>`).join("")}
</ul>
            <hr>
        </div>
        `;
    });

    document.getElementById("listeCommandes").innerHTML = html;
}
 

chargerProduits();
chargerCommandes();