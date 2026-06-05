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