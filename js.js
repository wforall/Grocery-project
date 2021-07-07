var form_crocery = document.querySelector('.form_crocery');
var alert_box = document.querySelector('.notification');
var text_request = document.querySelector('.text_request');
var btnsubmit = document.querySelector('.submit');
var reauest_list = document.querySelector('.reauest_list');
var clearbtn = document.getElementById('clearbtn');
var list = document.querySelector('.list_request');

let element;
let EditeFlage = false;
let editeID = '';


form_crocery.addEventListener('submit', function(e) {

    e.preventDefault();
    const value = text_request.value;
    const id = new Date().getTime().toString();

    if (value && !EditeFlage) {
        let attr = document.createAttribute('data-id');
        attr.value = id;

        reauest_list.innerHTML += `
        <div class="card_request">
        <div class="text_reaquest">${value}</div>
        <div class="edite_remove">
            <button class="editebtn">#</button>
            <button class="deletebtn">u</button>
        </div>
    </div>`;

        // delete unique each order
        var delebtn = document.querySelectorAll('.deletebtn');
        FnDelete(delebtn);
        var editebtns = document.querySelectorAll('.editebtn');
        FEditeBtn(editebtns);



        reauest_list.setAttributeNode(attr);
        clearbtn.className = "crealbtn_action";


        FnAlert('item added to the list', 'success');
        // add to local storage
        addToLocalStorage(id, value);
        // set to back default
        setToBackDefault();

    } else if (value && EditeFlage) {
        console.log('asasdadasda');
    } else {
        FnAlert('please entre value', 'danger')
    }

    text_request.autofocus = true;

});

// Start clear all btn
clearbtn.addEventListener('click', function() {
    var items = document.querySelectorAll('.card_request');

    if (items.length > 0) {
        items.forEach(function(item) {
            reauest_list.removeChild(item);
        });
    }
    clearbtn.className = "clearbtn";
    FnAlert('empty your bag', 'danger');

});
// End clear all btn



function FnAlert(text, action) {
    alert_box.textContent = text;
    alert_box.classList.add(`notification_${action}`);

    setTimeout(() => {
        alert_box.textContent = "";
        alert_box.classList.remove(`notification_${action}`);

    }, 2000);
}


function setToBackDefault() {
    text_request.value = '';
    editeID = '';
    EditeFlage = false;
    btnsubmit.textContent = 'submit'

};

function addToLocalStorage(id, valuee) {};


// Start delete btn 
function FnDelete(btns) {
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function(e) {
            var getbtndelete = e.currentTarget.parentElement.parentElement;

            reauest_list.removeChild(getbtndelete);

            FnAlert('remove your item', 'danger');
            if (reauest_list.childElementCount == 1) {
                clearbtn.className = "clearbtn";

            }
            setToBackDefault();
        })

    }
}
// End delete btn 



// Start btn Edite
function FEditeBtn(ebtn) {

    for (let i = 0; i < ebtn.length; i++) {



        ebtn[i].addEventListener('click', function(e) {
            var getEditeBtn = e.currentTarget.parentElement.parentElement.firstElementChild.innerHTML;
            text_request.value = getEditeBtn;
            var deleteEdite = e.currentTarget.parentElement.parentElement;
            reauest_list.removeChild(deleteEdite);
            FnAlert('your edite will be done after submit', 'success');
        });

    }

}
// End btn Edite