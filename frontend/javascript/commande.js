let orderId = get('orderId');
let price = get('price');

localStorage.clear();

showOrderId();
function showOrderId(){
    document.getElementById('main').innerHTML = `
    <div class="card" style="width: 20rem col-md-4">
        <div class="card-body show-order">
            <p class="card-text"><strong>Merci pour votre commande.</strong></p>
            <p class="card-text"><strong>Votre numéro de comfirmation est : </strong>${orderId}</p>
            <p class="card-text"><strong>Total :</strong> ${price} €</p>
        </div>
    </div>`;
    hideCountProductBascket();
}

function hideCountProductBascket(){
    if(!get('orderId')){
       document.getElementById('qntProduct').style.display = 'none';
    }
}