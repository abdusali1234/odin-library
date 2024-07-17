function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function(){
    this.read =!this.read;
}

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, true);
const the5AmClub = new Book('The 5 AM Club', 'Robin Sharma', 314, false);
const nineteenEightyFour = new Book('Nineteen Eighty Four', 'George Orwell', 328, true);

const myLibrary = [theHobbit, the5AmClub, nineteenEightyFour];





function displayBooks(){
    const card_container = document.querySelector(".card-container");
    card_container.innerHTML = "";

    
    myLibrary.forEach((book, index) => {
        let cardEl = document.createElement("div");
        cardEl.setAttribute("class", "card");
        cardEl.setAttribute("id", index);
        cardEl.innerHTML = `
        <div class="side-banner"></div>
        <div class="card-body">
            <div class="card-header">
                <h2>${book.title}</h2>
                <h3>By ${book.author}</h3>
            </div>
            <div class="card-main">
                <p class="pages">Pages: ${book.pages} ${book.pages > 1 ? "pages" : "page"}</p>
                <p class="read-status">Read: ${book.read ? "Read" : "Not Read"}</p>
                <button class="change-status" onclick="toggleRead(${index})">Mark as ${book.read ? " Not Read" : "Read"}</button>
                <button class="remove-btn" onclick="removeBook(${index})">Remove</button>
            </div>
        </div>
        `;
        card_container.appendChild(cardEl);
    });
}

function addBookstoLibrary(book){
    myLibrary.push(book);
}

function removeBook(index){
    myLibrary.splice(index, 1);
    displayBooks();
}

function toggleRead(index){
    myLibrary[index].toggleRead();
    displayBooks();
}


const newBtn = document.querySelector("#new-book");
const dialog = document.querySelector("dialog");
const addBook = document.querySelector("#add");
const title = document.querySelector("#title").value;
const author = document.querySelector("#author").value;
const pages = document.querySelector("#pages").value;
const read = document.querySelector('#read').checked;

const closeBtn = document.querySelector("#close");

function clearForm(){
    title.value = "";
    author.value = "";
    pages.value = null;
    read.checked = false;
}

newBtn.addEventListener("click", ()=>{
    dialog.showModal();
});

addBook.addEventListener("click", (event) => {
    event.preventDefault();
    if (title !== "" && author !== "" && pages){
        addBookstoLibrary(new Book(title, author, pages, read));
        dialog.close();
        displayBooks();
        clearForm();
    }
});

closeBtn.addEventListener("click", (event) =>{
    event.preventDefault();
    dialog.close();
    clearForm();
    
});

displayBooks();

