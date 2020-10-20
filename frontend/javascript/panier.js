let productIds = get('products');

if(productIds){
  show('form-section');
  hide('basketEmptyInfo');

  ajax("http://localhost:3000/api/furniture")
  .then((allProducts) => {     
    let products = getProductsFromCart(allProducts);
    let total = countTotal(products);
    displayTotal(total);
    displayProducts(products);
    listenForProductDeletion(products);
    listenForFormSubmit();
    priceStorage(total)
  });
}else{     
  hide('form-section');
  show('basketEmptyInfo');
}

function listenForProductDeletion(products){    
  for(let product of products){
    document.getElementById('delete-' + product._id).addEventListener('click', function(){

      if(productIds.includes(product._id)){         
        let index = productIds.indexOf(product._id);           
        productIds.splice(index,1);
        if(productIds.length === 0){
          localStorage.removeItem('products');
        }else{
          store('products', productIds);
        }
        location.reload();
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
    total += product.price; 
  }
  return total;
}

function priceStorage(total){
  let priceComande = displayPrice(total);
  localStorage.setItem('price',JSON.stringify(priceComande));
}

function show(id){
  document.getElementById(id).style.display = 'block';
}

function hide(id){
  document.getElementById(id).style.display = 'none';
}

function getProductsFromCart(products){
  let list = [];
  for(const productId of productIds){
    for(let product of products){
      if(productId == product._id){
        list.push(product);
      }
    }      
  }
  return list;
}

function listenForFormSubmit(){
  let form = document.querySelector('#myForm');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    checkInputs();
    if(!checkInputs()){
      alert('Merci de corriger le formoulaire');
      return;
    }

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

function fetchOrder(){
  fetch('http://localhost:3000/api/furniture/order', options)
  .then(order => order.json())
  .then(orderResponse =>{
    window.location.href = "commande.html";
    localStorage.setItem('orderId',JSON.stringify(orderResponse.orderId));
  })
}

function checkInputs(){
  let email = document.getElementById('email').value;
  let firstName = document.getElementById('firstname').value;
  let lastName = document.getElementById('lastname').value;
  let address = document.getElementById('adresse').value;
  let city = document.getElementById('city').value;
  
  if(isEmailVald(email)){
    document.getElementById('msg-email').innerHTML = '';
  }else{
    document.getElementById('msg-email').innerHTML = 'Ce champ est incorrect.';
    return false;
  }

  if(isNameVald(firstName)){
    document.getElementById('msg-firstname').innerHTML = '';
  }else{
    document.getElementById('msg-firstname').innerHTML = 'Ce champ est incorrect.';
    return false;
  }

  if(isNameVald(lastName)){
    document.getElementById('msg-lastname').innerHTML = '';
  }else{
    document.getElementById('msg-lastname').innerHTML = 'Ce champ est incorrect.';
    return false;
  }

  if(isAdresseValide(address)){
    document.getElementById('msg-adresse').innerHTML = '';
  }else{
    document.getElementById('msg-adresse').innerHTML = 'Ce champ est incorrect.';
    return false;
  }

  if(isAdresseValide(city)){
    document.getElementById('msg-city').innerHTML = '';
  }else{
    document.getElementById('msg-city').innerHTML = 'Ce champ est incorrect.';
    return false;
  }
  return true;
}

function isNameVald(name){
  return name.length > 3;
}

function isEmailVald(email){
  let regExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
  return regExp.test(email);
}

function isAdresseValide(adresse){
  return adresse.length > 3;
}