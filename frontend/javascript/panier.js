// J'appelle les products pour faire le comparé son avec Ajax products(ligne 9,) pour affiche le produit dans le panier
// s'il y a pas de même produit
let productsInCart = get('products');
countTotalProductsInBasket();

if(productsInCart){
  show('form-section');
  hide('basketEmptyInfo');

  ajax("http://localhost:3000/api/furniture")
  .then((allProducts) => {     
    let products = getProductsFromCart(allProducts);
    let total = countTotal(products);
    displayTotal(total);
    displayProducts(products);
    listenForProductAddition(products);
    listenForProductDeletion(products);
    listenForFormSubmit();
    priceStorage(total);
  });
}else{
  hide('form-section');
  show('basketEmptyInfo');
}

function listenForProductAddition(products){    
  for(let product of products){ //on boucle sur le produit pour écouter avec plus- chaque produit(product.id)
    document.getElementById('plus-' + product.id + '-' + product.varnish).addEventListener('click', function(){// On écoute product.id et product.varnish
      let productsInStorage = get('products'); //J'appelle les produits qui se trouvent dans local Storage pour tourver l'index product.id & product.varnish

      const index = findProductIndex(productsInStorage, product);//Récupération de l'index pour product.id & product.varnish
      
      productsInStorage[index].qty = productsInStorage[index].qty + 1;//ça permet d'ajouter le produit par 1
      store('products', productsInStorage); // On met à jour local Storage

      location.reload();  
    })
  }
}

//Écoute les cliques d'utilisateurs pour supprimer les produits
function listenForProductDeletion(products){    
  for(let product of products){ //on boucle sur le produit pour écouter avec plus- chaque produit(product.id)
    document.getElementById('minus-' + product.id + '-' + product.varnish).addEventListener('click', function(){// On écoute product.id et product.varnish
      let productsInStorage = get('products'); //J'appelle les produits qui se trouvent dans local Storage pour tourver l'index product.id & product.varnish

      const index = findProductIndex(productsInStorage, product);//Récupération de l'index pour product.id & product.varnish
      let qty = productsInStorage[index].qty - 1;//On créé un variable qty pour verifier qu'il soit pas inférieur à 0

      if(qty <= 0){
        productsInStorage.splice(index, 1);//Suppraision du produit depuis le sorage
      }else{
        productsInStorage[index].qty = productsInStorage[index].qty - 1;//ça permet d'ajouter le produit par 1
      }
      
      store('products', productsInStorage); // On met à jour local Storage
      location.reload();

      if(get('products').length === 0){
        localStorage.removeItem('products');
        localStorage.removeItem('price');
      }
    })
  }
}

function displayProducts(products){
  for(let product of products){   
    document.getElementById('main').innerHTML += renderProduct(product,'cart');
  }
}

function displayTotal(total){
  document.getElementById('show-totalprices').innerHTML = 'Total : ' + displayPrice(total) + ' €';
}

function countTotal(products){
  let total = 0;
  
  for(let product of products){      
    total += product.price * product.qty; 
  }
  return total;
}

function priceStorage(total){// Sauvegarde de prix total de la commande pour récupérer depuis commande js/ligne 2
  let priceComande = displayPrice(total);
  localStorage.setItem('price',JSON.stringify(priceComande));
}

function show(id){
  document.getElementById(id).style.display = 'block';
}

function hide(id){
  document.getElementById(id).style.display = 'none';
}

// On compare avec l'id du produit qui se trouve dans local storage puis on affiche le produit comparé grâce à Ajax de même produit qui se trouve dans local storage
function getProductsFromCart(products){
  let list = [];// Permet de stocker le produit choisi par l'utilisateur dans le tableau "liste" puis on le récupère après la comparaison(ligne81)
  for(const productInCart of productsInCart){
    for(let product of products){
      if(productInCart.id == product._id){// Si les 2 ids du produit sont identiques alors ont récupère le produit grâce à la méthode liste.Push(product)
        list.push(productInCart);
      }
    }      
  }
  return list;
}

function listenForFormSubmit(){// Écoute la soumission du formulaire de contact
  let form = document.querySelector('#myForm');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(!checkInputs()){// Si le champ du formulaire est incorrect on envoie alert sinon, on envoie les valeurs des champs du formulaire avec le produit choisi
      alert('Merci de corriger le formoulaire');
      return;
    }
// Envoie les valeurs du formulaire avec le/les produits choisis par l'utilisateur au serveur
    let payload = {
      contact: {
        firstName: document.getElementById('firstname').value,
        lastName: document.getElementById('lastname').value,
        address: document.getElementById('adresse').value,
        city: document.getElementById('city').value,
        email: document.getElementById('email').value
      },
      products: get('products')
    }
  
    options = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetchOrder();
  });
}

function fetchOrder(){// Récupération l'id de la confirmation de la commande
  fetch('http://localhost:3000/api/furniture/order', options)
  .then(order => order.json())
  .then(orderResponse => {
    localStorage.setItem('orderId',JSON.stringify(orderResponse.orderId));// Stockage "l'id de la confirmation de la commande dans local storage pour afficher
    // dans la page commande.js/ligne 1
    window.location.href = "commande.html";
  })
}

function checkInputs(){//  Vérification la valeur des champs du formulaire
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

  let errors = 0;// Création variable 'errores', qui nous permet encrémenter les erreus (afficher le text rouge si la valeur du formoulaire est incorrect)

  if(!isEmailValid(email)){// Si les inputs du champ sont incorrects on affiche le message erreur
    document.getElementById('msg-email').innerHTML = 'Ce champ est incorrect.';
    errors++;
  }

  if(!isNameValid(firstName)){
    document.getElementById('msg-firstname').innerHTML = 'Ce champ est incorrect.';
    errors++;// On incrémente l'error s'il y a une
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
  return(errors === 0);// S'il n'y a pas d'erreur, on retourne 
}

function isNameValid(name){// Contrôle les valeurs du Chems du formulaire
  return name.length > 3;
}

function isEmailValid(email){// Contrôle les valeurs du Chems du formulaire
  let regExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
  return regExp.test(email);
}

function isAdresseValid(adresse){// Contrôle les valeurs du Chems du formulaire
  return adresse.length > 3;
}