document.getElementById('orderId').innerHTML = get('orderId');
document.getElementById('price').innerHTML = get('price');

localStorage.clear();

if(!get('orderId')){
    document.getElementById('qntProduct').style.display = 'none';
}