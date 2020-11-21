//Récupération l'URL de touts les produits + id de produit qui se trouve dans url
let url = "http://localhost:3000/api/furniture/" + getIdUrl();
displayProductsQtyInBasket();

ajax(url).then((product) => {//on appelle le produit
  displayProduct(product);
  // On créé un tableau products pour ajouter tous les produits séléctionés par l'utilisateur pour pouvoir vérifier si le produit existe dèjà ou pas,
  // si il exist on désactive le bouton (ligne 16)
  let products = [];
  
  if(get('products')){
    products = get('products');
  }

  //vérifie si le produit que l'utilisateur veux chiosir se trouve déjà dans tableux produis alors on désactive le bouton
  if(products.includes(product._id)){
    disableAddToCartButton();
  }else{
    listenForCartAddition(product);
  }
})

function listenForCartAddition(product){
  let addToCart = document.getElementById('addToCart');

  addToCart.addEventListener('click', () => {
    let products = [];
    //On créé ce tableau vide pour pouvoir ajouter les produits choisi par l'utilisateur dans le tableau 'products',
    //pour ensuit stoquer les ids du produits dans localStorage(ligne 35)
    
    if(get('products')){// Après verification du produit, on ajoute les produit dans le 'produitc', pour ensuit stoquer l'id du prosuit dans localStorage
      products = get('products');
    }

    products.push(product._id);
    store('products', products);

    if(products = get('products')){//Si le produit est dèjà choisi qui se trouve dans le localstorage alors on désacive le bouton pour ne pas pouvoir rajouter
      // dans le localsorage
      disableAddToCartButton();
      window.location.href = "index.html";
    }
  });
}

function displayProduct(product){
  document.getElementById('main').innerHTML += renderProduct(product, 'single');
}

//Récupération l'URL qui a été créé dans utils.js/ligne 47
function getIdUrl(){
  const urlProd = new URLSearchParams(window.location.search);

  if(!urlProd.get("id")){//Verification de l'id du porduit, si l'id du produit est incorrect on affiche le message d'erreur puit rédiréctionnement de la page
    alert('Attention, vous utilisez un url non autorisée, vous serez redirigé vers la page d\'accueil.');
    window.location.href = "index.html";
  }
  return urlProd.get("id");
}

function disableAddToCartButton(){// Désactivation du bouton de la page product.html si le produit existe déjà dans le panier
  addToCart.disabled = true;
  addToCart.innerHTML = 'Le produit est ajouté';
}