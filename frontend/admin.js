async function ajouterProduit() {

    const nom = document.getElementById("nom").value;
    const description = document.getElementById("description").value;
    const prix = document.getElementById("prix").value;
    const image = document.getElementById("image").value;

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
                image
            })
        }
    );

    const data = await response.json();

    alert(data.message);

}


html += `
<div class="produit">
    <img src="${p.image}">
    <h3>${p.nom}</h3>
    <p>${p.description}</p>
    <h4>${p.prix} FCFA</h4>

    <button onclick="supprimerProduit('${p._id}')">
        Supprimer
    </button>
</div>
`;

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