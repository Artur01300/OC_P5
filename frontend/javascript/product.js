
const urlProd = new URLSearchParams(window.location.search);

var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        let price = response.price/100;
        price = price.toFixed(2);
        const cartProduct =  
`
    <div class="card" style="width: 18rem">
      <img src="${response.imageUrl}" class="card-img-top" alt="${response.name}">
      <div class="card-body">
        <h2 class="card-title">${response.name}</h2>
        <p class="card-text">${response.description}.</p>
        <p class="card-text">${price} €</p>
        <a href="panier.html" class="btn btn-primary">Voir le produit</a>
      </div>
    </div>
  `
        main.innerHTML += cartProduct;
    }
};
request.open("GET", "http://localhost:3000/api/furniture/" + urlProd.get("id"));
request.send();

const main = document.getElementById('main');