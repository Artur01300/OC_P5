let porductIds = get('products');

for(const panier of porductIds){
    console.log(panier)
    let store =  `
    <div class="card" style="width: 18rem">
    <img src="${panier.image}" class="card-img-top" alt="${panier.name}">
      <div class="card-body">
        <h2 class="card-title">${panier.name}</h2>
      
        <p class="card-text">${displayPrice(panier.price)} €</p>
        <p class="card-text">${panier.varnish}</p>
        <p class="card-text">${panier.quantity}</p>
      </div>
    </div>`
    let mainId = document.getElementById('main');    
    mainId.innerHTML += store;
}


// if (porductIds){
//     ajax("http://localhost:3000/api/furniture")
//     .then((products) => {
//         console.log(products[0].name);

//         for(const porductIdsShow of porductIds){ //boucle sur tous les produits
//             let mainId = document.getElementById('main');

//             if(porductIdsShow){

//                for(let showPortucts of products){
//                    console.log(showPortucts.name);
//                    mainId.innerHTML = 

//                     `<div class="card mb-3" style="max-width: 540px;">
//                     <h2 class="card-title">${showPortucts.name}</h2>
//                         <div class="row no-gutters">
//                         <div class="col-md-4">
//                             <img src="${showPortucts.imageUrl}" class="card-img" alt="${showPortucts.name}">
//                         </div>
//                         <div class="col-md-">
//                             <div class="card-body">
//                             <h5 class="card-title">${showPortucts.description}</h5>
//                             <p class="card-text">${displayPrice(showPortucts.price)} €</p>
                            
//                             <p class="card-text"><small class="text-muted">Référance de produit : ${showPortucts._id}</small></p>
//                             <span class="btn btn-primary" id="addToCart">Supprimer le produit</span>
//                             </div>
//                         </div>
//                         </div>
//                 </div>`;

//                 // break;
//                }
//            }
//         }   
//     });
// }


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
