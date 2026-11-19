


const todo = document.getElementById("todoCards");
const progress = document.getElementById("progressCards");
const done = document.getElementById("doneCards");

const todoCount = document.getElementById("todoCount");
const progressCount = document.getElementById("encoursCount");
const doneCount = document.getElementById("terminerCount");

const modal = document.getElementById("modalCard");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const board = document.getElementById("kanban-board");

const selectAssignee = document.getElementById("assigneesFiltre");




function renderCards(cards, container) {

    container.innerHTML = "";

    cards.forEach(card => {


        const cardElement = document.createElement("div");
        cardElement.className = "bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-3";
        container.appendChild(cardElement)

        const title = document.createElement("h3");
        title.textContent = card.title;

        const description = document.createElement("p");
        description.textContent = "Description : " + card.description;

        const priority = document.createElement("p");
        priority.textContent = "Priority : " + card.priority;

        const assignee = document.createElement("p");
        assignee.textContent = "Assignee : " + card.assignee;

        const dueDate = document.createElement("p");
        dueDate.textContent = "Due date : " + card.dueDate;

        const tags = document.createElement("div");

        (card.tags || []).forEach(tag => {

            const span = document.createElement("span");
            span.textContent = "Tag : " + tag;



            tags.appendChild(span);

        });
        const btnmode = document.createElement("button");
        btnmode.textContent = "Modifier";
        btnmode.className = "bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        btnmode.dataset.id = card.id;
        btnmode.classList.add("edit-button");
       
        const btnleft = document.createElement("button");
        btnleft.textContent = "←";
        btnleft.className = "bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium";
        btnleft.classList.add("move-left");
        btnleft.dataset.id = card.id;

        
        const btnright = document.createElement("button");
        btnright.textContent = "→";
        btnright.className ="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium" 
        btnright.classList.add("move-right");
        btnright.dataset.id = card.id;


        const btnSuprimer=document.createElement("button");
        btnSuprimer.textContent="Supprimer";
        btnSuprimer.className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium";
        btnSuprimer.classList.add("delete-btn");
        btnSuprimer.dataset.id=card.id;





        cardElement.append(
            title,
            description,
            priority,
            assignee,
            dueDate,
            tags,
            btnmode,
            btnright,
            btnleft,
            btnSuprimer
        );

        container.appendChild(cardElement);

    });

}




export function refreshBoard(cards) {

    const todoCards = cards.filter(card => card.status === "todo");

    const progressCards = cards.filter(
        card => card.status === "in-progress"
    );

    const doneCards = cards.filter(card => card.status === "done");

    renderCards(todoCards, todo);
    renderCards(progressCards, progress);
    renderCards(doneCards, done);

    todoCount.textContent = todoCards.length;
    progressCount.textContent = progressCards.length;
    doneCount.textContent = doneCards.length;

}




export function renderAssignees(cards) {

    const selectedValue = selectAssignee.value;

    selectAssignee.innerHTML = '<option value="">All assignees</option>';

    const assignees = [];

    cards.forEach(card => {

        if (
            card.assignee &&
            !assignees.includes(card.assignee)
        ) {
            assignees.push(card.assignee);
        }

    });

    assignees.forEach(name => {

        const option = document.createElement("option");

        option.value = name;
        option.textContent = name;

        selectAssignee.appendChild(option);

    });

    selectAssignee.value = selectedValue;

}




export function openCardModal() {

    modal.classList.remove("hidden");
    modal.classList.add("flex");

}

export function closeCardModal() {

    modal.classList.add("hidden");
    modal.classList.remove("flex");

}



export function readCardForm() {

    return {

        title: document.getElementById("inputTetre").value.trim(),

        description: document.getElementById("description").value.trim(),

        priority: document.getElementById("priority").value,

        assignee: document.getElementById("assignee").value.trim(),

        status: document.getElementById("status").value,

        dueDate: document.getElementById("dueDate").value,

        tags: document.getElementById("tags").value
            .split(",")
            .map(tag => tag.trim())
            .filter(tag => tag !== ""),

        createdAt: new Date().toISOString(),

        updatedAt: new Date().toISOString()

    };

}




export function validateCardForm() {

    const title = document.getElementById("inputTetre");
    const description = document.getElementById("description");
    const priority = document.getElementById("priority");
    const assignee = document.getElementById("assignee");
    const status = document.getElementById("status");
    const dueDate = document.getElementById("dueDate");

    const titleError = document.getElementById("titleError");
    const descriptionError = document.getElementById("descError");
    const pError = document.getElementById("prioritError");
    const assiError = document.getElementById("assenError");
    const statusError = document.getElementById("statError");
    const dudateError = document.getElementById("dateError");

    // Clear old errors

    titleError.textContent = "";
    descriptionError.textContent = "";
    pError.textContent = "";
    assiError.textContent = "";
    statusError.textContent = "";
    dudateError.textContent = "";

    let valid = true;

    const titleRegex = /^[a-zA-ZÀ-ÿ0-9\s'-]+$/;
    const assignRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(dueDate.value);

    // Title

    if (title.value.trim() === "") {

        titleError.textContent = "Title obligatoire";
        valid = false;

    } else if (!titleRegex.test(title.value.trim())) {

        titleError.textContent = "Title contient des caractères invalides";
        valid = false;

    }

    // Description

    if (description.value.trim() === "") {

        descriptionError.textContent = "Description obligatoire";
        valid = false;

    } else if (
        description.value.trim().length < 10 ||
        description.value.trim().length > 300
    ) {

        descriptionError.textContent =
            "Description doit contenir entre 10 et 300 caractères";

        valid = false;

    }

    // Priority

    if (priority.value === "") {

        pError.textContent = "Priority obligatoire";
        valid = false;

    }

    // Assignee

    if (assignee.value.trim() === "") {

        assiError.textContent = "Assignee obligatoire";
        valid = false;

    } else if (!assignRegex.test(assignee.value.trim())) {

        assiError.textContent = "Assignee contient des caractères invalides";
        valid = false;

    }

    // Status

    if (status.value === "") {

        statusError.textContent = "Status obligatoire";
        valid = false;

    }

    // Due date

    if (dueDate.value === "") {

        dudateError.textContent = "Due date obligatoire";
        valid = false;

    } else if (selectedDate < today) {

        dudateError.textContent = "Date ne peut pas être dans le passé";
        valid = false;

    }

    return valid;

}




export function resetCardForm() {

    document.getElementById("formCard").reset();

}



export function showLoading() {

    loading.classList.remove("hidden");

}

export function hideLoading() {

    loading.classList.add("hidden");

}

export function showError() {

    error.classList.remove("hidden");
    board.classList.add("hidden");

}

export function hideError() {

    error.classList.add("hidden");

}

export function showBoard() {

    board.classList.remove("hidden");

}
export function fillCardForm(card) {
    document.getElementById("inputTetre").value = card.title;
    document.getElementById("description").value = card.description;
    document.getElementById("priority").value = card.priority;
    document.getElementById("assignee").value = card.assignee;
    document.getElementById("status").value = card.status;
    document.getElementById("dueDate").value = card.dueDate;

    if (card.tags) {
        document.getElementById("tags").value = card.tags.join(", ");
    } else {
        document.getElementById("tags").value = "";
    }

    document.getElementById("cardId").value = card.id;
}


export function switBtnedit() {
    document.getElementById("Btnajou").classList.add("hidden");
    document.getElementById("editBtn").classList.remove("hidden");
}
export function switBtnajou() {
    document.getElementById("Btnajou").classList.remove("hidden");
    document.getElementById("editBtn").classList.add("hidden");
}

