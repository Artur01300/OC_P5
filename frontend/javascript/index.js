
let url = "http://localhost:3000/api/furniture";

ajax(url)
.then((products) => {
  diplayProducts(products); 
});

function diplayProducts(products){
  const main = document.getElementById('main');
  for(const product of products){
    main.innerHTML += renderProduct(product,'card');
  }
}