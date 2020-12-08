//Récupération l'URL de touts les produits + id de produit, choisi par l'utilisateur, qui se trouve dans url
let url = "http://localhost:3000/api/furniture/" + getDataFromUrl('id');
countTotalProductsInBasket();

ajax(url).then((product) => {//On appelle le produit
  displayProduct(product);
  listenForCartAddition(product);
})

function listenForCartAddition(product){
  let addToCart = document.getElementById('addToCart');

  addToCart.addEventListener('click', () => {
    let products = [];
    //On créé ce tableau vide pour pouvoir ajouter les produits choisi par l'utilisateur dans le tableau 'products',
    //pour ensuit stoquer les produits dans localStorage(ligne 34)
    
    //On vérifie si lutilisateur a choisi son produit, si oui, on ajoute les produits dans les "products", pour ensuite les stocker dans local Storage
    if(get('products')){
      products = get('products');
    }

    //Récupération du vernie. Avec if je vérifie si le produit est dans le panier, alors on récupère le produit est son index.
    //Récupération du produit nous permet de savoir la quantité du produit présent avant, pour en suit augmentée de 1
    //Récupération d'index nous permet de modifier la quantité pour en soute enregistrer dans local storage
    //Si le produit n'est pas dans panier en pousse le produit dans local storage
    let varnish = document.getElementById('options').value;
    if(findProductIncCart(product._id, varnish).length > 0){//Je vérifie si le produit est dans le panier, alors on récupère le produit et son index.
      let productInCart = findProductIncCart(product._id, varnish)[0];//Récupération du produit
      let productIndexInCart = findProductIndex(products, productInCart)//Récupère l'index du produit et on insère dans 'products[productIndexInCart]'/ligne 33)
      
      //On ajoute un produit(productInCart.qty + 1) par click dans le tableau products puis on met à jour local storage
      products[productIndexInCart].qty = productInCart.qty + 1;

      store('products', products );

    }else{//Si les produits existent déjà, on stocke tout simplement dans lacal storage
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

//Récupération du produit après le filtrage de la même vernie est l'id de produit pour en suit faire passer dans le function 'listenForCartAddition'
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