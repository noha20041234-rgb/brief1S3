
import { getcards } from "./api.js"


 const state={
   cards:[]
 }
getcards()
.then(data => {
    state.cards=data;
const todoCards=state.cards.filter(card =>{
    return card.status ==="todo"
})
const progressCards=state.cards.filter(card =>{
    return card.status ==="in-progress"
})
const doneCards=state.cards.filter(card =>{
    return card.status==="done"
})

    afficherCards(todoCards,todo);
    afficherCards(progressCards,progress);
    afficherCards(doneCards,done);

    // console.log(data);
});
const todo=document.getElementById("todoCards");
const progress=document.getElementById("progressCards");
const done=document.getElementById("doneCards");


function afficherCards(cards, container){
    container.innerHTML ="";
    cards.forEach(card => {
        const spacard=document.createElement("div");
        spacard.className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-3"
        spacard.textContent=card.title;
        container.appendChild(spacard);

        //titre
        
        const description=document.createElement("p");
        description.textContent="description"+ " :"  +" "+ card.description;
        //priority
        const priority=document.createElement("p")
        priority.textContent="priority"+ " :"  +" "+    card.priority;
        //ass
        const assignee =document.createElement("p")
        assignee.textContent="assignee"+ " :"  +" "+    card.assignee;
        //date
        const datedue=document.createElement("p");
        datedue.textContent="dueDate"+":"   +" "+card.dueDate;
        //tags
        const tagspice=document.createElement("div");
        card.tags.forEach(tag =>{
            const spantag=document.createElement("span");
            spantag.textContent="tag : " +" "+    tag
            tagspice.appendChild(spantag);
        })
        spacard.append(description,priority,assignee,datedue,tagspice);
        
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

    let valide=true;
    const titleRegex=/^[a-zA-ZÀ-ÿ0-9\s'-]+$/ ;
    const assignRegex=/^[a-zA-ZÀ-ÿ\s'-]+$/;
    const today=new Date();
    today.setHours(0,0,0,0);
    const selectdate=new Date(dateDue.value);

    
    if (titr.value.trim() === "") {
        titleError.textContent = "Title obligatoire";
        valide=false;
    }else if(!titleRegex.test(titr.value.trim())){
        titleError.textContent = "Title obligatoire";
        valide=false;

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
        valide=false;
    }

    
    if (assignee.value.trim() === "" || !assignRegex.test(assignee.value.trim())) {
        assiError.textContent = "Assignee obligatoire";
        valide=false;
    }

    
    if (status.value === "") {
        statusError.textContent = "Status obligatoire";
        valide=false;
    }

    
    if (dateDue.value === "" ) {
        dudateError.textContent = "Due date obligatoire";
        valide=false;
    }else if(selectdate < today){
        dudateError.textContent="Date ne peut pas être dans le passé";
        valide=false;
    }

    
    // alert("Formulaire valide !");
});



// const titr = document.getElementById("inputTetre");
// const descri = document.getElementById("description");
// const priority = document.getElementById("priority");
// const assignee = document.getElementById("assignee");
// const status = document.getElementById("status");
// const dateDue = document.getElementById("dueDate");

// function addNewCart(){

//     state.cards.push({
//         title: titr.value ,
//         description: descri.value ,



//     })

// }                                      