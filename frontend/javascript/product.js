let url = "http://localhost:3000/api/furniture/" + getIdUrl();
displayProductsQtyInBasket();

ajax(url).then((product) => {
  displayProduct(product);
  let products = [];
  
  if(get('products')){
    products = get('products');
  }

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
    
    if(get('products')){
      products = get('products');
    }

    products.push(product._id);
    store('products', products);

    if(products = get('products')){
      disableAddToCartButton();
      window.location.href = "index.html";
    }
  });
}

function displayProduct(product){
  document.getElementById('main').innerHTML += renderProduct(product, 'single');
}

function getIdUrl(){
  const urlProd = new URLSearchParams(window.location.search);

  if(!urlProd.get("id")){
    alert('Attention, vous utilisez un url non autorisée, vous serez redirigé vers la page d\'accueil.');
    window.location.href = "index.html";
  }
  return urlProd.get("id");
}


function disableAddToCartButton(){
  addToCart.disabled = true;
  addToCart.innerHTML = 'Le produit est ajouté';
}