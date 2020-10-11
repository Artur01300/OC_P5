// ça marche ****************
// let getTest = get(localStorage);
// console.log(localStorage)

// marche pas ****************
// const  a = fetchOrder()
// console.log(a)

// marche pas ****************
// let b = orderId;
// console.log(b)

// let orderIds = fetchOrder(orderId);
// console.log(orderId);


let orderId = get('orderId');
// localStorage.clear();

document.getElementById('main').innerHTML = `
<div class="card" style="width: 20rem col-md-4">
    <div class="card-body">
        <p class="card-text"><strong>Merci pour votre commande.</strong></p>
        <p class="card-text"><strong>Voici votre numéro de comfirmation : </strong>${orderId}</p>

    </div>
</div>`;

// <p class="card-text">${displayTotal(total)} €</p>

// let a = displayTotal;
// console.log(a)

// console.log(total)
// console.log(displayTotal(total))
// let a = displayTotal()

// document.getElementById('main-test').innerHTML = a;