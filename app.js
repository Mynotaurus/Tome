const tiers = ["main-quest","quest","side-quest"];
function wiggle(just_inner) {
    if(just_inner){
        return `transform: rotate(`+(Math.random()-0.5)*4+`deg)`;
    }else{
        return `style="transform: rotate(`+(Math.random()-0.5)*6+`deg)"`;
    }
}
function makeQuest(id, questType, text){
    var htmlString = `<div class="log-entry `+questType+`">
        <input type="checkbox" id="quest__`+id+`" `+wiggle()+`class="checkbox"/>
        <label for="quest__`+id+`" `+wiggle()+`>`+text+`</label>
    </div>`

    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    var add_button = document.createElement("button");
    add_button.classList.add("add-button");
    add_button.innerHTML = "Add";
    add_button.addEventListener("click", createNewQuest);
    add_button.style = wiggle(true);
    div.firstChild.appendChild(add_button);

    var del_button = document.createElement("button");
    del_button.classList.add("delete-button");
    del_button.innerHTML = "Delete";
    del_button.addEventListener("click", deleteQuest);
    del_button.style = wiggle(true);
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
    var ql = prompt("quest level?");
    let newuuid = crypto.randomUUID();
    let nq = makeQuest(newuuid,ql,text)
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