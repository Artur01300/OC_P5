let url = "http://localhost:3000/api/furniture";
countTotalProductsInBasket();

ajax(url)
.then((products) => {
  diplayProducts(products);
})
.catch(err =>{
 if (err === 0){
    alert("Erreur 500, impossible d'établir une connection au serveur");
  }
});

function diplayProducts(products){
  const main = document.getElementById('main');
  for(const product of products){
    main.innerHTML += renderProduct(product,'card');
  }
}