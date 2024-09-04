function Book(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead =isRead;
}

Book.prototype.toggleRead = function(){
    this.isRead =!this.isRead;
}

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, true);
const the5AmClub = new Book('The 5 AM Club', 'Robin Sharma', 314, false);
const nineteenEightyFour = new Book('Nineteen Eighty Four', 'George Orwell', 328, true);

const myLibrary = [theHobbit, the5AmClub, nineteenEightyFour];

function addBooktoLibrary(title, author, pages, isRead){
    let newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    render();
}

function displayBooks(){
    const card_container = document.querySelector(".card-container");
    card_container.innerHTML = "";

    
    myLibrary.forEach((book, index) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");
        card.setAttribute("id", `card-${index}`);
        card.innerHTML = `
        <div class="card-header">
            <h2>${book.title}</h2>
            <h3>By ${book.author}</h3>
        </div>
        <div class="card-main">
            <p class="pages">Pages: ${book.pages} ${book.pages > 1 ? "pages" : "page"}</p>
            <p class="read-status">Reading status: ${book.isRead ? "Read" : "Not Read"}</p>
        </div>
        <div class="card-footer">
            <div class="card-btn-container">
                <button class="change-status" data-index="${index}">Mark as ${book.isRead ? " Not Read" : "Read"}</button>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
        </div>
        `;
        card_container.appendChild(card);
    });
}



const newBtn = document.querySelector("#new-book");
const dialog = document.querySelector("dialog");
const bookEntry = document.querySelector('#book-entry');
const cancelBtn = document.querySelector("#cancel");

// event listeners for removing cards and changing read status

function toggleRead(index){
    myLibrary[index].toggleRead();
}




const render = () => {
    displayBooks();

    document.querySelectorAll(".remove-btn").forEach(removeBtn => {
        removeBtn.addEventListener('click', () => {
            const index = removeBtn.getAttribute('data-index');
            myLibrary.splice(index, 1);
            render();
        });
    });
    
    document.querySelectorAll(".change-status").forEach(statusBtn => {
        statusBtn.addEventListener('click', () => {
            const index = statusBtn.getAttribute('data-index');
            // myLibrary[index].isRead = !myLibrary[index].isRead;
            toggleRead(index);
            render();
        });
    });
};

newBtn.addEventListener("click", ()=>{
    dialog.showModal();
});

const bookTitle = document.getElementById("title");
const authorName = document.getElementById("author");
const bookPages = document.getElementById("pages");

bookTitle.addEventListener("input", (event) =>{
    if (bookTitle.validity.valueMissing){
        bookTitle.setCustomValidity("Need a title mate!")
    } else {
        bookTitle.setCustomValidity("");
    }
});

authorName.addEventListener("intput", (event) => {
    if (authorName.validity.tooShort){
        authorName.setCustomValidity("Too short son!")
    } else {
        authorName.setCustomValidity("");
    }
})

bookEntry.addEventListener('submit', (event) => {
    event.preventDefault();
    // if (bookTitle.validity.valueMissing){
    //     bookTitle.setCustomValidity("Need a title mate!")
    // } else {
    //     bookTitle.setCustomValidity("");
    // };
    // if (authorName.validity.tooShort){
    //     authorName.setCustomValidity("Too short son!")
    // } else {
    //     authorName.setCustomValidity("");
    // };
    const title = this.title.value;
    const author = this.author.value;
    const pages = this.pages.value;
    const isRead = this.read.checked;
    addBooktoLibrary(title, author, pages, isRead);
    dialog.close();
    bookEntry.reset();
});

cancelBtn.addEventListener('click', (event) => {
    dialog.close();
    bookEntry.reset();
})

render();







