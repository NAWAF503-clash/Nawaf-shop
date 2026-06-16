async function ajouterProduit() {

    const nom = document.getElementById("nom").value;
    const description = document.getElementById("description").value;
    const prix = document.getElementById("prix").value;

    const image1 = document.getElementById("image1").value;
    const image2 = document.getElementById("image2").value;
    const image3 = document.getElementById("image3").value;

    const video = document.getElementById("video").value;

    const couleurs =
document.getElementById("couleurs")
.value
.split(",");

const tailles =
document.getElementById("tailles")
.value
.split(",");

    const stock =document.getElementById("stock").value;

    const response = await fetch(
        "https://nawaf-shop-backend.onrender.com/add-product",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                nom,
                description,
                prix,
                couleurs,
                tailles,
                stock,
            
                images:[image1,image2,image3],
                video
            })
        }
    );

    const data = await response.json();

    alert(data.message);

    chargerProduits();
}

async function chargerProduits(){

    const response = await fetch(
        "https://nawaf-shop-backend.onrender.com/products"
    );

    const produits = await response.json();

    let html = "";

    produits.forEach(p => {

        html += `
        <div class="product">

            <img src="${p.images?.[0] || ''}">

            <div class="product-content">

                <h3>${p.nom}</h3>

                <p>${p.description}</p>

                <h4>${p.prix} FCFA</h4>

                <button onclick="supprimerProduit('${p._id}')">
                    Supprimer
                </button>

                <button onclick="modifierProduit('${p._id}', '${p.prix}')">
                    Modifier
                </button>

            </div>

        </div>
        `;
    });

    document.getElementById("listeProduits").innerHTML = html;
}

async function supprimerProduit(id){

    if(!confirm("Supprimer ce produit ?")) return;

    await fetch(
        `https://nawaf-shop-backend.onrender.com/product/${id}`,
        {
            method:"DELETE"
        }
    );

    chargerProduits();
}

async function chargerCommandes(){

    const response = await fetch(
        "https://nawaf-shop-backend.onrender.com/commandes"
    );

    const commandes = await response.json();

    let html = "";

    commandes.forEach(c => {

        let produitsHTML = "";
        let total = 0;

        c.produits.forEach(p => {

            total += Number(p.price);

            produitsHTML += `
            <div style="
            border:1px solid #ddd;
            padding:10px;
            margin-top:10px;
            border-radius:8px;">

                <img src="${p.image}"
                style="
                width:80px;
                height:80px;
                object-fit:cover;
                border-radius:8px;
                ">

                <h4>${p.name}</h4>

                <p>💰 ${p.price} FCFA</p>

                <p>📦 Quantité : ${p.quantity}</p>

                <p>🎨 Couleur : ${p.couleur}</p>

                <p>📏 Taille : ${p.taille}</p>

            </div>
            `;
        });

        html += `
        <div class="commande">

            <h3>👤 ${c.nom}</h3>

            <p>📞 ${c.numero}</p>

            <p>📍 ${c.adresse}</p>

            <p>
                📅 Date :
                ${new Date(c.date).toLocaleString()}
            </p>

            <p>
                📦 Statut :
                <b>${c.statut}</b>
            </p>

            <h4>Produits :</h4>

            ${produitsHTML}

            <h2>
                Total : ${total} FCFA
            </h2>

            <button onclick="changerStatut('${c._id}')">
                Marquer livré
            </button>

            <button onclick="supprimerCommande('${c._id}')">
                Supprimer
            </button>

        </div>
        `;
    });

    document.getElementById("listeCommandes").innerHTML = html;
}
chargerProduits();
chargerCommandes();

async function supprimerCommande(id){

    if(!confirm("Supprimer cette commande ?")) return;

    await fetch(
        `https://nawaf-shop-backend.onrender.com/commande/${id}`,
        {
            method:"DELETE"
        }
    );

    chargerCommandes();
}

async function viderCommandes(){

    if(!confirm("Effacer tout l'historique ?")) return;

    await fetch(
        "https://nawaf-shop-backend.onrender.com/commandes",
        {
            method:"DELETE"
        }
    );

    chargerCommandes();
}

async function changerStatut(id){

    await fetch(
        `https://nawaf-shop-backend.onrender.com/commande/${id}`,
        {
            method:"PUT"
        }
    );

    chargerCommandes();
}

async function modifierProduit(id, ancienPrix){

    const nouveauPrix = prompt(
        "Nouveau prix :",
        ancienPrix
    );

    if(!nouveauPrix) return;

    await fetch(
        `https://nawaf-shop-backend.onrender.com/product/${id}`,
        {
            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                prix: nouveauPrix
            })
        }
    );

    alert("Prix modifié ✅");

    chargerProduits();
}