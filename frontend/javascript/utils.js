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
    <div class="card mb-3" style="max-width: 540px;">
         <div class="row no-gutters">
           <div class="col-md-4">
             <img src="${product.imageUrl}" class="card-img" alt="${product.name}">
          </div>
          <div class="col-md-">
            <div class="card-body">
              <h5 class="card-title">${product.description}</h5>
              <p class="card-text">${displayPrice(product.price)} €</p>
              <select>
                <option id="select-varnish">${selectVarnish(product)}</option>
              </select>
              <p class="card-text"><small class="text-muted">Référance de produit : ${product._id}</small></p>
              <a href="panier.html" class="btn btn-primary">Ajoutez dans le panier</a>
            </div>
          </div>
      </div>
      </div>`;
    }
}

function selectVarnish(product){
  let select = document.getElementById('select-varnish'); 
  for(let typeVarnish of product.varnish){
    console.log(select += typeVarnish);
    return select = typeVarnish;
  }
}
// main.innerHTML += renderProduct(product, 'single');