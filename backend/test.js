const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.cluster0.lpw0bzx.mongodb.net",
  (err, addresses) => {
    console.log("Erreur =", err);
    console.log("Résultat =", addresses);
  }
);