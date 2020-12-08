let url = "http://localhost:3000/api/furniture";

ajax(url)//J'appelle la function Ajax puis je récupère tous les produits
.then((products) => {
  diplayProducts(products);
})

function diplayProducts(products){//Cette fonction permet de boucler sour le produit puis on affiche dans la page accueil
  const main = document.getElementById('main');
  for(const product of products){
    main.innerHTML += renderProduct(product,'card');
  }
}