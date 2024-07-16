function Book(title, author, nPages, readStatus){
    this.title = title;
    this.author = author;
    this.nPages = nPages;
    this.readStatus = readStatus;
}

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, "reading");
const the5AmClub = new Book('The 5 AM Club', 'Robin Sharma', 314, "not read yet");
const nineteenEightyFour = new Book('Nineteen Eighty Four', 'George Orwell', 328, "finished");

const myLibrary = [theHobbit, the5AmClub, nineteenEightyFour];

function createCard(book){
    return `
    <div class="card">
        <h2>${book.title}</h2>
        <h3>${book.author}</h3>
        <h3>${book.nPages} ${book.nPages > 1 ? "pages" : "page"}</h3>
        <h3>Read status: ${book.readStatus}</h3>
    </div>
    `
}

function displayBooks(){
    const card_container = document.querySelector(".card-container");
    card_container.innerHTML = "";

    myLibrary.forEach(
        (book) => {
            card_container.innerHTML += createCard(book);
        }
    );
}

function addBookstoLibrary(book){
    myLibrary.push(book);
}



const button = document.querySelector("#add-book");
const dialog = document.querySelector("dialog");
const addBook = document.querySelector("#add");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector('input[name="read-status"]:checked');

const closeButton = document.querySelector("#close");

function clearForm(){
    title.value = "";
    author.value = "";
    pages.value = null;
    Array.from( document.querySelectorAll('input[name="read-status"]:checked'), input => input.checked = false );
}

button.addEventListener("click", ()=>{
    dialog.showModal();
    console.log(read);
    console.log(read.value);
});

addBook.addEventListener("click", (event) => {
    event.preventDefault();
    if (title.value !== "" && author.value !== "" && pages.value & read.value !== null){
        addBookstoLibrary(new Book(title.value, author.value, pages.value, read.value));
        console.log(read);
        console.log(read.value);
        dialog.close();
        displayBooks();
        clearForm();
        console.log(read);
        console.log(read.value);
    }
});

closeButton.addEventListener("click", (event) =>{
    event.preventDefault();
    dialog.close();
    console.log(read);
    console.log(read.value);
    clearForm();
    console.log(read);
    console.log(read.value);
    
})

clearForm();
displayBooks();