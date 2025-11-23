const initialBooks = [
    { id: 1, titulo: "O Código Limpo", autor: "Robert C. Martin", genero: "Tecnologia", capa: "https://m.media-amazon.com/images/I/41zoxjP9lcL._SX384_BO1,204,203,200_.jpg" },
    { id: 2, titulo: "O Hobbit", autor: "J.R.R. Tolkien", genero: "Fantasia", capa: "https://m.media-amazon.com/images/I/91b0C2YNSrL.jpg" },
    { id: 3, titulo: "1984", autor: "George Orwell", genero: "Ficção", capa: "https://m.media-amazon.com/images/I/819js3EQwbL.jpg" },
    { id: 4, titulo: "Dom Casmurro", autor: "Machado de Assis", genero: "Clássico", capa: "https://m.media-amazon.com/images/I/71Q1tPupKjL.jpg" },
    { id: 5, titulo: "Entendendo Algoritmos", autor: "Aditya Bhargava", genero: "Tecnologia", capa: "https://m.media-amazon.com/images/I/71Vkg7GfPFL._SY342_.jpg" },
    { id: 6, titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling", genero: "Fantasia", capa: "https://rocco.com.br/wp-content/uploads/2022/12/9788532511010.jpg" },
    { id: 7, titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", genero: "Infantil", capa: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg" },
    { id: 8, titulo: "Sapiens", autor: "Yuval Noah Harari", genero: "História", capa: "https://m.media-amazon.com/images/I/713jIoMO3UL.jpg" }
];

let booksBase = JSON.parse(localStorage.getItem('libraryCatalog')) || initialBooks;

function saveCatalog() {
    localStorage.setItem('libraryCatalog', JSON.stringify(booksBase));
    renderCatalog(); 
}

let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        showApp();
    }
});

function toggleAuthMode() {
    document.getElementById('login-box').classList.toggle('hidden');
    document.getElementById('register-box').classList.toggle('hidden');
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

function handleRegister() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;

    if (!name || !emailRegex.test(email)) {
        alert("Por favor, insira um e-mail válido.");
        return;
    }
    if (!passRegex.test(pass)) {
        alert("A senha deve ter no mínimo 6 caracteres, contendo letras e números.");
        return;
    }

    const users = JSON.parse(localStorage.getItem('usersLibrary')) || [];

    if (users.find(u => u.email === email)) {
        alert("E-mail já cadastrado!");
        return;
    }

    const newUser = { name, email, password: pass, myList: [], reservedList: [] };
    users.push(newUser);
    localStorage.setItem('usersLibrary', JSON.stringify(users));

    alert("Cadastro realizado com sucesso! Faça login.");
    toggleAuthMode();
}

function handleLogin() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;

    const users = JSON.parse(localStorage.getItem('usersLibrary')) || [];
    const user = users.find(u => u.email === email && u.password === pass);

    if (user) {
        currentUser = user;
        localStorage.setItem('loggedUser', JSON.stringify(user));
        showApp();
    } else {
        alert("E-mail ou senha inválidos.");
    }
}
// Navegação Simples
function showApp() {
    document.getElementById('auth-section').classList.add('hidden');
    document.getElementById('main-header').classList.remove('hidden');
    router('catalog'); 
}

function router(route) {
    document.querySelectorAll('.section-content').forEach(el => el.classList.add('hidden'));

    if (route === 'catalog') {
        document.getElementById('catalog-section').classList.remove('hidden');
        renderCatalog();
    } else if (route === 'my-list') {
        document.getElementById('my-list-section').classList.remove('hidden');
        renderMyList();
    } else if (route === 'reserved') {
        document.getElementById('reserved-section').classList.remove('hidden');
        renderReserved();
    } else if (route === 'admin') {
        document.getElementById('admin-section').classList.remove('hidden');
        renderAdminTable();
    }
}

// CRUD
function saveUserData() {
    const users = JSON.parse(localStorage.getItem('usersLibrary')) || [];
    const index = users.findIndex(u => u.email === currentUser.email);
    if (index !== -1) {
        users[index] = currentUser;
        localStorage.setItem('usersLibrary', JSON.stringify(users));
        localStorage.setItem('loggedUser', JSON.stringify(currentUser));
    }
}

