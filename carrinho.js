/* =========================================
   ELEMENTOS
========================================= */

const cartKey = "ruahCart";

const subtotalElement =
    document.getElementById("subtotal");

const totalElement =
    document.getElementById("total");

const giftCheckbox =
    document.getElementById("gift");

const couponInput =
    document.getElementById("coupon");

const couponMessage =
    document.getElementById("couponMessage");

const toast =
    document.getElementById("toast");

const cartItemsContainer =
    document.getElementById("cartItemsContainer");

const emptyMessage =
    document.getElementById("emptyMessage");

const navButtons =
    document.querySelectorAll(".nav");

function isLoggedIn() {
    return localStorage.getItem('ruahLoggedIn') === 'true';
}


/* =========================================
   VALORES
========================================= */

const deliveryFee = 10;

const giftFee = 15;

let discount = 0;


/* =========================================
   FORMATA MOEDA
========================================= */

function formatMoney(value) {

    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


/* =========================================
   CALCULAR CARRINHO
========================================= */

function getCart() {
    return JSON.parse(localStorage.getItem(cartKey) || "[]");
}

function setCart(cart) {
    localStorage.setItem(cartKey, JSON.stringify(cart));
}

function updateCartCount() {
    const badge = document.querySelector(".cart-count");
    if (!badge) return;

    const quantity = getCart().reduce(
        (total, item) => total + item.quantity,
        0
    );

    badge.textContent = quantity;
}

function renderCart() {
    const cart = getCart();

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        emptyMessage.style.display = "block";
        calculateCart();
        return;
    }

    emptyMessage.style.display = "none";

    cart.forEach(item => {
        cartItemsContainer.insertAdjacentHTML(
            "beforeend",
            `
            <div class="cart-item" data-price="${item.price}" data-id="${item.id}">
                <div class="product-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="product-name">${item.name}</div>
                <div class="quantity">
                    <button class="minus">−</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="plus">+</button>
                </div>
                <div class="price">${formatMoney(item.price)}</div>
                <button class="remove">🗑<span>Remover</span></button>
            </div>
            `
        );
    });

    setupQuantityButtons();
    setupRemoveButtons();
    calculateCart();
}

function calculateCart() {

    let subtotal = 0;

    document
        .querySelectorAll(".cart-item")
        .forEach(item => {

            const price =
                Number(item.dataset.price);

            const quantity =
                Number(
                    item.querySelector(
                        ".quantity-value"
                    ).textContent
                );

            subtotal += price * quantity;

        });


    if (subtotal < 0) {
        subtotal = 0;
    }

    if (subtotal === 0) {
        discount = 0;
        couponMessage.textContent = "";
    }


    subtotalElement.textContent =
        formatMoney(subtotal);


    let total =
        subtotal === 0
            ? 0
            : subtotal +
              deliveryFee +
              (giftCheckbox.checked ? giftFee : 0) -
              discount;


    if (total < 0) {
        total = 0;
    }


    totalElement.textContent =
        formatMoney(total);

}


/* =========================================
   BOTÕES + E -
========================================= */

function setupQuantityButtons() {

    document
        .querySelectorAll(".plus")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const item =
                        button.closest(
                            ".cart-item"
                        );

                    const quantity =
                        item.querySelector(
                            ".quantity-value"
                        );

                    let value =
                        Number(
                            quantity.textContent
                        );

                    value++;
                    quantity.textContent = value;
                    updateCartQuantity(item.dataset.id, value);
                    calculateCart();
                    updateCartCount();

                }
            );

        });


    document
        .querySelectorAll(".minus")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const item =
                        button.closest(
                            ".cart-item"
                        );

                    const quantity =
                        item.querySelector(
                            ".quantity-value"
                        );

                    let value =
                        Number(
                            quantity.textContent
                        );


                    if (value > 1) {

                        value--;
                        quantity.textContent = value;
                        updateCartQuantity(item.dataset.id, value);
                        calculateCart();
                        updateCartCount();

                    }

                }
            );

        });

}


/* =========================================
   REMOVER PRODUTO
========================================= */

function updateCartQuantity(id, quantity) {
    const cart = getCart();
    const item = cart.find(product => product.id === id);
    if (!item) return;

    item.quantity = quantity;
    setCart(cart);
}

function removeCartItem(id) {
    const cart = getCart().filter(item => item.id !== id);
    setCart(cart);
}

function setupRemoveButtons() {

    document
        .querySelectorAll(".remove")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const item =
                        button.closest(
                            ".cart-item"
                        );

                    item.style.opacity = "0";
                    item.style.transform =
                        "translateX(30px)";
                    item.style.transition =
                        ".25s";

                    setTimeout(() => {
                        removeCartItem(item.dataset.id);
                        renderCart();
                        updateCartCount();
                        showToast(
                            "Produto removido do carrinho."
                        );
                    }, 250);

                }
            );

        });

}


