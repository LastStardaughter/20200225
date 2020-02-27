const url="api/grads";

let grads=[];

let xhrGetAll = new XMLHttpRequest();
xhrGetAll.open("GET", url, true);
xhrGetAll.send();

xhrGetAll.onload=()=>{
    console.log(xhrGetAll);
    grads = JSON.parse(xhrGetAll.response);
    if (xhrGetAll.readyState == 4 && xhrGetAll.status==200) {
        console.log(grads);
    } else{
        console.error("Error!")
    }
}

function renderGrads(){
    console.log("test")
    const gradList = grads.map(element => {
        return (
            "<li>"+
            element.name +
            " - Class of " + element.yearOfGraduation + "<br />"+
            element.role + " at " + element.company +
            `   <button class="btn waves-effect waves-light" onclick="editGraduate('${element._id}')">Edit Graduate</button>` +
            `   <button class="btn waves-effect waves-light" onclick="deleteGraduate('${element._id}')">Delete Graduate</button>` +
            "</li>"
        )});
            document.getElementById("results").innerHTML =
    "<ul>" + gradList.join('\n') + "</ul>";
}

function addGraduate(e){
    e.preventDefault();
    console.log("Submit clicked");
    
    let grad = {
        name: document.getElementById("name").value,
        role: document.getElementById("role").value,
        company: document.getElementById("company").value,
        yearOfGraduation: document.getElementById("yearOfGraduation").value
    }
    console.log(grad);

    let xhrPost = new window.XMLHttpRequest();
    xhrPost.open("POST", url);
    xhrPost.setRequestHeader("Content-Type", "application/json");
    xhrPost.send(JSON.stringify(grad));
}

function editGraduate(id){
    console.log("Edit clicked for id "+id);
    
    let grad = {
        name: document.getElementById("name").value,
        role: document.getElementById("role").value,
        company: document.getElementById("company").value,
        yearOfGraduation: document.getElementById("yearOfGraduation").value
    }
    console.log(grad);

    let xhrEdit = new window.XMLHttpRequest();
    xhrEdit.open("PUT", url + `/${id}`);
    xhrEdit.setRequestHeader("Content-Type", "application/json");
    xhrEdit.onload = () => {
        let grads = JSON.parse(xhrEdit.response);
        if (xhrEdit.readyState == 4 && xhrEdit.status == "200"){
            console.log(grads);
        }else{
            console.error(grads);
        }
        }
    
    xhrEdit.send(JSON.stringify(grad));
}

function deleteGraduate(id){
    console.log("Deleting id"+id);
    
    let xhrDelete = new window.XMLHttpRequest();
    xhrDelete.open("DELETE", url+`/${id}`,true);
    xhrDelete.onload=function(){
        let grads = JSON.parse(xhrDelete.response);
        if (xhrDelete.readystate == 4 && xhrDelete.status=="200"){
            console.table(grads);
        } else {
            console.error(grads);
        }
    }
    xhrDelete.send(null);
}