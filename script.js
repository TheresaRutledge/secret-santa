// eventually the members array will be a table


const memberArray = [
    {
        name: 'Eric',
        group: 1,
        assigned: false,

    },
    {
        name: 'Theresa',
        group: 1,
        assigned: false
    },
    {
        name: 'Brad',
        group: 2,
        assigned: false
    },
    {
        name: 'Jane',
        group: 2,
        assigned: false
    },
    {
        name: 'Jeff',
        group: 3,
        assigned: false
    },
    {
        name: 'Sarah',
        group: 3,
        assigned: false
    },
    {
        name: 'Leighton',
        group: 3,
        assigned: false
    },

]

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
        console.log(`${randomRecipient.name} was assigned to ${giver.name}`);

    }
}


//print member.recipient list
const printResults = () => {
    assignRecipients();
    for (i = 0; i < memberArray.length; i++) {
        console.log(`${memberArray[i].name}: ${memberArray[i].recipient}`);
    }
}

// printResults();

assignRecipients();
