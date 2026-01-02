

let current_date = new Date().toLocaleDateString();
const state = {

    typed_content: '',
    chosen_difficulty: 'Easy',
    savedNotes: []

}



// localStorage.setItem('savedNotes', JSON.stringify([{ content: "test", difficulty: chosen_difficulty, date: current_date }]))
// let savedNotes = [];
const saved = localStorage.getItem('savedNotes');
if (saved) {
    savedNotes = JSON.parse(saved);
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
    typed_content = event.target.value;
}
function submitFn() {
    if (typed_content == '') {
        return;
    }
    for (const radioBtn of radioBtns) {
        if (radioBtn.checked) {
            //     switch (radioBtn.value) {
            //         case "Easy":
            //             chosen_difficulty = "*";
            //             break;
            //         case "Medium":
            //             chosen_difficulty = "**";
            //             break;
            //         case "Hard":
            //             chosen_difficulty = "***";
            //             break;
            //     }
            chosen_difficulty = radioBtn.value;

        }
    }
    savedNotes.push({ content: typed_content, difficulty: chosen_difficulty, date: current_date });
    localStorage.setItem('savedNotes', JSON.stringify(savedNotes));
    updateUI();
    textInputElem.value = '';
    typed_content = '';

}

function updateUI() { //todo add empty page design
    notes.innerHTML = '';

    let todayString = "";
    let pastString = "";
    savedNotes.forEach((element, index) => {

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

    savedNotes.splice(index, 1);
    localStorage.setItem('savedNotes', JSON.stringify(savedNotes));

    updateUI();

}


// html code for cards builder
function renderNote(element, index) {

    return `<div id="card${index}"  class="note-card ${element.difficulty}">
        <div class="note-card-content">${element.content}</div>
                <img class="del-bin" data-index="${index}"  id="del${index}" src="Data/Img/recycle-bin.png">

        </div>`;

}