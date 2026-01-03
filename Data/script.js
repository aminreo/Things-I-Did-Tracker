

let current_date = new Date().toLocaleDateString();
const state = {

    affirmation_text: [
        'You showed up today :)',
        'Progress counts, even when it’s quiet',
        'This mattered'
    ],
    newEntry: false,
    typed_content: '',
    chosen_difficulty: 'Easy',
    savedNotes: [],
    lastAffirmationDate: '',
    lastAffirmationCount: 0

}
// we need to store affirmation date in the localstorage to check if user have added a note today
// otherwise he will only get the affirmation text if he adds something today
const affirmationTableSaved = localStorage.getItem('affirmationTable');
if (affirmationTableSaved) {
    const aTS = JSON.parse(affirmationTableSaved);
    if (aTS.date == current_date) {
        state.lastAffirmationDate = aTS.date;
        // console.log(aTS.count);
        state.lastAffirmationCount = aTS.count;
    }

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
            state.chosen_difficulty = radioBtn.value;
        }
    }
    state.savedNotes.push({ content: state.typed_content, difficulty: state.chosen_difficulty, date: current_date });
    localStorage.setItem('savedNotes', JSON.stringify(state.savedNotes));
    state.newEntry = true;
    updateUI();
    textInputElem.value = '';
    state.typed_content = '';

}

function updateUI() { //todo add empty page design
    current_date = new Date().toLocaleDateString();

    // console.log(`${state.lastAffirmationDate}  ${ current_date}`);

    if (state.newEntry) {
        state.lastAffirmationCount++;
        notes.innerHTML = renderAffirmation();
        state.lastAffirmationDate = current_date;
        localStorage.setItem('affirmationTable', JSON.stringify({ date: current_date, count: state.lastAffirmationCount }));
        state.newEntry = false;
    } else if (state.lastAffirmationDate == current_date) {
        // console.log('nice');
        notes.innerHTML = renderAffirmation();
    } else {
        notes.innerHTML = '';
    }

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

function renderAffirmation() {
    // state.affirmation_text
    if (state.lastAffirmationCount < 3) {
        return state.affirmation_text[0];
    } else if (state.lastAffirmationCount < 5) {
        return state.affirmation_text[1];
    } else {
        return state.affirmation_text[2];
    }
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