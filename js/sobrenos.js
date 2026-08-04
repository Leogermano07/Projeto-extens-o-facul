// Adiciona interatividade visual aos Cards da Equipe
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.team-card');

    cards.forEach(card => {
        // Efeito ao passar o mouse por cima
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.4)';
        });

        // Efeito ao tirar o mouse
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });
});