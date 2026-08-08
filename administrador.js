/* =========================================
   ELEMENTOS
========================================= */

const navItems = document.querySelectorAll(".nav-item");

const actionButtons =
    document.querySelectorAll(".action-button");

const toast =
    document.getElementById("toast");


/* =========================================
   NAVEGAÇÃO
========================================= */

navItems.forEach(button => {

    button.addEventListener("click", () => {

        navItems.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        const page =
            button.dataset.page;

        const pageTitle =
            document.querySelector(".page-title");

        if (page === "dashboard") {

            pageTitle.textContent = "Painel Geral";
            showToast("Painel Geral selecionado.");

        }

        else if (page === "menu") {

            pageTitle.textContent = "Cardápio";
            showToast("Abrindo o Cardápio...");
            window.location.href = "cardapio.html";

        }

        else if (page === "team") {

            pageTitle.textContent = "Equipe";
            showToast("Abrindo a Equipe...");
            window.location.href = "sobrenos.html";

        }

    });

});


/* =========================================
   AÇÕES RÁPIDAS
========================================= */

actionButtons.forEach(button => {

    button.addEventListener("click", () => {

        const action =
            button.dataset.action;

        switch (action) {

            case "bolo":
                const boloName = prompt("Digite o nome do novo bolo:");
                if (boloName) {
                    showToast(`Novo bolo "${boloName}" adicionado ao cardápio.`);
                } else {
                    showToast("Ação de novo bolo cancelada.");
                }
                break;

            case "evento":
                const eventName = prompt("Digite o nome do novo evento:");
                if (eventName) {
                    showToast(`Evento "${eventName}" criado com sucesso.`);
                } else {
                    showToast("Ação de novo evento cancelada.");
                }
                break;

            case "funcionario":
                const employeeName = prompt("Digite o nome do novo funcionário:");
                if (employeeName) {
                    showToast(`Funcionário "${employeeName}" cadastrado.`);
                } else {
                    showToast("Ação de novo funcionário cancelada.");
                }
                break;

        }

    });

});


/* =========================================
   TOAST
========================================= */

let toastTimer;

function showToast(text) {

    clearTimeout(toastTimer);

    toast.textContent = text;

    toast.classList.add("show");

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2800);

}


/* =========================================
   SIMULAÇÃO DE ATUALIZAÇÃO
========================================= */

// Exemplo de como atualizar o número
// de pedidos pelo JavaScript.

function atualizarPedidos(numero) {

    const cards =
        document.querySelectorAll(".stat-card");

    const pedidosCard = cards[0];

    const valor =
        pedidosCard.querySelector(".stat-value");

    valor.textContent = numero;
}


function carregarPedidos() {
    const storedOrders = JSON.parse(localStorage.getItem('ruahPedidos') || '[]');
    const tbody = document.querySelector('tbody');

    if (!tbody) {
        return;
    }

    if (storedOrders.length === 0) {
        atualizarPedidos(tbody.querySelectorAll('tr').length);
        return;
    }

    storedOrders.forEach(order => {
        const row = document.createElement('tr');

        const itemsText = order.items
            .map(item => `${item.quantity}x ${item.name}`)
            .join(', ');

        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.date}</td>
            <td>${itemsText}</td>
            <td>${order.total}</td>
            <td>${order.status}</td>
        `;

        tbody.appendChild(row);
    });

    atualizarPedidos(document.querySelectorAll('tbody tr').length);
}

carregarPedidos();


// Exemplo:
// atualizarPedidos(5);