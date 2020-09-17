let porductIds = get('products');

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
  }

  function formShop(priceTotal) {
    console.log(priceTotal);
    if(priceTotal = true){
      document.getElementById('form').innerHTML = ` <section>
          <div class="container">
            <form id="myForm">
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
                </div>
              </div>
              <div class="form-group">
                <label for="adress">Addresse</label>
                <input type="text" name="adresse" class="form-control" id="adress" required>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="city">Ville</label>
                  <input type="text" name="ville" class="form-control" id="city" required>
                </div>
                <div class="form-group col-md-2">
                  <label for="zipcode">Code postale</label>
                  <input type="text" name="codpostal" class="form-control" id="zipcode" required>
                </div>
              </div>
              <button type="submit" class="btn btn-primary">Envoyez</button>
            </form>  
            <p style="color: red;" id="erreur"></p>
          </div>
        </section>
        `;
    }
  }
}



// let email = document.getElementById('email');
// let city = document.getElementById('city');

// function check_Zip(){
//     let zipCode = document.getElementById('zipcod');
//     let regex = /^[0-9]/;
   
//     if(regex.test(zipCode) == false){
//     alert("test1");
//     return false;
//     }
//     if(zipCode == " "){
//     alert("test 2");
//     return false;
//     }
//     return true;
// }
