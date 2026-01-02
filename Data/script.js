

let current_date = new Date().toLocaleDateString();
const state = {

    typed_content: '',
    chosen_difficulty: 'Easy',
    savedNotes: []

}



// localStorage.setItem('state.savedNotes', JSON.stringify([{ content: "test", difficulty: state.chosen_difficulty, date: current_date }]))
// let state.savedNotes = [];
const saved = localStorage.getItem('savedNotes');
if (saved) {
    state.savedNotes = JSON.parse(saved);
}

const textInputElem = document.getElementById('text-input');
textInputElem.addEventListener('input', handleInput);
const notes = document.getElementById('notes');
// document.getElementsByName('difficulty').addEventListener('click',handleDiffChoice);
const radioBtns = document.querySelectorAll('input[name="difficulty"]');
document.getElementById('submit-bt').addEventListener('click', submitFn);
document.addEventListener('keydown', function (e) {
    if (e.key == 'Enter') {
        submitFn();
    }
});

notes.addEventListener('click', function (e) {
    if (e.target.classList.contains('del-bin')) {
        const index = e.target.dataset.index;
        delNote(index);

    }
});


radioBtns[0].checked = true;

updateUI();


function handleInput(event) {
    state.typed_content = event.target.value;
}
function submitFn() {
    if (state.typed_content == '') {
        return;
    }
    for (const radioBtn of radioBtns) {
        if (radioBtn.checked) {
            //     switch (radioBtn.value) {
            //         case "Easy":
            //             state.chosen_difficulty = "*";
            //             break;
            //         case "Medium":
            //             state.chosen_difficulty = "**";
            //             break;
            //         case "Hard":
            //             state.chosen_difficulty = "***";
            //             break;
            //     }
            state.chosen_difficulty = radioBtn.value;

        }
    }
    state.savedNotes.push({ content: state.typed_content, difficulty: state.chosen_difficulty, date: current_date });
    localStorage.setItem('savedNotes', JSON.stringify(state.savedNotes));
    updateUI();
    textInputElem.value = '';
    state.typed_content = '';

}

function updateUI() { //todo add empty page design
    notes.innerHTML = '';

    let todayString = "";
    let pastString = "";
    state.savedNotes.forEach((element, index) => {

        if (new Date().toLocaleDateString() == element.date) {
            if (todayString == "") {
                todayString = `<h2 id="notes-today">Today</h2>`;
            }
            todayString += renderNote(element, index);

        } else {
            if (pastString == "") {
                pastString = `<h2 id="notes-past">Earlier</h2>`;
            }
            pastString += renderNote(element, index);
        }


    });

    notes.innerHTML += todayString + pastString;
}

function delNote(index) {

    state.savedNotes.splice(index, 1);
    localStorage.setItem('savedNotes', JSON.stringify(state.savedNotes));

    updateUI();

}


// html code for cards builder
function renderNote(element, index) {

    return `<div id="card${index}"  class="note-card ${element.difficulty}">
        <div class="note-card-content">${element.content}</div>
                <img class="del-bin" data-index="${index}"  id="del${index}" src="Data/Img/recycle-bin.png">

        </div>`;

}