let url = "http://localhost:3000/api/furniture/" + getIdUrl();

ajax(url).then((product) => {
  displayProduct(product);

  listenForCartAddition(product);

  function displayProduct(product){
    document.getElementById('main').innerHTML += renderProduct(product, 'single');
  }

  function listenForCartAddition(product){
    document.getElementById('addToCart').addEventListener('click', function(){
      let products = [];
      if(get('products')){
        products = get('products');
      }
  
      products.push( {id: product._id, name: product.name, image: product.imageUrl, price: product.price, quantity: 1, varnish: options.value } );
      store('products', products);
    });
  }
})

  function getIdUrl(){
    const urlProd = new URLSearchParams(window.location.search);
    return urlProd.get("id");
  }