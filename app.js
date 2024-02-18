const tiers = ["main-quest","quest","side-quest"];

function makeQuest(id, questType, text){
    var htmlString = `<div class="log-entry `+questType+`" style="transform: rotate(`+(Math.random()*4-2)+`deg)">
        <input type="checkbox" id="quest__`+id+`" style="transform: rotate(`+(Math.random()*4-2)+`deg)" class="checkbox`+(questType == "main-quest" ? " bigcheckbox" : "")+`"/>
        <label for="quest__`+id+`">`+text+`</label>
    </div>`

    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    var add_button = document.createElement("button");
    add_button.classList.add("add-button");
    add_button.innerHTML = "Add quest";
    add_button.addEventListener("click", createNewQuest);
    div.firstChild.appendChild(add_button);

    var del_button = document.createElement("button");
    del_button.classList.add("delete-button");
    del_button.innerHTML = "Delete quest";
    del_button.addEventListener("click", deleteQuest);
    div.firstChild.appendChild(del_button);

    return div.firstChild;
}

function addSubEntry(parent, child){
    var subentry_list = parent.querySelector(".subentries");
    if(subentry_list==null){
        var div = document.createElement('div');
        div.classList.add("subentries");
        parent.appendChild(div);
        subentry_list = div;
    }
    subentry_list.appendChild(child);
}

function createNewQuest(){
    var text = prompt("What is your new quest?");
    let newuuid = crypto.randomUUID();
    let nq = makeQuest(newuuid,tiers[Math.floor(Math.random()*3)],text)
    if(this.parentNode.classList.contains("quest-log-body")){
        this.parentNode.insertBefore(nq,this);
    }else{
        addSubEntry(this.parentNode, nq);
    }
}

function deleteQuest(){
    this.parentNode.remove();
}

var root = document.querySelector(".quest-log-body");
//for(let i=0; i<12; i++){
//    let newQ = makeQuest(i,tiers[Math.floor(Math.random()*3)],i)
//    if(Math.random()>0.3){
//        addSubEntry(newQ, makeQuest(i*i,tiers[Math.floor(Math.random()*3)],i*i))
//    }
//    root.appendChild(newQ);
//}

const addbuttons = document.querySelectorAll(".add-button");
for (const button of addbuttons) {
  button.addEventListener("click", createNewQuest);
}