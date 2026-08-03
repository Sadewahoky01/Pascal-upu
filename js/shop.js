// shop.js - Handling Keranjang Sewa Peralatan Outdoor & WhatsApp Checkout

let cart = [];
let total = 0;

export function initShop() {
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.checkoutWA = checkoutWA;
    updateCartUI();
}

function addToCart(itemName, price) {
    cart.push({ name: itemName, price: price });
    total += price;
    updateCartUI();
}

function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        total -= cart[index].price;
        cart.splice(index, 1);
        updateCartUI();
    }
}

function updateCartUI() {
    const cartList = document.getElementById('cartList');
    const cartTotal = document.getElementById('cartTotal');

    if (!cartList || !cartTotal) return;

    if (cart.length === 0) {
        cartList.innerHTML = '<li style="color: rgba(255,255,255,0.5);">Keranjang sewa Anda masih kosong.</li>';
        cartTotal.innerText = 'Rp 0';
        return;
    }

    cartList.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name} - Rp ${item.price.toLocaleString('id-ID')}</span>
            <button class="remove-btn" onclick="removeFromCart(${index})" title="Hapus Item">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;
        cartList.appendChild(li);
    });

    cartTotal.innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

function checkoutWA() {
    if (cart.length === 0) {
        alert('Silakan pilih setidaknya satu peralatan sebelum memesan!');
        return;
    }

    let message = '*FORMULIR SEWA ALAT - MAPALA PASCAL UPU*\n\nSaya ingin menyewa item berikut:\n';
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} (Rp ${item.price.toLocaleString('id-ID')})\n`;
    });
    message += `\n*Total Estimasi:* Rp ${total.toLocaleString('id-ID')} / hari`;

    const phone = "6281234567890"; // Ganti dengan nomor WhatsApp pengelola MAPALA PASCAL
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
