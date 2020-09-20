let porductIds = get('products');

infoPagePanierEmpety();
function infoPagePanierEmpety(){
  let ifBasketEmpty = document.getElementById('ifBasketEmpty');
  ifBasketEmpty.innerHTML = 'Le panier est vide, Veuillez ajoutez un produit s\'il vous plaît';
  ifBasketEmpty.style.color = '#2F4F4F';
  ifBasketEmpty.style.fontWeight = 'bolder';
  ifBasketEmpty.style.fontSize = '2em';
  ifBasketEmpty.style.textAlign = 'center'
}

if (porductIds){
  ajax("http://localhost:3000/api/furniture")
  .then((products) => {
    for(const panier of porductIds){
      let store =  `
        <div class="card" style="width: 16rem">
        <img src="${panier.image}" class="card-img-top" alt="${panier.name}">
          <div class="card-body">
            <h2 class="card-title">${panier.name}</h2>
            <p class="card-text"><strong>Prix :</strong> ${displayPrice(panier.price)} €</p>
            <p class="card-text"><strong>Vernie :</strong> ${panier.varnish}</p>
            <p class="card-text"><strong>Quantité :</strong> ${panier.quantity}</p>
          </div>
        </div>`
        let mainId = document.getElementById('main');
        mainId.innerHTML += store;
        ifBasketEmpty.style.display = "none";
    }
  }
)}

additionPrice()
function additionPrice(){
  let showPriceParagraph = document.getElementById('show-totalprices');
  let priceTotals = 0;
  for(const priceTotal of porductIds){

  let price = priceTotal.price / 100;
  let priceArticle = price * priceTotal.quantity;
  priceTotals += priceArticle;
  showPriceParagraph.innerHTML = `<strong>Prix total : </strong>${priceTotals} <strong>€</strong>`;  
  formShop(priceTotal);

} function formShop(priceTotal) {
    if(priceTotal = true){
      document.getElementById('form').innerHTML =  `
      <section>
        <div class="container">
          <form id="myForm" method="POST">
            <div class="form-row">
            <div class="form-group col-md-6">
              <input type="text" name="nom" class="form-control" placeholder="Votre nom" id="frsname" required>
            </div>
            <div class="form-group col-md-6">
              <input type="text"  name="prenom" class="form-control" placeholder="Votre prénom" id="scdname" required>
            </div>
            <div class="form-group col-md-6">
              <label for="email"></label>
              <input type="email" name="email" class="form-control" placeholder="Email" id="email" required>
              <p style="color: red;" id="erreur"></p>
            </div>
            </div>
            <div class="form-group">
              <label for="adress">Addresse</label>
              <input type="text" name="adresse" class="form-control" id="adress" required>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="city">Ville</label>
                <input type="text" name="city" class="form-control" id="city" required>
              </div>
              <div class="form-group col-md-2">
                <label for="zipcode">Code postale</label>
                <input type="text" name="zipcode" class="form-control" id="zip-code" required>
                <span style="color: red;" id="erreur-zipcde"></span>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Envoyez</button>
          </form>  
        </div>
      </section>
      `
    }
  }
}

formListenVars()
function formListenVars(){
  let form = document.querySelector('#myForm');
  let erreur = document.getElementById('erreur');
  form.email.addEventListener('change', function(){
    additionPrice(this);
  });
}

additionPrice = function(inputEmail){
  let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
  let testEmail = emailRegExp.test(inputEmail.value);
  if(testEmail){
    erreur.innerHTML = '';
  }else{
    erreur.innerHTML = 'Adresse e-mail non valide. Veuillez ajoutez un adresse e-mail valide.';
    erreur.style.fontWeight = 'bolder';
    erreur.style.fontSize = '1em';
    // ereurZCode.remove();
  } 
};

// ZipCodListenVars()
// function ZipCodListenVars(){
  let formZCode = document.querySelector('#myForm');
  let ereurZCode = document.getElementById('erreur-zipcde');
  formZCode.zipcode.addEventListener('change', function(){
    additionPrice(this);
  })
// }

additionPrice = function (inputZipCode){
  let regExpZipCode = /^[0-9]{5}$/;
  let testZipCode = regExpZipCode.test(inputZipCode.value);

  if(testZipCode){
    ereurZCode.innerHTML = '';
  }else{
    ereurZCode.innerHTML = 'Code postale non valide. Veuillez ajoutez un code postale valide.';
    ereurZCode.style.fontWeight = 'bolder';
    ereurZCode.style.fontSize = '1em';
  }
}

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