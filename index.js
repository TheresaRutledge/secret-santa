let addGroup = document.querySelector('#groups');

function addGroupHandler (event){
    event.preventDefault();
    if(event.target.tagName==='BUTTON'){
        let id = event.target.id.split('');
        groupNumber= (id[id.length-1].trim());
        groupNumber = parseInt(groupNumber);
        let removeButton = document.querySelector(`#button-${groupNumber}`);
        removeButton.remove();
        groupNumber++;
//remove buton that was clicked


let newDiv = document.createElement('div');
newDiv.classList.add('form-inline');

let newLabel = document.createElement('label');
newLabel.setAttribute('for',`group-${groupNumber}`);
newLabel.innerText = `Group ${groupNumber}: `;

let newInput = document.createElement('input');
newInput.setAttribute('type','text')
newInput.setAttribute('id',`group-${groupNumber}`);
newInput.classList.add('form-control', 'mb-2', 'mr-sm-2');

let newButton = document.createElement('button');
newButton.setAttribute('id',`button-${groupNumber}`);
newButton.classList.add('btn', 'btn-primary', 'mb-2');
newButton.innerText = "Add Group";

newDiv.appendChild(newLabel);
newDiv.appendChild(newInput);
newDiv.appendChild(newButton);

addGroup.appendChild(newDiv);
    }
}

addGroup.addEventListener('click',addGroupHandler);