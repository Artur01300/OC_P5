let url = "http://localhost:3000/api/furniture/" + getIdUrl();

ajax(url).then((product) => {
  displayProduct(product);

  listenForCartAddition(product);

  function displayProduct(product){
    document.getElementById('main').innerHTML += renderProduct(product, 'single');
  }

  function listenForCartAddition(product){
    let addToCart = document.getElementById('addToCart');
    addToCart.addEventListener('click', () => {
        let products = [];
        if (get('products')) {
          products = get('products');
        }
        products.push({ id: product._id, name: product.name, image: product.imageUrl, price: product.price, quantity: 1, varnish: options.value });
        store('products', products);
        if (products = get('products')) {
          // addToCart.style.backgroundColor = 'grey';
          // addToCart.innerHTML.disabled = true; // ne marche pas
          // addToCart.innerHTML = `<a href="panier.html"></a>`; // ne marche pas
          addToCart.innerHTML = alert('Pruduit ajouté dans le panier');
          addToCart.style.display = "none";
        }
        // if(product._id){
        //   console.log(product._id,)
        // }
      });
  }
})


  function getIdUrl(){
    const urlProd = new URLSearchParams(window.location.search);
    return urlProd.get("id");
  }