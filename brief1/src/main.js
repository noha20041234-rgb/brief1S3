



import { getcards, createCard,getcardId,updateCard} from "./api.js";

import { state } from "./store.js";

import {
    refreshBoard,
    renderAssignees,
    openCardModal,
    closeCardModal,
    readCardForm,
    validateCardForm,
    resetCardForm,
    showLoading,
    hideLoading,
    showError,
    hideError,
    showBoard,
    fillCardForm,
    switBtnedit,
    switBtnajou
} from "./ui.js";




const retry = document.getElementById("retry");

const btnajout = document.getElementById("nouvecart");

const anullerBtn = document.getElementById("closeModal");

const form = document.getElementById("formCard");

const searchInput = document.getElementById("serchboad");

const selectPriority = document.getElementById("priorityFilter");

const selectAssignee = document.getElementById("assigneesFiltre");
const board=document.getElementById("kanban-board");





async function loadCards() {

    showLoading();
    hideError();

    try {

        const data = await getcards();

        state.cards = data;

        refreshBoard(state.cards);

        renderAssignees(state.cards);

        showBoard();

    } catch (error) {

        console.error("Load cards error:", error);

        showError();

    } finally {

        hideLoading();

    }

}




async function addNewCard() {

    if (!validateCardForm()) {
        return;
    }

    const newCard = readCardForm();

    try {

        await createCard(newCard);

        await loadCards();
        switBtnajou();

        resetCardForm();

        closeCardModal();

    } catch (error) {

        console.error("Add card error:", error);

    }

}




async function filterCards() {

    const searchValue = searchInput.value.trim();

    const priorityValue = selectPriority.value;

    const assigneeValue = selectAssignee.value;

    try {

        const data = await getcards(
            searchValue,
            priorityValue,
            assigneeValue
        );

        state.cards = data;

        refreshBoard(state.cards);

    } catch (error) {

        console.error("Filter cards error:", error);

    }

}




// Retry button

retry.addEventListener("click", () => {

    loadCards();

});


// Open modal

btnajout.addEventListener("click", () => {

    openCardModal();

});


// Close modal

anullerBtn.addEventListener("click", () => {

    closeCardModal();

});


// Submit form

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = document.getElementById("cardId").value;

    if (id) {
        await editCard(id);
    } else {
        await addNewCard();
    }
});


// Search

searchInput.addEventListener("input", () => {

    filterCards();

});


// Priority filter

selectPriority.addEventListener("change", () => {

    filterCards();

});


// Assignee filter

selectAssignee.addEventListener("change", () => {

    filterCards();

});





function init() {

    loadCards();

}

init();

board.addEventListener("click", async (event) => {

    if (event.target.classList.contains("edit-button")) {
        
        const id = event.target.dataset.id;

        try {
            const card = await getcardId(id);

             console.log("Card received:", card);

            fillCardForm(card);
            switBtnedit();
            openCardModal();

        } catch (error) {
            console.log("Edit error:", error);
        }
    }
});
// form.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     if(!validateCardForm()){
//         return;
//     }

//     const id = document.getElementById("cardId").value;
//     const cardData = readCardForm();
//     await updateCard(id,cardData);
//     const index=state.cards.findIndex(card=> card.id==id);
//     if(index !==-1){
//         state.cards[index]={
//             //Spread Operator
//             ...state.cards[index],
//             ...cardData

//            }
//         }
//         refreshBoard(state.cards);
//         closeCardModal();
// switBtnajou();

//     // console.log("ID:", id);
//     // console.log("New data:", cardData);
//     // console.log(state.cards);
    
// });
async function editCard(id){
    if(!validateCardForm()){
        return;
    }

   
    const cardData = readCardForm();
    await updateCard(id,cardData);
    const index=state.cards.findIndex(card=> card.id==id);
    if(index !==-1){
        state.cards[index]={
            //Spread Operator
            ...state.cards[index],
            ...cardData

           }
        }
        refreshBoard(state.cards);
        closeCardModal();
switBtnajou();

    // console.log("ID:", id);
    // console.log("New data:", cardData);
    // console.log(state.cards);
    

}