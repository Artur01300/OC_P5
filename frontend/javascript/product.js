//Récupération l'URL de touts les produits + id de produit qui se trouve dans url
let url = "http://localhost:3000/api/furniture/" + getIdUrl();
countTotalProductsInBasket();

ajax(url).then((product) => {//on appelle le produit
  displayProduct(product);
  listenForCartAddition(product);
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

    //Récupération du vernie. Avec if je vérifie si le produit est dans le panier, alors on récupère le produit est son index.
    //Récupération du produit nous permet de savoir la quantité du produit présent avant pour en suit augmentée de 1
    //Récupération d'index nous permet de modifier la quantité pour en soute enregistrer dans local storage
    //Si le produit n'est pas dans panier en pousse le produit dans local storage
    let varnish = document.getElementById('options').value;

    if(findProductIncCart(product._id, varnish).length > 0){
      let productInCart = findProductIncCart(product._id, varnish)[0];//Récupération du produit
      let productIndexInCart = products.findIndex((item) => {//Récupération l'index du produit
        return item.id === product._id && item.varnish === varnish;
      });

      products[productIndexInCart].qty = productInCart.qty + 1;

      store('products', products );

    }else{
      products.push({
        id: product._id, 
        varnish: varnish, 
        qty: 1, 
        price: product.price,
        name: product.name,
        imageUrl: product.imageUrl
      })
    }
    store('products', products);
    location.reload();
  });
}

//Récupération du produit après le filtrage de la même vernie est id de produit pour en passe dans le function 'listenForCartAddition'
function findProductIncCart(id, varnish){
  let products = [];//Je cherche les produits qu'ils sont au départ vide

  if(get('products')){//Après je prends tous les produits puis je filtre dedans
    products = get('products');
  }

  return products.filter((product) => {//Pour chaque produit que tu va filter 
    return product.id === id && product.varnish === varnish;//Si le product id = à l'id que j'ai passé dans le paramètre 'findProductIncCart' et le product varnish = varnish, alors c'est bien le même
  });
}

function displayProduct(product){
  document.getElementById('main').innerHTML += renderProduct(product, 'single');
}

//Récupération l'URL qui a été créé dans utils.js/ligne 47
function getIdUrl(){
  const urlProd = new URLSearchParams(window.location.search);

  if(!urlProd.get("id")){//Vérification de l'id du produit, si l'id du produit est incorrect on affiche le message d'erreur puit redirectionne de la page
    alert('Attention, vous utilisez un url non autorisée, vous serez redirigé vers la page d\'accueil.');
    window.location.href = "index.html";
  }
  return urlProd.get("id");
}