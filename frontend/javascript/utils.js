function ajax(url){
  return new Promise((resolve, reject) => {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      let response = JSON.parse(this.responseText);
      resolve(response);
    }
  };

  request.open("GET", url);
  request.send();
  });
}

function displayPrice(price){
    price = price/100;
   return price.toFixed(2);
}

function renderProduct(product, type){
  if (type === 'card'){
    return`
    <div class="card" style="width: 18rem">
        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <h2 class="card-title">${product.name}</h2>
          <p class="card-text">${product.description}.</p>
          <p class="card-text">${displayPrice(product.price)} €</p>
          <a href="product.html?id=${product._id}" class="btn btn-primary">Voir le produit</a>
        </div>
    </div>`
}
if(type === 'single'){
    return `
    <div class="card" style="width: 18rem">
        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
        <h2 class="card-title">${product.name}</h2>
        <p class="card-text">${product.description}.</p>
        <p class="card-text">${displayPrice(product.price)} €</p>
        <a href="panier.html" class="btn btn-primary">Voir le produit</a>
        </div>
    </div>`;
    }
}