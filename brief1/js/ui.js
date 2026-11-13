
import { getcards } from "./api.js"


const state = {
    cards: []
}
const error = document.getElementById("error");
const loading = document.getElementById("loading");
const board = document.getElementById("kanban-board");
const retry = document.getElementById("retry");

function loadCards() {
    loading.classList.remove("hidden");
    error.classList.add("hidden");
    board.classList.add("hidden");
    getcards()
        .then(data => {
            state.cards = data;

            afficAssnigne();
            refreshBoard();



            loading.classList.add("hidden");
            board.classList.remove("hidden");
        })
        .catch(() => {
            loading.classList.add("hidden");
            error.classList.remove("hidden");
        });
}
retry.addEventListener("click", () => {
    loadCards();
});
loadCards();

const todoCount = document.getElementById("todoCount");
const progressCount = document.getElementById("encoursCount");
const doneCount = document.getElementById("terminerCount");


function refreshBoard() {
    const todoCards = state.cards.filter(card => card.status === "todo");
    const progressCards = state.cards.filter(card => card.status === "in-progress");
    const doneCards = state.cards.filter(card => card.status === "done");

    afficherCards(todoCards, todo);
    afficherCards(progressCards, progress);
    afficherCards(doneCards, done);

    todoCount.textContent = todoCards.length;
    progressCount.textContent = progressCards.length;
    doneCount.textContent = progressCards.length

}


const todo = document.getElementById("todoCards");
const progress = document.getElementById("progressCards");
const done = document.getElementById("doneCards");


function afficherCards(cards, container) {
    container.innerHTML = "";
    cards.forEach(card => {
        const spacard = document.createElement("div");
        spacard.className = "bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-3"
        spacard.textContent = card.title;
        container.appendChild(spacard);

        //titre

        const description = document.createElement("p");
        description.textContent = "description" + " :" + " " + card.description;
        //priority
        const priority=document.createElement("p")
        priority.textContent="priority"+ " :"  +" "+    card.priority;
        //assignee
        const assignee =document.createElement("p")
        assignee.textContent="assignee"+ " :"  +" "+    card.assignee;
        //date
        const datedue = document.createElement("p");
        datedue.textContent = "dueDate" + ":" + " " + card.dueDate;
        //tags
        const tagspice = document.createElement("div");
        card.tags.forEach(tag => {
            const spantag = document.createElement("span");
            spantag.textContent = "tag : " + " " + tag
            tagspice.appendChild(spantag);
        })
        spacard.append(description, priority, assignee, datedue, tagspice);

    });

}



const btnajout = document.getElementById("nouvecart");
const modale = document.getElementById("modalCard");
const anullerBtn = document.getElementById("closeModal");

btnajout.addEventListener("click", () => {
    modale.classList.remove("hidden");
    modale.classList.add("flex");
});

anullerBtn.addEventListener("click", () => {
    modale.classList.add("hidden");
    modale.classList.remove("flex");
});


//validation



const form = document.getElementById("formCard");

const titr = document.getElementById("inputTetre");
const descri = document.getElementById("description");
const priority = document.getElementById("priority");
const assignee = document.getElementById("assignee");
const status = document.getElementById("status");
const dateDue = document.getElementById("dueDate");
const tags = document.getElementById("tags");


let tagValues = [];


// Messages d'erreur
const titleError = document.getElementById("titleError");
const descriptionError = document.getElementById("descError");
const pError = document.getElementById("prioritError");
const assiError = document.getElementById("assenError");
const statusError = document.getElementById("statError");
const dudateError = document.getElementById("dateError");


form.addEventListener("submit", (event) => {
    event.preventDefault();


    titleError.textContent = "";
    descriptionError.textContent = "";
    pError.textContent = "";
    assiError.textContent = "";
    statusError.textContent = "";
    dudateError.textContent = "";

    let valide = true;
    const titleRegex = /^[a-zA-ZÀ-ÿ0-9\s'-]+$/;
    const assignRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectdate = new Date(dateDue.value);


    if (titr.value.trim() === "") {
        titleError.textContent = "Title obligatoire";
        valide = false;
    } else if (!titleRegex.test(titr.value.trim())) {
        titleError.textContent = "Title contient des caractères invalides";
        valide = false;

    }


    if (descri.value.trim() === "") {
        descriptionError.textContent = "Description obligatoire";
        valide = false;
    } else if (descri.value.trim().length < 10 || descri.value.trim().length > 300) {
        descriptionError.textContent = "Description doit contenir entre 10 et 300 caractères";
        valide = false;
    }


    if (priority.value === "") {
        pError.textContent = "Priority obligatoire";
        valide = false;
    }


    if (assignee.value.trim() === "" || !assignRegex.test(assignee.value.trim())) {
        assiError.textContent = "Assignee obligatoire";
        valide = false;
    }


    if (status.value === "") {
        statusError.textContent = "Status obligatoire";
        valide = false;
    }


    if (dateDue.value === "") {
        dudateError.textContent = "Due date obligatoire";
        valide = false;
    } else if (selectdate < today) {
        dudateError.textContent = "Date ne peut pas être dans le passé";
        valide = false;
    } if (valide) {

        tagValues = [];
        const allTags = tags.value.split(",");

        for (let tag of allTags) {
            if (tag.trim() !== "") {
                tagValues.push(tag.trim());
            }
        }

        addNewCart();
        refreshBoard();

        // console.log(state.cards);
    }



});





function addNewCart() {

    state.cards.push({
        title: titr.value.trim(),
        description: descri.value.trim(),
        priority: priority.value,
        assignee: assignee.value.trim(),
        status: status.value,
        dueDate: dateDue.value,
        tags: tagValues,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });
}


//filter
const inpySerch = document.getElementById("serchboad");

inpySerch.addEventListener("input", () => {
    const searchValue = inpySerch.value;

    getcards(searchValue)
        .then(data => {
            state.cards = data;
            refreshBoard();
        })
        .catch(error => {
            console.log(error);
        });
});

const selectPriorit = document.getElementById("priorityFilter");
selectPriorit.addEventListener("change", () => {
    const prorityValue = selectPriorit.value;
    getcards("", prorityValue)
        .then(data => {
            state.cards = data;
            refreshBoard();
        })
        .catch(error => {
            console.log(error);
        });
})
const selectAssigne = document.getElementById("assigneesFiltre");
function afficAssnigne() {


    const assignees = [];

    state.cards.forEach(card => {
        if (card.assignee && !assignees.includes(card.assignee)) {
            assignees.push(card.assignee);
        }
    });



    assignees.forEach(assignee => {
        const option = document.createElement("option");
        option.value = assignee;
        option.textContent = assignee;
        selectAssigne.appendChild(option);
    });
}
selectAssigne.addEventListener("change", () => {
    const assinValue = selectAssigne.value;
    getcards("", "", assinValue)
        .then(data => {
            state.cards = data;
            refreshBoard();
        })
        .catch(error => {
            console.log(error);
        });

})