let productIds = get('products');

if (productIds){
  document.getElementById('basketEmpty').style.display = 'none';
  document.getElementById('form-section').style.display = 'block';
  ajax("http://localhost:3000/api/furniture")

  .then((products) => {     
    let total = countTotal(productIds, products);
    displayTotal(total);
    displayProducts(productIds, products);

    for(const productId of productIds){      
      for(let product of products){
        if(productId == product._id){
          document.getElementById('delete-' + product._id).addEventListener('click', function(){

            if(productIds.includes(product._id)){    
              console.log(productIds)        
              let index = productIds.indexOf(product._id);           
              productIds.splice(index,1);
              store('products', productIds);
              location.reload();
            }    
            // if(total != 0){
            //   console.log(total)         
            //   localStorage.clear('products');
            //   location.reload();           
            //   alert(productId + ' : ' + ' Test productIds');
            // }else{
            //   alert(productId + ' : ' +' Test a fair');
            // }
          })
        }
      }
    }
  });
}else{     
  document.getElementById('basketEmpty').style.display = 'block';
  document.getElementById('form-section').style.display = 'none';
}

function displayProducts(productIds, products){
  for(const productId of productIds){
    for(let product of products){
      if(productId == product._id){
        document.getElementById('main').innerHTML += renderProduct(product,'cart');
      }
    }
  }      
}

function displayTotal(total){
  document.getElementById('show-totalprices').innerHTML = 'Total : ' + displayPrice(total) + ' €';
  if(total === 0){           
    localStorage.clear('products');
    location.reload();         
  }
}

function countTotal(productIds, products){
  let total = 0;
  for(const productId of productIds){
    for(let product of products){
      if(productId == product._id){       
        total += product.price; 
      }
    }
  }
  return total;
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

form.addEventListener('submit', function(e){
  e.preventDefault();

  if(fromInput(form.email) && validZipcode(form.zipcode)){
    form.submit();
    window.location.href = "commande.html";
  }
});