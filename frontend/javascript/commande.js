let orderId = getDataFromUrl('order_id');
let total = getDataFromUrl('total');

document.getElementById('orderId').innerHTML = orderId;//Récupération confirmation de la commande depuis URL puis on affiche 
document.getElementById('price').innerHTML = displayPrice(total);//Récupération le prix total de la commande depuis URL puis on affiche 
hide('qntProduct');

localStorage.clear();//Suppression local storage