function renderCatalog() {
    const container = document.getElementById('catalog-grid');
    container.innerHTML = '';

    booksBase.forEach(book => {
        const inList = currentUser.myList.some(item => item.id === book.id);
        const isReserved = currentUser.reservedList?.some(item => item.id === book.id);

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${book.capa}" alt="${book.titulo}">
            <div class="card-body">
                <div>
                    <span class="tag">${book.genero}</span>
                    <h4>${book.titulo}</h4>
                    <p>${book.autor}</p>
                </div>
                
                <div style="display: flex; gap: 5px; margin-top: auto;">
                    <button class="btn-add" onclick="addToMyList(${book.id})" 
                        ${inList ? 'disabled style="opacity:0.5"' : ''}>
                        ${inList ? 'Na Lista' : 'Lista +'}
                    </button>
                    
                    <button class="btn-add" onclick="reserveBook(${book.id})" 
                        style="background-color: #4a47a3;"
                        ${isReserved ? 'disabled style="opacity:0.5"' : ''}>
                        ${isReserved ? 'Reservado' : 'Reservar'}
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function addToMyList(bookId) {
    const book = booksBase.find(b => b.id === bookId);
    if (book) {
        const myBook = { ...book, status: 'Para Ler' };
        currentUser.myList.push(myBook);
        saveUserData();
        alert(`"${book.titulo}" adicionado à sua lista!`);
        renderCatalog();
    }
}

function renderMyList() {
    const container = document.getElementById('my-list-grid');
    container.innerHTML = '';

    if (currentUser.myList.length === 0) {
        container.innerHTML = '<p>Sua lista está vazia. Vá ao catálogo adicionar livros!</p>';
        return;
    }

    currentUser.myList.forEach(book => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${book.capa}" alt="${book.titulo}">
            <div class="card-body">
                <div>
                    <span class="tag" style="background:${book.status === 'Lido' ? '#d4edda' : '#fff3cd'}">
                        ${book.status}
                    </span>
                    <h4>${book.titulo}</h4>
                    <p>${book.autor}</p>
                </div>
                
                <button class="btn-read" onclick="toggleReadStatus(${book.id})">
                    ${book.status === 'Lido' ? 'Ler Novamente' : 'Marcar como Lido'}
                </button>
                
                <button class="btn-remove" onclick="removeFromList(${book.id})">Remover</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function toggleReadStatus(bookId) {
    const book = currentUser.myList.find(b => b.id === bookId);
    if (book) {
        book.status = book.status === 'Para Ler' ? 'Lido' : 'Para Ler';
        saveUserData();
        renderMyList();
    }
}

function removeFromList(bookId) {
    if(confirm("Tem certeza que deseja remover este livro?")) {
        currentUser.myList = currentUser.myList.filter(b => b.id !== bookId);
        saveUserData();
        renderMyList();
    }
}

function reserveBook(bookId) {
    if (!currentUser.reservedList) {
        currentUser.reservedList = [];
    }

    const alreadyReserved = currentUser.reservedList.some(b => b.id === bookId);
    if (alreadyReserved) {
        alert("Você já reservou este livro!");
        return;
    }

    const book = booksBase.find(b => b.id === bookId);

    if (book) {
        const dataReserva = new Date();
        const dataExpiracao = new Date();
        dataExpiracao.setDate(dataReserva.getDate() + 3);

        const reservedBook = {
            ...book,
            dataReserva: dataReserva.toLocaleDateString('pt-BR'),
            dataExpiracao: dataExpiracao.toLocaleDateString('pt-BR')
        };

        currentUser.reservedList.push(reservedBook);
        saveUserData();
        alert(`Reserva realizada! Retire até ${reservedBook.dataExpiracao}.`);

        renderReserved();
        renderCatalog();
    }
}

function cancelReservation(bookId) {
    if(confirm("Deseja cancelar esta reserva?")) {
        currentUser.reservedList = currentUser.reservedList.filter(b => b.id !== bookId);
        saveUserData();
        renderReserved();
        renderCatalog(); 
    }
}

function renderReserved() {
    const container = document.getElementById('reserved-section');
    container.innerHTML = '<h2>Livros Reservados</h2><div id="reserved-grid" class="grid-container"></div>';
    const grid = document.getElementById('reserved-grid');

    if (!currentUser.reservedList || currentUser.reservedList.length === 0) {
        grid.innerHTML = '<p>Você não possui reservas ativas.</p>';
        return;
    }

    currentUser.reservedList.forEach(book => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.borderLeft = "5px solid var(--primary-color)"; 
        
        card.innerHTML = `
            <img src="${book.capa}" alt="${book.titulo}">
            <div class="card-body">
                <div>
                    <span class="tag">Reserva Ativa</span>
                    <h4>${book.titulo}</h4>
                    <small>Validade: <strong>${book.dataExpiracao}</strong></small>
                </div>
                <button class="btn-remove" onclick="cancelReservation(${book.id})">Cancelar Reserva</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function renderAdminTable() {
    const tbody = document.querySelector('#admin-table tbody');
    tbody.innerHTML = '';

    booksBase.forEach(book => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${book.id}</td>
            <td>${book.titulo}</td>
            <td>
                <button class="btn-sm edit" onclick="loadBookToEdit(${book.id})">Editar</button>
                <button class="btn-sm delete" onclick="deleteBook(${book.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function handleBookSave() {
    const id = document.getElementById('book-id').value;
    const titulo = document.getElementById('book-title').value;
    const autor = document.getElementById('book-author').value;
    const genero = document.getElementById('book-genre').value;
    const capa = document.getElementById('book-cover').value || 'https://via.placeholder.com/150'; 

    if (!titulo || !autor) {
        alert("Preencha pelo menos Título e Autor.");
        return;
    }

    if (id) {
        const index = booksBase.findIndex(b => b.id == id);
        if (index !== -1) {
            booksBase[index] = { ...booksBase[index], titulo, autor, genero, capa };
            alert("Livro atualizado com sucesso!");
        }
    } else {
        const newId = Date.now();
        const newBook = { id: newId, titulo, autor, genero, capa };
        booksBase.push(newBook);
        alert("Livro cadastrado com sucesso!");
    }

    saveCatalog();    
    resetForm();      
    renderAdminTable();
}

function loadBookToEdit(id) {
    const book = booksBase.find(b => b.id === id);
    if (book) {
        document.getElementById('book-id').value = book.id;
        document.getElementById('book-title').value = book.titulo;
        document.getElementById('book-author').value = book.autor;
        document.getElementById('book-genre').value = book.genero;
        document.getElementById('book-cover').value = book.capa;

        document.getElementById('form-title').innerText = `Editando: ${book.titulo}`;
        window.scrollTo(0, 0); 
    }
}

function deleteBook(id) {
    if (confirm("Tem certeza que deseja excluir este livro do catálogo?")) {
        booksBase = booksBase.filter(b => b.id !== id);
        saveCatalog();
        renderAdminTable();
    }
}

function resetForm() {
    document.getElementById('book-id').value = '';
    document.getElementById('book-title').value = '';
    document.getElementById('book-author').value = '';
    document.getElementById('book-genre').value = '';
    document.getElementById('book-cover').value = '';
    document.getElementById('form-title').innerText = 'Novo Livro';
}

function logout() {
    if (currentUser) {
        const nomeUsuario = currentUser.name;
        alert(`Até breve, ${nomeUsuario}!`);
    }

    currentUser = null;
    localStorage.removeItem('loggedUser');

    document.getElementById('main-header').classList.add('hidden');
    document.querySelectorAll('.section-content').forEach(el => el.classList.add('hidden'));

    const authSection = document.getElementById('auth-section');
    authSection.classList.remove('hidden');
    authSection.classList.add('active-section');

    document.getElementById('login-box').classList.remove('hidden');
    document.getElementById('register-box').classList.add('hidden');
    document.getElementById('login-email').value = '';
    document.getElementById('login-pass').value = '';
}