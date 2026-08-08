// Filtro de Busca Interativo em Tempo Real
// e integração com o carrinho via localStorage

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const items = document.querySelectorAll('.item-list li');
    const sections = document.querySelectorAll('.menu-section');
    const cartCount = document.querySelector('.cart-count');
    const cartKey = 'ruahCart';

    function getCart() {
        return JSON.parse(localStorage.getItem(cartKey) || '[]');
    }

    function setCart(cart) {
        localStorage.setItem(cartKey, JSON.stringify(cart));
    }

    function updateCartCount() {
        if (!cartCount) return;

        const count = getCart().reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = count;
    }

    function isLoggedIn() {
        return localStorage.getItem('ruahLoggedIn') === 'true';
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.left = '50%';
        toast.style.bottom = '20px';
        toast.style.transform = 'translateX(-50%)';
        toast.style.padding = '12px 20px';
        toast.style.background = '#dca854';
        toast.style.color = '#1a0f07';
        toast.style.borderRadius = '999px';
        toast.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.3)';
        toast.style.zIndex = 1000;
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.2s ease, bottom 0.2s ease';

        document.body.appendChild(toast);
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.bottom = '30px';
        });

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.bottom = '20px';
            toast.addEventListener('transitionend', () => toast.remove(), { once: true });
        }, 2000);
    }

    function addToCart(product) {
        const cart = getCart();
        const existing = cart.find(item => item.id === product.id);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        setCart(cart);
        updateCartCount();
        showToast(`"${product.name}" adicionado ao carrinho.`);
    }

    function bindAddButtons() {
        items.forEach(item => {
            const button = item.querySelector('.add-to-cart');
            if (!button) return;

            button.addEventListener('click', () => {
                if (!isLoggedIn()) {
                    showToast('Faça login para adicionar itens ao carrinho.');
                    setTimeout(() => window.location.href = 'login.html', 1200);
                    return;
                }

                const product = {
                    id: item.dataset.id,
                    name: item.querySelector('.item-name').textContent.trim(),
                    price: Number(item.dataset.price),
                    image: item.dataset.image || 'img/bolo.jpg'
                };

                addToCart(product);
            });
        });
    }

    function filterMenu(searchTerm) {
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchTerm) ? '' : 'none';
        });

        sections.forEach(section => {
            const visibleItems = section.querySelectorAll('.item-list li:not([style*="display: none"])');
            section.style.display = visibleItems.length === 0 && searchTerm !== '' ? 'none' : 'block';
        });
    }

    bindAddButtons();
    updateCartCount();

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterMenu(searchTerm);
    });
});