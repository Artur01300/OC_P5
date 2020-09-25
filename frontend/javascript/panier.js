let productIds = get('products');

if (productIds){
  document.getElementById('basketEmpty').style.display = 'none';
  document.getElementById('form-section').style.display = 'block';
  ajax("http://localhost:3000/api/furniture")
  .then((products) => {
    totalPrice(products);
  });
}else{
  document.getElementById('basketEmpty').style.display = 'block';
  document.getElementById('form-section').style.display = 'none';
}

function totalPrice(products){
  let total = 0;
  for(const productId of productIds){
    for(let product of products){
      if(productId == product._id){
        document.getElementById('main').innerHTML += renderProduct(product,'cart');
        total += product.price; 
      }
    }
  }
  document.getElementById('show-totalprices').innerHTML = 'Total : ' + displayPrice(total) + ' €';
}



// formListenVars()
// function formListenVars(){
//   let form = document.querySelector('#myForm');
//   let erreur = document.getElementById('erreur');
//   form.email.addEventListener('change', function(){
//     additionPrice(this);
//   });
// }

// additionPrice = function(inputEmail){
//   let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
//   let testEmail = emailRegExp.test(inputEmail.value);
//   if(testEmail){
//     erreur.innerHTML = '';
//   }else{
//     erreur.innerHTML = 'Adresse e-mail non valide. Veuillez ajoutez un adresse e-mail valide.';
//     erreur.style.fontWeight = 'bolder';
//     erreur.style.fontSize = '1em';
//     // ereurZCode.remove();
//   } 
// };

// ZipCodListenVars()
// // function ZipCodListenVars(){
//   let formZCode = document.querySelector('#myForm');
//   let ereurZCode = document.getElementById('erreur-zipcde');
//   formZCode.zipcode.addEventListener('change', function(){
//     additionPrice(this);
//   })
// }

//  function additionPrice (inputZipCode){
//   let regExpZipCode = /^[0-9]{5}$/;
//   let testZipCode = regExpZipCode.test(inputZipCode.value);

//   if(testZipCode){
//     ereurZCode.innerHTML = '';
//   }else{
//     ereurZCode.innerHTML = 'Code postale non valide. Veuillez ajoutez un code postale valide.';
//     ereurZCode.style.fontWeight = 'bolder';
//     ereurZCode.style.fontSize = '1em';
//   }
// }

//****************** erreur  ******************

// let formZCode = document.querySelector('#myForm');
// let ereurZCode = document.getElementById('erreur-zipcde');

// formZCode.zipcode.addEventListener('change', function(){
//   let regExpZipCode = /^[0-9]{5}$/;
//   let testZipCode = regExpZipCode.test(ereurZCode.value);
 
//   console.log(testZipCode)
//   if(testZipCode){
//     ereurZCode.innerHTML = 'bien';
//     console.log(testZipCode)
//     console.log('terst')
//   }else{
//     console.log(testZipCode)
//     ereurZCode.innerHTML = 'Code postale non valide. Veuillez ajoutez un code postale valide.';
//     ereurZCode.style.fontWeight = 'bolder';
//     ereurZCode.style.fontSize = '1em';
//   }
// })