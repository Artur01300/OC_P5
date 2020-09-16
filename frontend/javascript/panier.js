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


function additionPrice(){
  let priceTotals = 0;
  for(const priceTotal of porductIds){
    
  let showPriceParagraph = document.getElementById('show-totalprices');
  
    console.log(priceTotal)
    let priceAritmaitique =  priceTotals + (priceTotal.price * priceTotal.quantity);
    console.log(priceAritmaitique);
    
    // console.log(priceTotal.price);
    // console.log(priceTotal.quantity)

    // let a = priceTotal.price;
   
    // a += priceTotal.price;
    
    // console.log(a)
    }
  }

additionPrice();



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
