// Sample data (initial book list)
let books = [

];

// Function to display books in the list
function displayBooks() {
    const bookList = document.getElementById("book-list");
    const tbody = document.getElementById("innerBody");
    tbody.innerHTML = "";

    books.forEach(book => {
        var table = document.getElementById("innerBody");
        var newRow = table.insertRow(-1);
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        const cell6 = newRow.insertCell(5);
        const cell7 = newRow.insertCell(6);
        cell1.innerHTML = book.id;
        cell2.innerHTML = book.title;
        cell3.innerHTML = book.author;
        cell4.innerHTML = book.name;
        cell5.innerHTML = book.price;
        cell6.innerHTML = book.date;
        cell7.innerHTML = `<button class="edit-button btn btn-warning" data-id="${book.id}">Edit</button>`;
    })
};

const table = document.getElementById("innerBody"); // Get a reference to the table
table.addEventListener("click", function (event) {
    if (event.target && event.target.className === "edit-button btn btn-warning") {
        const button = event.target;
        const bookId = parseInt(button.getAttribute("data-id"));
        const selectedBook = books.find(book => book.id === bookId);

        // Populate the update/delete form with the selected book's data
        document.getElementById("book-id").value = selectedBook.id;
        document.getElementById("new-title").value = selectedBook.title;
        document.getElementById("new-author").value = selectedBook.author;
        document.getElementById("new-name").value = selectedBook.name;
        document.getElementById("new-price").value = selectedBook.price;
        document.getElementById("new-date").value = selectedBook.date;
    }
});


// Function to add a new book
function addBook(title, author, name, price, date) {
    const newBook = {
        id: books.length + 1,
        title,
        author,
        name,
        price,
        date
    };
    books.push(newBook);
    displayBooks();
}

// Function to update a book
function updateBook(id, newTitle, newAuthor, newName, newPrice, newDate) {
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
        books[index].title = newTitle;
        books[index].author = newAuthor;
        books[index].name = newName;
        books[index].price = newPrice;
        books[index].date = newDate;



        displayBooks();
    }
}

// Function to delete a book
function deleteBook(id) {
    books = books.filter(book => book.id !== id);
    displayBooks();
}

// Event listener for the "Add Book" form
const addBookForm = document.getElementById("add-book-form");
addBookForm.addEventListener("submit", function (e) {                              /* line of error*/
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const date = document.getElementById("date").value;

    addBook(title, author, name, price, date);
    addBookForm.reset();
});

// Function to perform the search
function performSearch(query) {
    query = query.toLowerCase();
  
    // Filter books based on the query
    const searchResults = books.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.name.toLowerCase().includes(query) ||
      book.price.toLowerCase().includes(query) ||
      book.date.toLowerCase().includes(query)
    );
  
    // Display the search results
    displayBooks(searchResults);
  }
  
  // Event listener for the search form
  const searchForm = document.getElementById("search-form");
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting in the default way
  
    const searchInput = document.getElementById("search-input");
    const query = searchInput.value;
  
    // Call the search function with the user's query
    performSearch(query);
  });

// Event listener for the "Update" button
const updateButton = document.getElementById("update-book");
updateButton.addEventListener("click", function () {
    const id = parseInt(document.getElementById("book-id").value);
    const newTitle = document.getElementById("new-title").value;
    const newAuthor = document.getElementById("new-author").value;
    const newName = document.getElementById("new-name").value;
    const newPrice = document.getElementById("new-price").value;
    const newDate = document.getElementById("new-date").value;
    updateBook(id, newTitle, newAuthor, newName, newPrice, newDate);
    document.getElementById("update-delete-form").reset();
});

// Event listener for the "Delete" button
const deleteButton = document.getElementById("delete-book");
deleteButton.addEventListener("click", function () {
    const id = parseInt(document.getElementById("book-id").value);
    deleteBook(id);
    document.getElementById("update-delete-form").reset();
});

// Initial display of books
displayBooks()
