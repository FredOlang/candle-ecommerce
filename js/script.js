let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = cart.length;
updateCartCount();

// Ajouter un produit au panier
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.getAttribute('data-name');
        const productPrice = parseFloat(this.getAttribute('data-price'));

        cart.push({ name: productName, price: productPrice });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${productName} has been added to your cart!`);
    });
});

// Mettre à jour le nombre d'articles dans le panier
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

// Afficher le contenu du panier sur la page cart.html
if (document.title === 'Cart - Artisanal Candles') {
    const cartList = document.getElementById('cart-list');
    const totalPriceElem = document.getElementById('total-price');

    let totalPrice = 0;
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - €${item.price}`;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function() {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.reload(); // Recharger la page pour mettre à jour la liste
        });
        
        li.appendChild(removeButton);
        cartList.appendChild(li);

        totalPrice += item.price;
    });

    totalPriceElem.textContent = totalPrice;

    document.getElementById('clear-cart').addEventListener('click', function() {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.reload();
    });
}
