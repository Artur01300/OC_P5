
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        for(const boucle of response){
          main.innerHTML += render(boucle);
        }
    }
};
request.open("GET", "http://localhost:3000/api/furniture");
request.send();

const main = document.getElementById('main');

function render(boucle){
  let price = boucle.price/100;
  price = price.toFixed(2);
 
  return`
  <div class="card" style="width: 18rem; margin: auto;">
    <img src="${boucle.imageUrl}" class="card-img-top" alt="${boucle.name}">
      <div class="card-body">
        <h2 class="card-title">${boucle.name}</h2>
        <p class="card-text">${boucle.description}.</p>
        <p class="card-text">${price} €</p>
        <a href="#" class="btn btn-primary">Voir l'article</a>
      </div>
  </div>
  `
}
