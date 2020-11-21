document.getElementById('orderId').innerHTML = get('orderId');// Récupération confirmation de la commande depuis LocalStorage puis on affiche 
document.getElementById('price').innerHTML = get('price');// Récupération le prix total de la commande depuis LocalStorage puis on affiche 

localStorage.clear();// Suppression local storage 

if(!get('orderId')){// Désactivation l'élément qui affichait les nombres du produit (Bar de navigation/ à côté 'panier")
    document.getElementById('qntProduct').style.display = 'none';
}