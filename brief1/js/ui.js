
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




