

// const {availableRecipients,assignRecipients} = require('./script.js');
let memberArray = [];

const addGroup = document.querySelector('#groups');
const generate = document.querySelector('#group-form');
const results = document.querySelector('#results');

function addGroupHandler(event) {
    event.preventDefault();
    if (event.target.tagName === 'BUTTON') {
        let id = event.target.id.split('');
        groupNumber = (id[id.length - 1].trim());
        groupNumber = parseInt(groupNumber);
        let removeButton = document.querySelector(`#button-${groupNumber}`);
        removeButton.remove();
        groupNumber++;

        let newDiv = document.createElement('div');
        newDiv.classList.add('form-inline');

        let newLabel = document.createElement('label');
        newLabel.setAttribute('for', `group-${groupNumber}`);
        newLabel.innerText = `Group ${groupNumber}: `;

        let newInput = document.createElement('input');
        newInput.setAttribute('type', 'text')
        newInput.setAttribute('id', `group-${groupNumber}`);
        newInput.classList.add('form-control', 'mb-2', 'mr-sm-2');

        let newButton = document.createElement('button');
        newButton.setAttribute('id', `button-${groupNumber}`);
        newButton.classList.add('btn', 'btn-primary', 'mb-2');
        newButton.innerText = "Add Group";

        newDiv.appendChild(newLabel);
        newDiv.appendChild(newInput);
        newDiv.appendChild(newButton);

        addGroup.appendChild(newDiv);
    }
}

function formSubmitHandler(event) {
    event.preventDefault();
    const groupItems = addGroup.children;
    const groupArray = Array.from(groupItems);
    if (groupArray.length < 2) {
        alert('Must enter at least two groups');
        return;
    }

    //go through each group and add the members to the member array
    groupArray.forEach((group) => {
        let id = group.children[1].id;
        groupNumber = (id[id.length - 1].trim());
        groupNumber = parseInt(groupNumber);
        let names = group.children[1].value;
            names = names.split(',');
            for (i = 0; i < names.length; i++) {
                memberArray.push({
                    name: names[i],
                    group: groupNumber,
                    assigned: false
                })
            }

    })
assignRecipients();
}








// function to get available recipients. Can't be in same group or already be assigned
const availableRecipients = (giver) => {
    let recipientsArray = [];
    for (i = 0; i < memberArray.length; i++) {
        if (memberArray[i].assigned === false && memberArray[i].group !== giver.group) {

            recipientsArray.push(memberArray[i]);
            recipientsArray[recipientsArray.length - 1].index = i;
        }
    }
    return recipientsArray;
}

//assignRecipient: generate random recipient from available array. Change that recipient's assigned to true
// and update giver's recipient value.
const assignRecipients = () => {
    for (j = 0; j < memberArray.length; j++) {

        let giver = memberArray[j];

        let availableRecipientsArray = availableRecipients(giver);

        let randomNumber = Math.floor(Math.random() * availableRecipientsArray.length);

        let randomRecipient = availableRecipientsArray[randomNumber];
        memberArray[randomRecipient.index].assigned = true;
        giver.recipient = randomRecipient.name;


    }
    displayResults();
}

function displayResults() {
    for (i = 0; i < memberArray.length; i++) {
        let newResult = document.createElement('h4');
        newResult.innerText = `${memberArray[i].name} gives to ${memberArray[i].recipient}!`;
        results.appendChild(newResult);
    }
    let startOver = document.createElement('button');
    startOver.classList.add('btn', 'btn-primary');
    startOver.setAttribute('id', 'start-over');
    startOver.innerText = 'Start Over';

    results.appendChild(startOver);

    generate.remove();

}

function startOverHandler(event) {
    location.reload();
}

addGroup.addEventListener('click', addGroupHandler);
generate.addEventListener('submit', formSubmitHandler);
results.addEventListener('click', startOverHandler);