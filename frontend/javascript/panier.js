// J'appelle les products (let productsInCart = get('products'))
let productsInCart = get('products');
displayQtyItemsInBasket();

if(productsInCart){
  show('form-section');
  hide('basketEmptyInfo');
  
  ajax("http://localhost:3000/api/furniture")
  .then((allProducts) => {     
    let products = getProductsFromCart(allProducts);//Récupération du produit choisi par l'utilisateur 
    let total = countTotal(products);
    displayTotal(total);
    displayProducts(products);
    listenForProductAddition(products);
    listenForProductDeletion(products);
    listenForFormSubmit(total);
  });
}else{
  hide('form-section');
  show('basketEmptyInfo');
}

//Ecoute pour additionner les produits depuis le panier.html
function listenForProductAddition(products){
  for(let product of products){//On boucle sur le produit pour écouter avec plus- chaque product.id & product.varnish
    document.getElementById('plus-' + product.id + '-' + product.varnish).addEventListener('click', function(){//On écoute product.id et product.varnish
      let productsInStorage = get('products');//J'appelle les produits qui se trouvent dans local storage pour trouver l'index product.id & product.varnish
      const index = findProductIndex(productsInStorage, product);//Récupération de l'index pour product.id & product.varnish
      
      productsInStorage[index].qty = productsInStorage[index].qty + 1;//ça permet d'ajouter le produit par 1
      store('products', productsInStorage); //On met à jour local Storage

      location.reload();
    })
  }
}

//Écoute pour soustraire les produits depuis le panier.html
function listenForProductDeletion(products){    
  for(let product of products){ //On boucle sur le produit pour écouter avec minus- chaque product.id & product.varnish
    document.getElementById('minus-' + product.id + '-' + product.varnish).addEventListener('click', function(){//On écoute product.id et product.varnish
      let productsInStorage = get('products');//J'appelle les produits qui se trouvent dans local Storage pour tourver l'index product.id & product.varnish

      const index = findProductIndex(productsInStorage, product);//Récupération de l'index pour product.id & product.varnish
      let qty = productsInStorage[index].qty - 1;//On crée un variable qty pour vérifier qu'il ne soit pas inférieur à 0

      if(qty <= 0){
        productsInStorage.splice(index, 1);//Suppraision du produit depuis le sorage
      }else{
        productsInStorage[index].qty = productsInStorage[index].qty - 1;//ça permet de soustraire le produit par 1
      }
      
      store('products', productsInStorage);//On met à jour local Storage
      location.reload();

      if(get('products').length === 0){//S'il n’y a rien, on enlève dans local storage les Key: 'products', 'price', 'given_id'
        localStorage.removeItem('products');
      }
    })
  }
}

function displayProducts(products){//Affiche les produits dans la page panier.html
  for(let product of products){   
    document.getElementById('main').innerHTML += renderProduct(product,'cart');
  }
}

function displayTotal(total){//Affiche le prix total des produits
  document.getElementById('show-totalprices').innerHTML = 'Total : ' + displayPrice(total) + ' €';
}

function countTotal(products){//Compte les prix des produits 
  let total = 0;
  
  for(let product of products){      
    total += product.price * product.qty; 
  }
  return total;
}

//Récupération du produit choisi par l'utilisateur 
function getProductsFromCart(products){
  let list = [];//Permet de stocker le produit choisi par l'utilisateur dans le tableau "liste" puis on return
  for(const productInCart of productsInCart){
    list.push(productInCart);
  }
  return list;
}

//Je récupère ids du produit. Pour pouvoir envoyer les Ids des commendes choisies par les utilisateurs au serveur (payload)
function getProductsId(){
  let ids = [];

  for(let product of get('products')){
    ids.push(product.id);
  }

  return ids;
}

function listenForFormSubmit(total){//Écoute la soumission du formulaire de contact
  let form = document.querySelector('#myForm');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(!checkInputs()){//Si le champ du formulaire est incorrect on envoie alert sinon, on envoie les valeurs des champs du formulaire avec le produit choisi
      alert('Merci de corriger le formoulaire');
      return;
    }
    //Envoie les valeurs du formulaire avec le/les produits choisis par l'utilisateur au serveur
    let payload = {
      contact: {
        firstName: document.getElementById('firstname').value,
        lastName: document.getElementById('lastname').value,
        address: document.getElementById('adresse').value,
        city: document.getElementById('city').value,
        email: document.getElementById('email').value
      },
      products: getProductsId()
    }
  
    options = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    //Récupération l'id de la confirmation de la commande
    fetch('http://localhost:3000/api/furniture/order', options)
    .then(order => order.json())
    .then(orderResponse => {

    //J'affiche orderid est prix total dans URl de la page commande.html pour afficher ensuit ces informations dans la page commande.html
      window.location.href = "commande.html?order_id=" + orderResponse.orderId + '&total=' + total;
    })
  });
}

function checkInputs(){//Vérification la valeur des champs du formulaire
  let email = document.getElementById('email').value;
  let firstName = document.getElementById('firstname').value;
  let lastName = document.getElementById('lastname').value;
  let address = document.getElementById('adresse').value;
  let city = document.getElementById('city').value;
  
  document.getElementById('msg-firstname').innerHTML = '';
  document.getElementById('msg-lastname').innerHTML = '';
  document.getElementById('msg-adresse').innerHTML = '';
  document.getElementById('msg-city').innerHTML = '';
  document.getElementById('msg-email').innerHTML = '';

  let errors = 0;//Création variable 'errors', qui nous permet encrémenter les erreus (afficher le text rouge si la valeur du formoulaire est incorrect)

  if(!isEmailValid(email)){//Si les inputs du champ sont incorrects on affiche le message erreur
    document.getElementById('msg-email').innerHTML = 'Ce champ est incorrect.';
    errors++;
  }

  if(!isNameValid(firstName)){
    document.getElementById('msg-firstname').innerHTML = 'Ce champ est incorrect.';
    errors++;//On incrémente l'error s'il y a une
  }

  if(!isNameValid(lastName)){
    document.getElementById('msg-lastname').innerHTML = 'Ce champ est incorrect.';
    errors++;
  }

  if(!isAdresseValid(address)){
    document.getElementById('msg-adresse').innerHTML = 'Ce champ est incorrect.';
    errors++;
  }

  if(!isAdresseValid(city)){
    document.getElementById('msg-city').innerHTML = 'Ce champ est incorrect.';
    errors++;
  }
  return(errors === 0);//S'il n'y a pas d'erreur, on retourne 
}

function isNameValid(name){//Contrôle les valeurs du champs du formulaire
  return name.length > 3;
}

function isEmailValid(email){//Contrôle les valeurs du champs du formulaire
  let regExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
  return regExp.test(email);
}

function isAdresseValid(adresse){//Contrôle les valeurs du champ du formulaire
  return adresse.length > 3;
}