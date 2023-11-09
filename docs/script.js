// reference page elements
const notesContainer = document.querySelector('.notes-container');
const createButton = document.querySelector('.create-button');
let notes = document.querySelectorAll('.input-box');

// save the contents of the notes element into local storage
function updateStorage() {
    localStorage.setItem('notes', notesContainer.innerHTML);
}

// load and set the contents of the notes element from local storage
function loadNotes() {
    notesContainer.innerHTML = localStorage.getItem('notes');
}

// when the create button is clicked
createButton.addEventListener('click', () => {
    // create a new paragraph element
    const newNote = document.createElement('p');
    // give it a class name
    newNote.className = 'input-box';
    //set the contenteditable attribute to true
    // this attributes allows the text of an element to be edited
    newNote.setAttribute('contenteditable', 'true');

    // create a new delete button (just a clickable image)
    const newImg = document.createElement('img');
    newImg.src = './docs/assets/images/delete.png';

    // add the delete button to the note
    newNote.appendChild(newImg);
    // add the note to the notes container
    notesContainer.appendChild(newNote);
});

// when the notes container is clicked
notesContainer.addEventListener('click', (e) => {
    // if a delete button was clicked
    if(e.target.tagName === 'IMG') {
        // remove the parent element (note)
        e.target.parentElement.remove();
        //and save the notes list to storage
        updateStorage();

    } else if(e.target.tagName === 'P') {
        // if a note was clicked, select every note in the container
        notes = document.querySelectorAll('.input-box');
        notes.forEach(n => {
            // ad en event listener that saves the entire list when a key is lifted
            // is this the best way to do so?
            n.onkeyup = () => updateStorage();
        })
    }
});

loadNotes();
