document.getElementById('addToCart').addEventListener('click', function(){
 let products = [];
    if (get('products')){
      products = get('products');
    }
    products.push(product._id);
    store('products', products);
  });

  
  function store(key, value){
    return localStorage.setItem(key, JSON.stringify(value));
  }
  
  function get(key){
    return JSON.parse(localStorage.getItem(key));
  }