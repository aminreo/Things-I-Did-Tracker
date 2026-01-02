


let typed_content = '';
let chosen_difficulty = 'Easy';
let current_date = new Date().toLocaleDateString();

// localStorage.setItem('savedNotes', JSON.stringify([{ content: "test", difficulty: chosen_difficulty, date: current_date }]))
let savedNotes = [];
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
updateUI();

radioBtns[0].checked = true;

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

function updateUI() {
    notes.innerHTML = '';

    let todayString = "";
    let pastString = "";
    savedNotes.forEach(element => {

        let dateName = 'Previous days';
        if (new Date().toLocaleDateString() == element.date) {
            dateName = 'Today';
            if (todayString == "") {
                todayString = `<h2 id="notes-today">Today</h2>`;
            }
            todayString += `<div class="note-card ${element.difficulty}">
        <div class="note-card-content">${element.content}</div>
        </div>`;
            // <div class="difficulty">${element.difficulty}</div>

            // <div class="date">${element.date}</div>

        } else {
            if (pastString == "") {
                pastString = `<h2 id="notes-past">Earlier</h2>`;
            }
            pastString += `<div class="note-card ${element.difficulty}">
        <div class="note-card-content">${element.content}</div>
        </div>`;
        }

        // <div class="difficulty">${element.difficulty}</div>


    });

    notes.innerHTML += todayString + pastString;


}