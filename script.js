const books = [];
        const RENDER_EVENT = 'render-books';
        const SAVED_EVENT = 'saved-books';
        const STORAGE_KEY = 'BOOKSHELF_APPS';

        function generateId() {
            return +new Date();
        }

        function generateBookObject(id, title, author, year, isCompleted) {
            return {
                id,
                title,
                author,
                year,
                isCompleted
            };
        }

        function findBook(bookId) {
            for (const book of books) {
                if (book.id === bookId) {
                    return book;
                }
            }
            return null;
        }

        function findBookIndex(bookId) {
            for (const index in books) {
                if (books[index].id === bookId) {
                    return index;
                }
            }
            return -1;
        }

        function isStorageExist() {
            if (typeof Storage === 'undefined') {
                alert('Browser kamu tidak mendukung local storage');
                return false;
            }
            return true;
        }

        function saveData() {
            if (isStorageExist()) {
                const serializedData = JSON.stringify(books);
                localStorage.setItem(STORAGE_KEY, serializedData);
                document.dispatchEvent(new Event(SAVED_EVENT));
            }
        }

        function loadDataFromStorage() {
            const serializedData = localStorage.getItem(STORAGE_KEY);
            let data = JSON.parse(serializedData);

            if (data !== null) {
                for (const book of data) {
                    books.push(book);
                }
            }

            document.dispatchEvent(new Event(RENDER_EVENT));
        }

        function makeBookCard(bookObject) {
            const { id, title, author, year, isCompleted } = bookObject;
            
                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');
            
                const titleElement = document.createElement('h5');
                titleElement.classList.add('card-title');
                titleElement.innerText = title;
            
                const authorElement = document.createElement('p');
                authorElement.classList.add('card-text');
                authorElement.innerText = `Penulis: ${author}`;
            
                const yearElement = document.createElement('p');
                yearElement.classList.add('card-text');
                yearElement.innerText = `Tahun: ${year}`;
            
                const buttonContainer = document.createElement('div');
                buttonContainer.classList.add('d-flex', 'gap-2');
            
                const container = document.createElement('div');
                container.classList.add('card', 'mb-3');
            
                cardBody.append(titleElement, authorElement, yearElement);
            
                if (isCompleted) {
                const undoButton = document.createElement('button');
                undoButton.classList.add('btn', 'btn-warning');
                undoButton.innerText = 'Dibaca Kembali';
                undoButton.addEventListener('click', function () {
                    undoBookFromCompleted(id);
                });
            
                buttonContainer.append(undoButton);
            
                const deleteButton = document.createElement('button');
                deleteButton.classList.add('btn', 'btn-danger');
                deleteButton.innerText = 'Hapus';
                deleteButton.addEventListener('click', function () {
                    removeBookFromCompleted(id);
                });
            
                buttonContainer.append(deleteButton);
                } else {
                const completeButton = document.createElement('button');
                completeButton.classList.add('btn', 'btn-success');
                completeButton.innerText = 'Sudah Dibaca';
                completeButton.addEventListener('click', function () {
                    addBookToCompleted(id);
                });
            
                const editButton = document.createElement('button');
                editButton.classList.add('btn', 'btn-primary');
                editButton.innerText = 'Edit';
                editButton.addEventListener('click', function () {
                    editBook(id);
                });
            
                buttonContainer.append(completeButton, editButton);
                }
            
                cardBody.append(buttonContainer);
                container.append(cardBody);
            
                return container;
            }

            
            function editBook(id) {
                const book = findBook(id);
                
                    if (book) {
                    const newTitle = prompt('Masukkan judul buku baru:', book.title);
                    const newAuthor = prompt('Masukkan penulis buku baru:', book.author);
                    const newYear = prompt('Masukkan tahun buku baru:', book.year);
                
                    book.title = newTitle;
                    book.author = newAuthor;
                    book.year = newYear;
                
                    console.log('Buku dengan ID', id, 'telah diubah:');
                    console.log('Judul:', book.title);
                    console.log('Penulis:', book.author);
                    console.log('Tahun:', book.year);
                    saveData();
                    document.dispatchEvent(new Event(RENDER_EVENT));
                    } else {
                    console.log('Buku dengan ID', id, 'tidak ditemukan.');
                    }
                }
                
                function undoBookFromCompleted(id) {
                    const book = findBook(id);
                
                    if (book && book.isCompleted) {
                    book.isCompleted = false;
                    saveData();
                    document.dispatchEvent(new Event(RENDER_EVENT));
                    console.log('Mengembalikan buku dari daftar selesai dibaca dengan ID:', id);
                    }
                }
                
                function addBookToCompleted(id) {
                    const book = findBook(id);
                
                    if (book && !book.isCompleted) {
                    book.isCompleted = true;
                    saveData();
                    document.dispatchEvent(new Event(RENDER_EVENT));
                    console.log('Menambahkan buku ke daftar selesai dibaca dengan ID:', id);
                    }
                }
                
                function removeBookFromCompleted(id) {
                    const index = findBookIndex(id);
                
                    if (index !== -1) {
                    books.splice(index, 1);
                    saveData();
                    document.dispatchEvent(new Event(RENDER_EVENT));
                    console.log('Menghapus buku dari daftar selesai dibaca dengan ID:', id);
                    }
                }
                
            

        function updateButtonLabel(checked) {
        const buttonStrong = document.getElementById('strong');
        if (checked) {
            buttonStrong.innerText = 'Sudah Dibaca';
        } else {
            buttonStrong.innerText = 'Belum Dibaca';
        }
        }


        function addBook() {
            const title = document.getElementById('title').value;
            const author = document.getElementById('penulis').value;
            const year = document.getElementById('date').value;
            const sudahBacaCheckbox = document.getElementById('sudahBaca');
            
                const generatedId = generateId();
                const isCompleted = sudahBacaCheckbox.checked;
                
                const bookObject = generateBookObject(generatedId, title, author, year, isCompleted);
                books.push(bookObject);

                document.dispatchEvent(new Event(RENDER_EVENT));
                saveData();
            }
            
            




        function addBookToCompleted(bookId) {
            const bookTarget = findBook(bookId);

            if (bookTarget == null) return;

            bookTarget.isCompleted = true;
            document.dispatchEvent(new Event(RENDER_EVENT));
            saveData();
        }

        function removeBookFromCompleted(bookId) {
            const bookTarget = findBookIndex(bookId);

            if (bookTarget === -1) return;

            books.splice(bookTarget, 1);
            document.dispatchEvent(new Event(RENDER_EVENT));
            saveData();
        }

        function undoBookFromCompleted(bookId) {
            const bookTarget = findBookIndex(bookId);

            if (bookTarget === -1) return;

            books[bookTarget].isCompleted = false;
            document.dispatchEvent(new Event(RENDER_EVENT));
            saveData();
        }

        function renderBooks() {
            const unreadContainer = document.getElementById('belum-dibaca');
            const readContainer = document.getElementById('sudah-dibaca');

            unreadContainer.innerHTML = '';
            readContainer.innerHTML = '';

            for (const book of books) {
                const bookCard = makeBookCard(book);

                if (book.isCompleted) {
                    readContainer.append(bookCard);
                } else {
                    unreadContainer.append(bookCard);
                }
            }
        }

        function searchBook() {
            const searchInput = document.getElementById('cari').value.toLowerCase();

            const unreadContainer = document.getElementById('belum-dibaca');
            const readContainer = document.getElementById('sudah-dibaca');

            unreadContainer.innerHTML = '';
            readContainer.innerHTML = '';

            for (const book of books) {
                const bookCard = makeBookCard(book);

                const title = book.title.toLowerCase();
                const author = book.author.toLowerCase();

                if (title.includes(searchInput) || author.includes(searchInput)) {
                    if (book.isCompleted) {
                        readContainer.append(bookCard);
                    } else {
                        unreadContainer.append(bookCard);
                    }
                }
            }
        }

        document.addEventListener(RENDER_EVENT, renderBooks);
        document.addEventListener(SAVED_EVENT, () => {
            if (event.target.id === 'button') {
                alert('Data buku berhasil disimpan!');
            }
        });

        document.getElementById('button').addEventListener('click', function (event) {
            event.preventDefault();
            addBook();
        });

        document.getElementById('cari').addEventListener('input', function (event) {
            event.preventDefault();
            searchBook();
        });

        document.addEventListener('DOMContentLoaded', function () {
            loadDataFromStorage();
        });