/* =========================================
   PRESENTE
========================================= */

giftCheckbox.addEventListener(
    "change",
    () => {

        calculateCart();

        if (giftCheckbox.checked) {

            showToast(
                "Embalagem de presente adicionada."
            );

        } else {

            showToast(
                "Embalagem de presente removida."
            );

        }

    }
);

navButtons.forEach(button => {
    button.addEventListener("click", () => {
        navButtons.forEach(item => item.classList.remove("active"));
        button.classList.add("active");

        const destination = button.textContent.trim();

        switch (destination) {
            case "Painel Geral":
                window.location.href = "index.html";
                break;
            case "Cardápio":
                window.location.href = "cardapio.html";
                break;
            case "Histórico de Pedidos":
                showToast("Histórico de pedidos ainda não está disponível.");
                break;
            case "Meus Dados":
                window.location.href = "login.html";
                break;
        }
    });
});


/* =========================================
   CUPOM
========================================= */

document
    .getElementById("applyCoupon")
    .addEventListener(
        "click",
        () => {

            const coupon =
                couponInput.value
                    .trim()
                    .toUpperCase();


            if (!coupon) {

                couponMessage.textContent =
                    "Digite um cupom.";

                return;
            }


            /*
             * Exemplo de cupom.
             *
             * Em um site real, a validação
             * deve ser feita no backend.
             */

            if (coupon === "RUAH10") {

                discount = 10;

                couponMessage.textContent =
                    "Cupom aplicado: R$ 10,00 de desconto.";

                couponMessage.style.color =
                    "#8fe09b";

                calculateCart();

                showToast(
                    "Cupom aplicado com sucesso!"
                );

            } else {

                discount = 0;

                couponMessage.textContent =
                    "Cupom inválido.";

                couponMessage.style.color =
                    "#ef8c70";

                calculateCart();

            }

        }
    );


/* =========================================
   CEP
========================================= */

document
    .getElementById("changeCep")
    .addEventListener(
        "click",
        () => {

            const cep =
                document
                    .getElementById("cep")
                    .value
                    .trim();


            if (cep.length < 8) {

                showToast(
                    "Digite um CEP válido."
                );

                return;
            }


            showToast(
                "CEP atualizado."
            );

        }
    );


/* =========================================
   FINALIZAR COMPRA
========================================= */

document
    .getElementById("checkout")
    .addEventListener(
        "click",
        () => {

            const items =
                document.querySelectorAll(
                    ".cart-item"
                );


            if (items.length === 0) {

                showToast(
                    "Seu carrinho está vazio."
                );

                return;
            }

            const orderItems = Array.from(items).map(item => {
                const name = item.querySelector('.product-name').textContent.trim();
                const quantity = Number(item.querySelector('.quantity-value').textContent.trim());
                const price = Number(item.dataset.price);

                return {
                    name,
                    quantity,
                    unitPrice: price,
                    totalPrice: price * quantity
                };
            });

            const orderTotal = totalElement.textContent.trim();
            const orderId = `RUAH-${Date.now()}`;
            const orderDate = new Date().toLocaleDateString('pt-BR');

            const totalValue = Number(orderTotal.replace(/[^0-9,]/g, '').replace(',', '.'));

            const newOrder = {
                id: orderId,
                date: orderDate,
                customer: 'Cliente anônimo',
                items: orderItems,
                total: orderTotal,
                totalValue: totalValue,
                status: 'Pendente'
            };

            const storedOrders = JSON.parse(localStorage.getItem('ruahPedidos') || '[]');
            storedOrders.push(newOrder);
            localStorage.setItem('ruahPedidos', JSON.stringify(storedOrders));
            setCart([]);
            updateCartCount();
            renderCart();

            showToast(
                "Pedido salvo. Redirecionando para o painel administrativo..."
            );

            setTimeout(() => {
                window.location.href = 'Administrador.html';
            }, 1600);

        }
    );


/* =========================================
   CONTINUAR COMPRANDO
========================================= */

document
    .getElementById("continueShopping")
    .addEventListener(
        "click",
        () => {

            showToast(
                "Abrindo o cardápio..."
            );

            setTimeout(() => {
                window.location.href = "cardapio.html";
            }, 500);

        }
    );


/* =========================================
   SUPORTE
========================================= */

document
    .getElementById("support")
    .addEventListener(
        "click",
        () => {

            showToast(
                "Abrindo suporte online..."
            );

            setTimeout(() => {
                window.location.href = "contato.html";
            }, 500);

        }
    );


/* =========================================
   TOAST
========================================= */

let toastTimer;

function showToast(text) {

    clearTimeout(toastTimer);

    toast.textContent = text;

    toast.classList.add("show");


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2800);

}


/* =========================================
   INICIALIZAÇÃO
========================================= */

renderCart();
updateCartCount();
