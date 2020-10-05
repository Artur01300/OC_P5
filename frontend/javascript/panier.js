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
        console.log(productIds)        
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
  let productIds = get('products');//on récupaire le productIds
  for(const productId of productIds){
    for(let product of products){
      if(productId == product._id){        
        list.push(product)
      }
    }      
  }
  return list; //returner la liste une fois le boucle est términé
}

// ******************************** Validation Email *********************************

function listenForFormSubmit(){
  form.addEventListener('submit', function(e){
    e.preventDefault();
  
    if(fromInput(form.email) && validZipcode(form.zipcode)){
      form.submit();
      window.location.href = "commande.html";
    }
  });
}

let form = document.querySelector('#myForm');

form.email.addEventListener('change', function(){
  fromInput(this);
});

function fromInput(inputEmail){
  let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
  let testEmail = emailRegExp.test(inputEmail.value);
  let small = inputEmail.nextElementSibling;

  if(testEmail){
    small.innerHTML = '';
    return true;
  }else{
    small.innerHTML = 'Adresse e-mail non valide. Veuillez ajoutez un adresse e-mail valide.';
    return false;
  }
};

// ******************************** Validation Zipcode *********************************

form.zipcode.addEventListener('change', function(){
  validZipcode(this);
})

function validZipcode (inputZipCode){
  let regExpZipCode = /^[0-9]{5}$/;
  let testZipCode = regExpZipCode.test(inputZipCode.value);
  let small = inputZipCode.nextElementSibling;

  if(testZipCode){
    small.innerHTML = '';
    return true;
  }else{
    small.innerHTML = 'Code postale non valide. Veuillez ajoutez un code postale valide.';
    return false;
  }
}

// ******************************** Validation Formulaire *********************************
// form.addEventListener('submit', function(e){
//   e.preventDefault();

//   if(fromInput(form.email) && validZipcode(form.zipcode)){
//     form.submit();
//     window.location.href = "commande.html";
//   }
// });