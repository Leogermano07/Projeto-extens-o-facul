// Filtro de Busca Interativo em Tempo Real
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const items = document.querySelectorAll('.item-list li');
    const sections = document.querySelectorAll('.menu-section');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });

        // Esconde seções vazias caso o usuário busque por algo muito específico
        sections.forEach(section => {
            const visibleItems = section.querySelectorAll('.item-list li[style="display: flex;"]');
            if (visibleItems.length === 0 && searchTerm !== '') {
                section.style.display = 'none';
            } else {
                section.style.display = 'block';
            }
        });
    });
});