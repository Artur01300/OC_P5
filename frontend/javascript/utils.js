function ajax(url){
  const promise = new Promise(function (resolve, reject){
    const request = new XMLHttpRequest();
    request.open("GET",url);
    request.onreadystatechange = function(){  
      if(this.readyState === XMLHttpRequest.DONE){

        if(this.status === 200){
          resolve(JSON.parse(request.responseText));
        }else{
          alert("Erreur, impossible d'établir une connection au serveur");
          console.log('Erreur', request.status);
          reject();
        }
      }
    };
    request.send();
  });
  return promise;
}

function displayPrice(price){//Réduction des zéros pour afficher les prix du produit en décimaux 
  price = price/100;
  return price.toFixed(2);
}

function renderProduct(product, type){//Prépare les produits pour afficher dans les pages différents
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
      </div>
    `
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
      </div>
    `;
  }
 
  if(type === 'cart'){
    return`
      <div class="card mb-3" style="max-width: 450px;">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="${product.imageUrl}" class="card-img" alt="${product.imageUrl}">
          </div>
          <div class="col-md-8">
            <div class="card-body" style="padding-bottom: 0px">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text"><strong>Vernie :</strong> ${product.varnish}</p>
              <p class="card-text"><strong>Qantité : </strong>${product.qty}</p>
              <p class="card-text"><strong>Prix : </strong>${displayPrice(product.price)} €</p>
              <button type="button" class="btn btn-secondary" id="minus-${product.id}-${product.varnish}">-</button>
              <button type="button" class="btn btn-secondary" id="plus-${product.id}-${product.varnish}"">+</button>
            </div>
          </div>
        </div>
      </div
    `
  }
}

function store(key, value){//Permets de stocker les éléments dans local storage
  return localStorage.setItem(key, JSON.stringify(value));
}

function get(key){//Permets de récupérer les éléments depuis local storage
  return JSON.parse(localStorage.getItem(key));
}

function countTotalProductsInBasket(){
  let qountTotalinBasket = 0;//En premier temps si le panier est vide alors par défaut on affiche 0
  let getQtyProducts = get('products');
  
  if(getQtyProducts){

    for(let getQtyProduct of getQtyProducts){
      qountTotalinBasket += getQtyProduct.qty;
    }
  }
  return qountTotalinBasket;//Si non tu me renvoie 0
}

displayQtyItemsInBasket()
function displayQtyItemsInBasket(){
  const qty = countTotalProductsInBasket();

  document.getElementById('qntProduct').innerHTML = qty;
}

function findProductIndex(products, product){
  return products.findIndex((item) => {//Récupération l'index du produit
    return item.id === product.id && item.varnish === product.varnish;
  });
}

function show(id){
  document.getElementById(id).style.display = 'block';
}

function hide(id){
  document.getElementById(id).style.display = 'none';
}

//Récupération l'URL/Permets de récupérer le prix total et la confirmation de la commande pour afficher dans la page commande.js
function getDataFromUrl(key){
  const urlProd = new URLSearchParams(window.location.search);

  if(!urlProd.get(key)){//Vérification de l'id du produit, si l'id du produit est incorrect on affiche le message d'erreur puit redirectionne de la page
    alert('Attention, vous utilisez un url non autorisée, vous serez redirigé vers la page d\'accueil.');
    window.location.href = "index.html";
  }
  
  return urlProd.get(key);
}