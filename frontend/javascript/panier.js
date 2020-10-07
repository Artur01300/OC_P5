let productIds = get('products');

if(productIds){
  show('form-section');
  hide('basketEmpty');

  ajax("http://localhost:3000/api/furniture")
  .then((allProducts) => {     
    let products = getProductsFromCart(allProducts);// cette fonction doit retourner tous les produits de panier

    let total = countTotal(products);
    displayTotal(total);
    displayProducts(products);
    listenForProductDeletion(products);
    listenForFormSubmit();
  });
}else{     
  show('basketEmpty');
  hide('form-section');
}

function listenForProductDeletion(products){    
  for(let product of products){
    document.getElementById('delete-' + product._id).addEventListener('click', function(){

      if(productIds.includes(product._id)){         
        let index = productIds.indexOf(product._id);           
        productIds.splice(index,1);
        if(productIds.length === 0){
          localStorage.clear();
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

function show(id){
  document.getElementById(id).style.display = 'block';
}

function hide(id){
  document.getElementById(id).style.display = 'none';
}

function getProductsFromCart(products){
  let list = [];
  // let productIds = get('products');//je pence qu'on a pas besoin récupéer le get('products') ?
  for(const productId of productIds){
    for(let product of products){
      if(productId == product._id){  // si le produit existe on push le poduit on questionn
        list.push(product)
      }
    }      
  }
  return list; //returner la liste une fois le boucle est términé. il retourne tous les produits du panier
}

// ******************************** Validation Email *********************************

function listenForFormSubmit(){
  let form = document.querySelector('#myForm');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    checkInputs();
    // if(!checkInputs()){
    //   alert('Merci de corriger le formoulaire');
    //   return;
    // }

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

    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
          let response = JSON.parse(this.responseText);
          resolve(response);
        }
      };
      request.open("POST", "http://localhost:3000/api/furniture/order");
      // request.send(JSON.stringify(payload));
      payload = JSON.stringify(payload);
      request.send(payload);
    });
  });
}

function checkInputs(){
  let email = document.getElementById('email').value;
  let firstname = document.getElementById('firstname').value;
  let lastname = document.getElementById('lastname').value;
  let adresse = document.getElementById('adresse').value;
  let city = document.getElementById('city').value;

  if(isEmailVald(email)){
    messagErreur('')
  }else{
    messagErreur('Ce champ est obligatoire.')
    return false;
  }

  if(isNameVald(firstname)){
    messagErreur('');
  }else{
    messagErreur('Ce champ est obligatoire.');
    return false;
  }

  if(isNameVald(lastname)){
    messagErreur('');
  }else{
    messagErreur('Ce champ est obligatoire.');
    return false;
  }

  if(isAdresseValide(adresse)){
    messagErreur('');
  }else{
    messagErreur('Ce champ est obligatoire.');
    return false;
  }

  if(isAdresseValide(city)){
    messagErreur('');
  }else{
    messagErreur('Ce champ est obligatoire.');
    return false;
  }
}

function messagErreur(messages){
  document.getElementById('msg').innerHTML = messages;
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