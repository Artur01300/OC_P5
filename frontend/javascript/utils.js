//Vérification de la connexion avec node serveur, si le node serveur n'est pas lancé alors on affiche le message d'erreur
showMessageErrorIfNotResponsByServer();
function showMessageErrorIfNotResponsByServer(){
  fetch('http://localhost:3000/api/furniture')
  .then(responsServer => {
    if (responsServer.ok) {
      return responsServer.json();
    } else {
      return Promise.reject(responsServer.status);
    }
  })
  .catch(err => (
    document.getElementById('main_titles').innerHTML = "Vous n'êtes pas connecté au serveur, veuillez lancer le node serveur SVP !")
  );
}

// L'objet Promise (pour « promesse ») est utilisé pour réaliser des traitements de façon asynchrone.
// Récupération de la réponse depuis le serveur
function ajax(url){
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
        let response = JSON.parse(this.responseText);
        resolve(response);
      }
    };
    request.open("GET", url);
    request.send();
  });
}

function displayPrice(price){// Réduction des zéros pour afficher les prix du produit en décimaux 
  price = price/100;
  return price.toFixed(2);
}

function renderProduct(product, type){// Prépare les produits pour afficher dans les pages différents
  if(type === 'card'){
    return`
      <div class="card" style="width: 18rem">
        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <h2 class="card-title">${product.name}</h2>
          <p class="card-text">${product.description}.</p>
          <p class="card-text">${displayPrice(product.price)} €</p>
          <a href="product.html?id=${product._id}" class="btn btn-primary">Voir le produit</a>
        </div>
      </div>`
    }
  if(type === 'single'){
    let options = document.getElementById('options');
      for(let varnishe of product.varnish){
        options += `<option>${varnishe}</option>`;
      }
      return`
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img src="${product.imageUrl}" class="card-img" alt="${product.imageUrl}">
            </div>
            <div class="col-md-">
              <div class="card-body">
                <h5 class="card-title">${product.description}</h5>
                <p class="card-text">${displayPrice(product.price)} €</p>
                <select id="options">${options}</select>
                <p class="card-text"><small class="text-muted"><strong>Référance de produit :</strong> ${product._id}</small></p>
              </div>
            </div>
          </div>
        </div>`;
  }
 
  if(type === 'cart'){
    return`
      <div class="card mb-3" style="max-width: 540px;">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="${product.imageUrl}" class="card-img" alt="${product.imageUrl}">
          </div>
          <div class="col-md-8">
            <div class="card-body" style="padding-bottom: 0px">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text"><strong>Vernie :</strong> ${product.varnish}</p>
              <p class="card-text"><strong>Quantité : </strong>${product.qty}</p>
              <p class="card-text"><strong>Prix : </strong>${displayPrice(product.price)} €</p>
              <p class="card-text pointer" id="delete-${product._id}"><i class="fas fa-trash col-md-12"></i></p>
            </div>
          </div>
        </div>
      </div
    `
  }
}

function store(key, value){// Permets de stocker id du produit de la commande et le prix total de la commande dans local Storage
  return localStorage.setItem(key, JSON.stringify(value));
}

function get(key){// Permets de récupérer id du produit de la commande et le prix total de la commande depuis local Storage
  return JSON.parse(localStorage.getItem(key));
}

function countTotalProductsInBasket(){//conmpte est affiche les nombre du produits dans le basquet
  let qountTotalinBasket = 0;
  let getQtyProducts = get('products');
  
  if(getQtyProducts){

    for(let getQtyProduct of getQtyProducts){
      qountTotalinBasket += getQtyProduct.qty;
     
      document.getElementById('qntProduct').innerHTML = qountTotalinBasket;
    }
  }
  return 0;//si non tu me renvoie 0
}