async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Connecté !");
        window.location = "index.html";
    } else {
        alert(data.message);
    }
}

fetch("/commande", {
   method: "POST",
   headers: {
      "Content-Type":"application/json"
   },
   body: JSON.stringify({
      nom,
      numero,
      adresse,
      produits: cart
   })
});