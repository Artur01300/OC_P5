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
    let options = document.getElementById('options');
      for(let varnishe of product.varnish){
        options += `<option>${varnishe}</option>`;
      }
      return`
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img src="${product.imageUrl}" class="card-img" alt="${product.imageUrl}">
            </div>
            <div class="col-md-">
              <div class="card-body">
                <h5 class="card-title">${product.description}</h5>
                <p class="card-text">${displayPrice(product.price)} €</p>
                <select id="options">${options}</select>
                <p class="card-text"><small class="text-muted"><strong>Référance de produit :</strong> ${product._id}</small></p>
              </div>
            </div>
          </div>
        </div>`;
  }
  if (type === 'cart'){
    return`
    <div class="card mb-3" style="max-width: 540px;">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${product.imageUrl}" class="card-img" alt="${product.imageUrl}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text" id="delete-${product._id}"><i class="fas fa-trash col-md-12"></i></p>
            <p class="card-text"> ${displayPrice(product.price)} €</p>
          </div>
        </div>
      </div>
    </div
    `
  }
}

function store(key, value){
  return localStorage.setItem(key, JSON.stringify(value)); 
}

function get(key){
 return JSON.parse(localStorage.getItem(key));
}