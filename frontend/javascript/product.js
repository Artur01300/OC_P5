let url = "http://localhost:3000/api/furniture/" + getIdUrl();

ajax(url).then((product) => {
  const main = document.getElementById('main');
  main.innerHTML +=  renderProduct(product, 'single');
})

  function getIdUrl(){
    const urlProd = new URLSearchParams(window.location.search);
    return urlProd.get("id");
  }