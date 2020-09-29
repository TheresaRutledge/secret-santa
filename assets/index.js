//array of members in gift exchange
let memberArray = [];

//div of groups
const addGroupBtn = document.querySelector('#groups');
//group form
const generateBtn = document.querySelector('#group-form');
//div to hold results
const resultsDiv = document.querySelector('#results');


//add additional group form box
function addGroupHandler(event) {
    event.preventDefault();
    if (event.target.tagName === 'BUTTON') {
        let id = event.target.id.split('');
        groupNumber = (id[id.length - 1].trim());
        groupNumber = parseInt(groupNumber);

        if (document.querySelector(`#group-${groupNumber}`).value) {
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
            newButton.classList.add('btn', 'btn-secondary', 'mb-2');
            newButton.innerText = "Add Group";

            newDiv.appendChild(newLabel);
            newDiv.appendChild(newInput);
            newDiv.appendChild(newButton);

            addGroupBtn.appendChild(newDiv);
        } else {
            alert('Must add at least one name');
            return;
        }
    }
}

//if any group has more members than all other groups combined send error
function validateGroups(numOfGroups) {
    const totalPeople = memberArray.length;
    let validate =true;
    for (i = 1; i <= numOfGroups; i++) {
        let groupTotal = 0;
        for (j = 0; j < totalPeople; j++) {
            if (memberArray[j].group === i) {
                groupTotal++;
            }
            if (groupTotal > totalPeople - groupTotal) {
                alert('Oops! One group has too many recipients.');
                validate = false
                return;
            }
        }
    }
    return validate;
}


function formSubmitHandler(event) {
    event.preventDefault();
    const groupItems = addGroupBtn.children;
    //array of each group
    const groupArray = Array.from(groupItems);
    if (groupArray.length < 2) {
        alert('Must enter at least two groups');
        return;
    }
  
    //create member array
    groupArray.forEach((group) => {
        let id = group.children[1].id;
        groupNumber = (id[id.length - 1].trim());
        groupNumber = parseInt(groupNumber);
        let names = group.children[1].value;
        if(names){
        names = names.split(',');
        for (i = 0; i < names.length; i++) {
            memberArray.push({
                name: names[i].trim(),
                group: groupNumber,
                assigned: false
            })
        }
    }

    })
    // validate group distribution will work
    if (!validateGroups(groupArray.length)) {
        memberArray =[];
        return;
    }

    assignRecipients();
    displayResults();
}

const reset = () => {
    for (i = 0; i < memberArray.length; i++) {
        memberArray[i].assigned = false;
    }
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
        if (!randomRecipient) {
            reset()
            return;
        }
        memberArray[randomRecipient.index].assigned = true;
        giver.recipient = randomRecipient.name;


    }
}

function displayResults() {
    for (i = 0; i < memberArray.length; i++) {
        let newResult = document.createElement('h4');
        newResult.innerText = `${memberArray[i].name} gives to ${memberArray[i].recipient}!`;
        resultsDiv.appendChild(newResult);
    }
    let startOver = document.createElement('button');
    startOver.classList.add('btn', 'btn-primary', "mt-3", "mb-2");
    startOver.setAttribute('id', 'start-over');
    startOver.innerText = 'Start Over';

    resultsDiv.appendChild(startOver);

    generateBtn.remove();

}

function startOverHandler(event) {
    if (event.target.tagName === 'BUTTON') {
        location.reload();
    }
}

addGroupBtn.addEventListener('click', addGroupHandler);
generateBtn.addEventListener('submit', formSubmitHandler);
resultsDiv.addEventListener('click', startOverHandler);